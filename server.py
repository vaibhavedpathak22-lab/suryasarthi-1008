#!/usr/bin/env python3
"""
Suryasarthi 108 - Multi-User SQLite Server & Privacy-First Web API
==================================================================
Serves the web application and persists all yoga practice records,
configurations, hydration logs, and statistics into an isolated SQLite database
with strict per-user privacy, authentication, and Admin portal management.

Features:
- Dedicated Port 8088 (avoids collisions with standard 8000/8080 ports).
- Isolated SQLite database (suryasarthi_users.db).
- Multi-user authentication (Registration, Login, Session Tokens).
- Strict user data isolation: Users can NEVER access each other's data.
- Admin Portal: Only the admin can inspect all users' records and system metrics.
- Offline-friendly: Gracefully syncs when connected, allows local offline practice.
- Zero external pip dependencies (Pure Python 3.12 standard library).
"""

import http.server
import socketserver
import sqlite3
import json
import os
import sys
import hashlib
import secrets
import socket
from datetime import datetime
from urllib.parse import urlparse, parse_qs
import re

try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

# Configuration
PORT = int(os.environ.get("PORT", 8088))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "suryasarthi_users.db")


def hash_password(password: str, salt: str = None) -> str:
    """Hash password with SHA-256 and salt."""
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
    return f"{salt}${hashed}"


def verify_password(password: str, stored_hash: str) -> bool:
    """Verify password against stored salt$hash."""
    try:
        salt, hashed = stored_hash.split("$")
        check = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
        return secrets.compare_digest(hashed, check)
    except Exception:
        return False


def get_local_ip():
    """Retrieve the primary local LAN IP address of this machine."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def init_db():
    """Initialize the SQLite database schema with multi-user isolation."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()

        # 1. Users Table (with mandatory physical profile: age, weight, height)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                age INTEGER DEFAULT 0,
                weight REAL DEFAULT 0,
                height REAL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Ensure age, weight, height columns exist if table was already created
        cursor.execute("PRAGMA table_info(users)")
        existing_cols = [c[1] for c in cursor.fetchall()]
        if "age" not in existing_cols:
            cursor.execute("ALTER TABLE users ADD COLUMN age INTEGER DEFAULT 0")
        if "weight" not in existing_cols:
            cursor.execute("ALTER TABLE users ADD COLUMN weight REAL DEFAULT 0")
        if "height" not in existing_cols:
            cursor.execute("ALTER TABLE users ADD COLUMN height REAL DEFAULT 0")

        # 2. User Sessions Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 3. User Config Table (scoped to user_id)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_configs (
                user_id INTEGER NOT NULL,
                key TEXT NOT NULL,
                value TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, key),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 4. User Stats Table (scoped to user_id)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_stats (
                user_id INTEGER NOT NULL,
                key TEXT NOT NULL,
                value TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, key),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 5. User Workout History Table (scoped to user_id)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_workouts (
                user_id INTEGER NOT NULL,
                date TEXT NOT NULL,
                sets INTEGER DEFAULT 0,
                time_ms INTEGER DEFAULT 0,
                goal INTEGER DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, date),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 6. User Water Logs Table (scoped to user_id)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_water_logs (
                user_id INTEGER NOT NULL,
                date TEXT NOT NULL,
                glasses INTEGER DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, date),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 7. User Snapshots Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                timestamp TEXT NOT NULL,
                payload TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 8. Family Groups Table (Up to 6 members: Primary + 5 Family Members)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS family_groups (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                family_code TEXT UNIQUE NOT NULL,
                family_name TEXT NOT NULL,
                primary_user_id INTEGER NOT NULL,
                plan_sku TEXT DEFAULT 'surya.family.12month',
                max_members INTEGER DEFAULT 6,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (primary_user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # 9. Family Members Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS family_members (
                family_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                role TEXT DEFAULT 'member',
                relation TEXT DEFAULT 'Member',
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (family_id, user_id),
                FOREIGN KEY (family_id) REFERENCES family_groups(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)

        # Seed default Admin account if not present
        cursor.execute("SELECT id FROM users WHERE username = 'admin'")
        if not cursor.fetchone():
            admin_hash = hash_password("admin108")
            cursor.execute("""
                INSERT INTO users (username, password_hash, name, role)
                VALUES ('admin', ?, 'Suryasarthi Admin', 'admin')
            """, (admin_hash,))

        conn.commit()


def get_user_by_token(token: str):
    """Retrieve user dictionary given a session token."""
    if not token:
        return None
    with sqlite3.connect(DB_FILE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
            SELECT u.id, u.username, u.name, u.role, u.age, u.weight, u.height, u.created_at
            FROM users u
            JOIN user_sessions s ON u.id = s.user_id
            WHERE s.token = ?
        """, (token,))
        row = cursor.fetchone()
        return dict(row) if row else None


def load_user_data_from_db(user_id: int):
    """Extract and reconstruct { cfg, data } payload for a specific user."""
    cfg = {}
    data = {
        "history": {},
        "totalAllTime": 0,
        "totalTimeMs": 0,
        "programDay": 1,
        "lastDate": "",
        "baseGoal": 0,
        "goalDate": "",
        "lastGoal": 0,
        "lastCompletedGoal": 0,
        "lastRecoveryAt": 0,
        "waterLogs": {},
        "reels": {}
    }

    with sqlite3.connect(DB_FILE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # Load User Config
        cursor.execute("SELECT key, value FROM user_configs WHERE user_id = ?", (user_id,))
        for row in cursor.fetchall():
            k, v = row["key"], row["value"]
            try:
                cfg[k] = json.loads(v)
            except Exception:
                cfg[k] = v

        # Load User Stats
        cursor.execute("SELECT key, value FROM user_stats WHERE user_id = ?", (user_id,))
        for row in cursor.fetchall():
            k, v = row["key"], row["value"]
            try:
                parsed_val = json.loads(v)
                data[k] = parsed_val
            except Exception:
                data[k] = v

        # Load Workout History
        cursor.execute("""
            SELECT date, sets, time_ms, goal
            FROM user_workouts
            WHERE user_id = ?
            ORDER BY date ASC
        """, (user_id,))
        for row in cursor.fetchall():
            data["history"][row["date"]] = {
                "sets": row["sets"] or 0,
                "timeMs": row["time_ms"] or 0,
                "goal": row["goal"] or 0
            }

        # Load Water Logs
        cursor.execute("""
            SELECT date, glasses
            FROM user_water_logs
            WHERE user_id = ?
            ORDER BY date ASC
        """, (user_id,))
        for row in cursor.fetchall():
            data["waterLogs"][row["date"]] = row["glasses"] or 0

    return {"cfg": cfg, "data": data}


def save_user_data_to_db(user_id: int, payload: dict, create_snapshot: bool = False):
    """Upsert { cfg, data } for a specific user within an ACID transaction."""
    cfg = payload.get("cfg", {})
    data = payload.get("data", {})

    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()

        # Upsert Config
        if isinstance(cfg, dict):
            for k, v in cfg.items():
                cursor.execute("""
                    INSERT INTO user_configs (user_id, key, value, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(user_id, key) DO UPDATE SET
                        value = excluded.value,
                        updated_at = CURRENT_TIMESTAMP
                """, (user_id, k, json.dumps(v)))

        # Upsert User Stats (excluding collections like history & waterLogs)
        if isinstance(data, dict):
            for k, v in data.items():
                if k in ("history", "waterLogs", "reels"):
                    continue
                cursor.execute("""
                    INSERT INTO user_stats (user_id, key, value, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(user_id, key) DO UPDATE SET
                        value = excluded.value,
                        updated_at = CURRENT_TIMESTAMP
                """, (user_id, k, json.dumps(v)))

            # Upsert Workout History
            history = data.get("history", {})
            if isinstance(history, dict):
                for date_key, rec in history.items():
                    if isinstance(rec, (int, float)):
                        sets = int(rec)
                        time_ms = 0
                        goal = 0
                    elif isinstance(rec, dict):
                        sets = int(rec.get("sets") or 0)
                        time_ms = int(rec.get("timeMs") or 0)
                        goal = int(rec.get("goal") or 0)
                    else:
                        continue

                    cursor.execute("""
                        INSERT INTO user_workouts (user_id, date, sets, time_ms, goal, updated_at)
                        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                        ON CONFLICT(user_id, date) DO UPDATE SET
                            sets = excluded.sets,
                            time_ms = excluded.time_ms,
                            goal = excluded.goal,
                            updated_at = CURRENT_TIMESTAMP
                    """, (user_id, date_key, sets, time_ms, goal))

            # Upsert Water Logs
            water_logs = data.get("waterLogs", {})
            if isinstance(water_logs, dict):
                for date_key, glasses in water_logs.items():
                    cursor.execute("""
                        INSERT INTO user_water_logs (user_id, date, glasses, updated_at)
                        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                        ON CONFLICT(user_id, date) DO UPDATE SET
                            glasses = excluded.glasses,
                            updated_at = CURRENT_TIMESTAMP
                    """, (user_id, date_key, int(glasses or 0)))

        # Snapshot for safety
        if create_snapshot:
            now_iso = datetime.now().isoformat()
            cursor.execute("""
                INSERT INTO user_snapshots (user_id, timestamp, payload)
                VALUES (?, ?, ?)
            """, (user_id, now_iso, json.dumps(payload)))

            # Keep only the last 20 snapshots per user
            cursor.execute("""
                DELETE FROM user_snapshots WHERE user_id = ? AND id NOT IN (
                    SELECT id FROM user_snapshots WHERE user_id = ? ORDER BY id DESC LIMIT 20
                )
            """, (user_id, user_id))

        conn.commit()


def get_system_stats():
    """Retrieve system-wide summary statistics (for Admin)."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users")
        total_users = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*), COALESCE(SUM(sets), 0) FROM user_workouts")
        total_workout_records, total_sets = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) FROM user_water_logs")
        total_water_logs = cursor.fetchone()[0]

    return {
        "total_users": total_users,
        "total_workout_records": total_workout_records,
        "total_sets_across_all_users": total_sets,
        "total_water_logs": total_water_logs,
        "db_file": "suryasarthi_users.db",
        "port": PORT
    }


class SuryasarthiRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler serving Multi-User SQLite REST APIs and PWA assets."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def _send_json(self, status_code, data_obj):
        """Helper to serialize and write JSON HTTP responses with CORS."""
        resp_bytes = json.dumps(data_obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(resp_bytes)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.end_headers()
        self.wfile.write(resp_bytes)

    def _get_auth_token(self):
        """Extract session token from Authorization header or URL query."""
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            return auth_header[7:].strip()
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)
        if "token" in qs:
            return qs["token"][0]
        return ""

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    def do_GET(self):
        """Handle GET endpoints."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        token = self._get_auth_token()
        user = get_user_by_token(token)

        # 1. API: Validate Session / Get Current User
        if path == "/api/auth/me":
            if not user:
                self._send_json(401, {"success": False, "error": "Unauthorized / Session expired"})
                return
            self._send_json(200, {"success": True, "user": user})
            return

        # 2. API: Get User Practice Data (Strict User Privacy)
        if path == "/api/data":
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to access user data"})
                return
            try:
                user_payload = load_user_data_from_db(user["id"])
                self._send_json(200, {
                    "success": True,
                    "user": user,
                    "cfg": user_payload["cfg"],
                    "data": user_payload["data"]
                })
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        # 2b. API: Family Sadhana Hub & Dashboard (सूर्यसारथी परिवार साधना)
        if path == "/api/family/dashboard":
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to access family dashboard"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                # Find if user belongs to any family group
                cursor.execute("""
                    SELECT fg.id, fg.family_code, fg.family_name, fg.primary_user_id, fg.plan_sku, fg.max_members, fg.created_at,
                           fm.role as user_role, fm.relation as user_relation
                    FROM family_members fm
                    JOIN family_groups fg ON fm.family_id = fg.id
                    WHERE fm.user_id = ?
                """, (user["id"],))
                fam_row = cursor.fetchone()

                if not fam_row:
                    self._send_json(200, {
                        "success": True,
                        "in_family": False,
                        "message": "User does not belong to any family group"
                    })
                    return

                family_id = fam_row["id"]
                is_primary = (user["id"] == fam_row["primary_user_id"])

                # Query all members of this family
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.age, u.weight, u.height,
                           fm.role, fm.relation, fm.joined_at
                    FROM family_members fm
                    JOIN users u ON fm.user_id = u.id
                    WHERE fm.family_id = ?
                    ORDER BY CASE WHEN fm.role = 'primary' THEN 0 ELSE 1 END, fm.joined_at ASC
                """, (family_id,))
                member_rows = cursor.fetchall()

                today_str = datetime.now().strftime("%Y-%m-%d")
                members_list = []
                total_family_sets_today = 0
                total_family_cal_today = 0.0
                total_family_sets_all = 0

                for m in member_rows:
                    m_id = m["id"]
                    cursor.execute("""
                        SELECT sets, time_ms, goal FROM user_workouts
                        WHERE user_id = ? AND date = ?
                    """, (m_id, today_str))
                    today_w = cursor.fetchone()
                    today_sets = today_w["sets"] if today_w else 0
                    today_goal = today_w["goal"] if today_w else 36

                    m_wt = m["weight"] or 65.0
                    today_cal = round((today_sets * 0.1) * 8.0 * (m_wt / 60.0) * 12.0, 1) if today_sets > 0 else 0.0

                    cursor.execute("""
                        SELECT SUM(sets) as all_sets FROM user_workouts
                        WHERE user_id = ?
                    """, (m_id,))
                    all_w = cursor.fetchone()
                    all_sets = all_w["all_sets"] if (all_w and all_w["all_sets"]) else today_sets

                    total_family_sets_today += today_sets
                    total_family_cal_today += today_cal
                    total_family_sets_all += all_sets

                    members_list.append({
                        "id": m["id"],
                        "name": m["name"],
                        "username": m["username"],
                        "age": m["age"],
                        "weight": m["weight"],
                        "height": m["height"],
                        "role": m["role"],
                        "relation": m["relation"],
                        "joined_at": m["joined_at"],
                        "is_primary": (m["role"] == "primary"),
                        "today_sets": today_sets,
                        "today_goal": today_goal,
                        "today_calories": today_cal,
                        "all_time_sets": all_sets,
                        "active_today": (today_sets > 0)
                    })

                self._send_json(200, {
                    "success": True,
                    "in_family": True,
                    "is_primary": is_primary,
                    "family": {
                        "id": fam_row["id"],
                        "family_name": fam_row["family_name"],
                        "family_code": fam_row["family_code"],
                        "primary_user_id": fam_row["primary_user_id"],
                        "plan_sku": fam_row["plan_sku"],
                        "max_members": fam_row["max_members"],
                        "members_count": len(members_list),
                        "created_at": fam_row["created_at"]
                    },
                    "totals": {
                        "family_sets_today": total_family_sets_today,
                        "family_calories_today": round(total_family_cal_today, 1),
                        "family_sets_all_time": total_family_sets_all,
                        "active_members_today": sum(1 for m in members_list if m["active_today"]),
                        "total_members": len(members_list),
                        "slots_remaining": max(0, fam_row["max_members"] - len(members_list))
                    },
                    "members": members_list
                })
            return

        # 3. API: Admin — View All Users List & Stats (Admin Only!)
        if path == "/api/admin/users":
            if not user or user.get("role") != "admin":
                self._send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
                return
            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.role, u.age, u.weight, u.height, u.created_at,
                           COALESCE(SUM(w.sets), 0) AS total_sets,
                           COUNT(w.date) AS workout_days,
                           MAX(w.date) AS last_active_date
                    FROM users u
                    LEFT JOIN user_workouts w ON u.id = w.user_id
                    GROUP BY u.id
                    ORDER BY u.id ASC
                """)
                users_list = [dict(r) for r in cursor.fetchall()]
            self._send_json(200, {"success": True, "users": users_list})
            return

        # 4. API: Admin — View Specific User Data (Admin Only!)
        if path == "/api/admin/user-data":
            if not user or user.get("role") != "admin":
                self._send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
                return
            qs = parse_qs(parsed_url.query)
            target_user_id = qs.get("user_id", [None])[0]
            if not target_user_id:
                self._send_json(400, {"success": False, "error": "Missing user_id parameter"})
                return
            try:
                target_payload = load_user_data_from_db(int(target_user_id))
                self._send_json(200, {"success": True, "user_id": target_user_id, **target_payload})
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        # 2b. API: Family Sadhana Hub & Dashboard (सूर्यसारथी परिवार साधना)
        if path == "/api/family/dashboard":
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to access family dashboard"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                # Find if user belongs to any family group
                cursor.execute("""
                    SELECT fg.id, fg.family_code, fg.family_name, fg.primary_user_id, fg.plan_sku, fg.max_members, fg.created_at,
                           fm.role as user_role, fm.relation as user_relation
                    FROM family_members fm
                    JOIN family_groups fg ON fm.family_id = fg.id
                    WHERE fm.user_id = ?
                """, (user["id"],))
                fam_row = cursor.fetchone()

                if not fam_row:
                    self._send_json(200, {
                        "success": True,
                        "in_family": False,
                        "message": "User does not belong to any family group"
                    })
                    return

                family_id = fam_row["id"]
                is_primary = (user["id"] == fam_row["primary_user_id"])

                # Query all members of this family
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.age, u.weight, u.height,
                           fm.role, fm.relation, fm.joined_at
                    FROM family_members fm
                    JOIN users u ON fm.user_id = u.id
                    WHERE fm.family_id = ?
                    ORDER BY CASE WHEN fm.role = 'primary' THEN 0 ELSE 1 END, fm.joined_at ASC
                """, (family_id,))
                member_rows = cursor.fetchall()

                today_str = datetime.now().strftime("%Y-%m-%d")
                members_list = []
                total_family_sets_today = 0
                total_family_cal_today = 0.0
                total_family_sets_all = 0

                for m in member_rows:
                    m_id = m["id"]
                    cursor.execute("""
                        SELECT sets, time_ms, goal FROM user_workouts
                        WHERE user_id = ? AND date = ?
                    """, (m_id, today_str))
                    today_w = cursor.fetchone()
                    today_sets = today_w["sets"] if today_w else 0
                    today_goal = today_w["goal"] if today_w else 36

                    m_wt = m["weight"] or 65.0
                    today_cal = round((today_sets * 0.1) * 8.0 * (m_wt / 60.0) * 12.0, 1) if today_sets > 0 else 0.0

                    cursor.execute("""
                        SELECT SUM(sets) as all_sets FROM user_workouts
                        WHERE user_id = ?
                    """, (m_id,))
                    all_w = cursor.fetchone()
                    all_sets = all_w["all_sets"] if (all_w and all_w["all_sets"]) else today_sets

                    total_family_sets_today += today_sets
                    total_family_cal_today += today_cal
                    total_family_sets_all += all_sets

                    members_list.append({
                        "id": m["id"],
                        "name": m["name"],
                        "username": m["username"],
                        "age": m["age"],
                        "weight": m["weight"],
                        "height": m["height"],
                        "role": m["role"],
                        "relation": m["relation"],
                        "joined_at": m["joined_at"],
                        "is_primary": (m["role"] == "primary"),
                        "today_sets": today_sets,
                        "today_goal": today_goal,
                        "today_calories": today_cal,
                        "all_time_sets": all_sets,
                        "active_today": (today_sets > 0)
                    })

                self._send_json(200, {
                    "success": True,
                    "in_family": True,
                    "is_primary": is_primary,
                    "family": {
                        "id": fam_row["id"],
                        "family_name": fam_row["family_name"],
                        "family_code": fam_row["family_code"],
                        "primary_user_id": fam_row["primary_user_id"],
                        "plan_sku": fam_row["plan_sku"],
                        "max_members": fam_row["max_members"],
                        "members_count": len(members_list),
                        "created_at": fam_row["created_at"]
                    },
                    "totals": {
                        "family_sets_today": total_family_sets_today,
                        "family_calories_today": round(total_family_cal_today, 1),
                        "family_sets_all_time": total_family_sets_all,
                        "active_members_today": sum(1 for m in members_list if m["active_today"]),
                        "total_members": len(members_list),
                        "slots_remaining": max(0, fam_row["max_members"] - len(members_list))
                    },
                    "members": members_list
                })
            return

        # 5. API: Admin — System-wide Stats
        if path == "/api/admin/stats":
            if not user or user.get("role") != "admin":
                self._send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
                return
            stats = get_system_stats()
            self._send_json(200, {"success": True, "stats": stats})
            return

        # 6. API: Public Server Status
        if path == "/api/status":
            self._send_json(200, {
                "success": True,
                "status": "online",
                "app": "Suryasarthi 108",
                "port": PORT,
                "local_ip": get_local_ip(),
                "server_time": datetime.now().isoformat()
            })
            return

        # 7. API: Admin — Download Raw SQLite Database File
        if path == "/api/backup":
            if not user or user.get("role") != "admin":
                self._send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
                return
            if not os.path.exists(DB_FILE):
                self._send_json(404, {"success": False, "error": "Database file not found."})
                return

            with open(DB_FILE, "rb") as f:
                db_bytes = f.read()

            self.send_response(200)
            self.send_header("Content-Type", "application/x-sqlite3")
            self.send_header("Content-Disposition", 'attachment; filename="suryasarthi_users.db"')
            self.send_header("Content-Length", str(len(db_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(db_bytes)
            return

        # Standard Static File Serving
        super().do_GET()

    def do_POST(self):
        """Handle POST endpoints."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        # Read JSON body
        content_len = int(self.headers.get("Content-Length", 0))
        if content_len <= 0:
            self._send_json(400, {"success": False, "error": "Empty request body"})
            return

        try:
            body = self.rfile.read(content_len)
            payload = json.loads(body.decode("utf-8"))
        except Exception as e:
            self._send_json(400, {"success": False, "error": f"Invalid JSON: {str(e)}"})
            return

        # 1. API: User Registration
        if path == "/api/auth/register":
            username = str(payload.get("username", "")).strip().lower()
            password = str(payload.get("password", "")).strip()
            name = str(payload.get("name", "")).strip() or username.capitalize()
            role = "user"  # regular user by default
            try:
                age = int(payload.get("age", 0))
            except Exception:
                age = 0
            try:
                weight = float(payload.get("weight", 0.0))
            except Exception:
                weight = 0.0
            try:
                height = float(payload.get("height", 0.0))
            except Exception:
                height = 0.0

            if not username or not password:
                self._send_json(400, {"success": False, "error": "Username and password are required"})
                return

            if not age or age < 5 or age > 120:
                self._send_json(400, {"success": False, "error": "Age is mandatory (must be between 5 and 120 years)."})
                return

            if not weight or weight < 20 or weight > 250:
                self._send_json(400, {"success": False, "error": "Weight is mandatory (must be between 20 and 250 kg)."})
                return

            if not height or height < 60 or height > 250:
                self._send_json(400, {"success": False, "error": "Height is mandatory (must be between 60 and 250 cm)."})
                return

            pwd_hash = hash_password(password)
            token = secrets.token_hex(24)

            try:
                with sqlite3.connect(DB_FILE) as conn:
                    cursor = conn.cursor()
                    cursor.execute("""
                        INSERT INTO users (username, password_hash, name, role, age, weight, height)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (username, pwd_hash, name, role, age, weight, height))
                    user_id = cursor.lastrowid

                    cursor.execute("""
                        INSERT INTO user_sessions (token, user_id)
                        VALUES (?, ?)
                    """, (token, user_id))
                    conn.commit()

                user_obj = {
                    "id": user_id,
                    "username": username,
                    "name": name,
                    "role": role,
                    "age": age,
                    "weight": weight,
                    "height": height
                }
                self._send_json(200, {
                    "success": True,
                    "message": "User registered successfully",
                    "token": token,
                    "user": user_obj
                })
            except sqlite3.IntegrityError:
                self._send_json(409, {"success": False, "error": "Username already exists. Please choose another."})
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        # 2b. API: Family Sadhana Hub & Dashboard (सूर्यसारथी परिवार साधना)
        if path == "/api/family/dashboard":
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to access family dashboard"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                # Find if user belongs to any family group
                cursor.execute("""
                    SELECT fg.id, fg.family_code, fg.family_name, fg.primary_user_id, fg.plan_sku, fg.max_members, fg.created_at,
                           fm.role as user_role, fm.relation as user_relation
                    FROM family_members fm
                    JOIN family_groups fg ON fm.family_id = fg.id
                    WHERE fm.user_id = ?
                """, (user["id"],))
                fam_row = cursor.fetchone()

                if not fam_row:
                    self._send_json(200, {
                        "success": True,
                        "in_family": False,
                        "message": "User does not belong to any family group"
                    })
                    return

                family_id = fam_row["id"]
                is_primary = (user["id"] == fam_row["primary_user_id"])

                # Query all members of this family
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.age, u.weight, u.height,
                           fm.role, fm.relation, fm.joined_at
                    FROM family_members fm
                    JOIN users u ON fm.user_id = u.id
                    WHERE fm.family_id = ?
                    ORDER BY CASE WHEN fm.role = 'primary' THEN 0 ELSE 1 END, fm.joined_at ASC
                """, (family_id,))
                member_rows = cursor.fetchall()

                today_str = datetime.now().strftime("%Y-%m-%d")
                members_list = []
                total_family_sets_today = 0
                total_family_cal_today = 0.0
                total_family_sets_all = 0

                for m in member_rows:
                    m_id = m["id"]
                    cursor.execute("""
                        SELECT sets, time_ms, goal FROM user_workouts
                        WHERE user_id = ? AND date = ?
                    """, (m_id, today_str))
                    today_w = cursor.fetchone()
                    today_sets = today_w["sets"] if today_w else 0
                    today_goal = today_w["goal"] if today_w else 36

                    m_wt = m["weight"] or 65.0
                    today_cal = round((today_sets * 0.1) * 8.0 * (m_wt / 60.0) * 12.0, 1) if today_sets > 0 else 0.0

                    cursor.execute("""
                        SELECT SUM(sets) as all_sets FROM user_workouts
                        WHERE user_id = ?
                    """, (m_id,))
                    all_w = cursor.fetchone()
                    all_sets = all_w["all_sets"] if (all_w and all_w["all_sets"]) else today_sets

                    total_family_sets_today += today_sets
                    total_family_cal_today += today_cal
                    total_family_sets_all += all_sets

                    members_list.append({
                        "id": m["id"],
                        "name": m["name"],
                        "username": m["username"],
                        "age": m["age"],
                        "weight": m["weight"],
                        "height": m["height"],
                        "role": m["role"],
                        "relation": m["relation"],
                        "joined_at": m["joined_at"],
                        "is_primary": (m["role"] == "primary"),
                        "today_sets": today_sets,
                        "today_goal": today_goal,
                        "today_calories": today_cal,
                        "all_time_sets": all_sets,
                        "active_today": (today_sets > 0)
                    })

                self._send_json(200, {
                    "success": True,
                    "in_family": True,
                    "is_primary": is_primary,
                    "family": {
                        "id": fam_row["id"],
                        "family_name": fam_row["family_name"],
                        "family_code": fam_row["family_code"],
                        "primary_user_id": fam_row["primary_user_id"],
                        "plan_sku": fam_row["plan_sku"],
                        "max_members": fam_row["max_members"],
                        "members_count": len(members_list),
                        "created_at": fam_row["created_at"]
                    },
                    "totals": {
                        "family_sets_today": total_family_sets_today,
                        "family_calories_today": round(total_family_cal_today, 1),
                        "family_sets_all_time": total_family_sets_all,
                        "active_members_today": sum(1 for m in members_list if m["active_today"]),
                        "total_members": len(members_list),
                        "slots_remaining": max(0, fam_row["max_members"] - len(members_list))
                    },
                    "members": members_list
                })
            return

        # 2. API: User Login
        if path == "/api/auth/login":
            username = str(payload.get("username", "")).strip().lower()
            password = str(payload.get("password", "")).strip()

            if not username or not password:
                self._send_json(400, {"success": False, "error": "Username and password are required"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT id, username, password_hash, name, role, age, weight, height
                    FROM users
                    WHERE username = ?
                """, (username,))
                row = cursor.fetchone()

                if not row or not verify_password(password, row["password_hash"]):
                    self._send_json(401, {"success": False, "error": "Invalid username or password"})
                    return

                user_id = row["id"]
                token = secrets.token_hex(24)

                cursor.execute("""
                    INSERT INTO user_sessions (token, user_id)
                    VALUES (?, ?)
                """, (token, user_id))
                conn.commit()

                user_obj = {
                    "id": user_id,
                    "username": row["username"],
                    "name": row["name"],
                    "role": row["role"],
                    "age": row["age"] or 0,
                    "weight": row["weight"] or 0,
                    "height": row["height"] or 0
                }
                self._send_json(200, {
                    "success": True,
                    "message": "Login successful",
                    "token": token,
                    "user": user_obj
                })
            return

        # 3. API: User Logout
        if path == "/api/auth/logout":
            token = self._get_auth_token()
            if token:
                with sqlite3.connect(DB_FILE) as conn:
                    cursor = conn.cursor()
                    cursor.execute("DELETE FROM user_sessions WHERE token = ?", (token,))
                    conn.commit()
            self._send_json(200, {"success": True, "message": "Logged out successfully"})
            return

        # 3b. API: User Account & Data Deletion (Google Play Compliance)
        if path == "/api/auth/delete-account":
            token = self._get_auth_token()
            user = get_user_by_token(token)
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to delete account"})
                return
            with sqlite3.connect(DB_FILE) as conn:
                cursor = conn.cursor()
                cursor.execute("PRAGMA foreign_keys = ON")
                cursor.execute("DELETE FROM users WHERE id = ?", (user["id"],))
                conn.commit()
            self._send_json(200, {"success": True, "message": "Account and all associated practice data deleted permanently"})
            return

        # 4. API: Save User Practice Data (Strict User Privacy)
        if path == "/api/data":
            token = self._get_auth_token()
            user = get_user_by_token(token)
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to save data"})
                return

            try:
                save_user_data_to_db(user["id"], payload, create_snapshot=False)
                self._send_json(200, {
                    "success": True,
                    "message": "Practice data saved to SQLite",
                    "user_id": user["id"]
                })
            except Exception as e:
                self._send_json(500, {"success": False, "error": str(e)})
            return

        # 5. API: Create Family Group (Primary Account Holder)
        if path == "/api/family/create":
            token = self._get_auth_token()
            user = get_user_by_token(token)
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required"})
                return

            family_name = str(payload.get("family_name", "")).strip() or f"{user['name']}'s Parivar"
            plan_sku = str(payload.get("plan_sku", "surya.family.12month")).strip()

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("PRAGMA foreign_keys = ON;")

                cursor.execute("SELECT id, family_code FROM family_groups WHERE primary_user_id = ?", (user["id"],))
                existing = cursor.fetchone()
                if existing:
                    self._send_json(200, {
                        "success": True,
                        "message": "Existing family group retrieved",
                        "family_id": existing["id"],
                        "family_code": existing["family_code"]
                    })
                    return

                chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
                fam_code = "SURYA-" + "".join(secrets.choice(chars) for _ in range(4))

                cursor.execute("""
                    INSERT INTO family_groups (family_code, family_name, primary_user_id, plan_sku, max_members)
                    VALUES (?, ?, ?, ?, 6)
                """, (fam_code, family_name, user["id"], plan_sku))
                family_id = cursor.lastrowid

                cursor.execute("""
                    INSERT INTO family_members (family_id, user_id, role, relation)
                    VALUES (?, ?, 'primary', 'Primary Account Holder')
                """, (family_id, user["id"]))
                conn.commit()

            self._send_json(200, {
                "success": True,
                "message": "Family group created successfully",
                "family_id": family_id,
                "family_code": fam_code,
                "max_members": 6
            })
            return

        # 6. API: Join Family via Code
        if path == "/api/family/join":
            token = self._get_auth_token()
            user = get_user_by_token(token)
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required"})
                return

            code = str(payload.get("family_code", "")).strip().upper()
            relation = str(payload.get("relation", "Member")).strip()

            if not code:
                self._send_json(400, {"success": False, "error": "Family code is required"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("PRAGMA foreign_keys = ON;")

                cursor.execute("SELECT id, max_members, family_name FROM family_groups WHERE family_code = ?", (code,))
                fg = cursor.fetchone()
                if not fg:
                    self._send_json(404, {"success": False, "error": "Invalid Family Code. Please check and try again."})
                    return

                family_id = fg["id"]
                max_members = fg["max_members"]

                cursor.execute("SELECT COUNT(*) as cnt FROM family_members WHERE family_id = ?", (family_id,))
                cnt = cursor.fetchone()["cnt"]
                if cnt >= max_members:
                    self._send_json(400, {"success": False, "error": f"Family group is full (Maximum {max_members} members reached)."})
                    return

                cursor.execute("SELECT 1 FROM family_members WHERE family_id = ? AND user_id = ?", (family_id, user["id"]))
                if cursor.fetchone():
                    self._send_json(200, {"success": True, "message": "You are already a member of this family group."})
                    return

                cursor.execute("""
                    INSERT INTO family_members (family_id, user_id, role, relation)
                    VALUES (?, ?, 'member', ?)
                """, (family_id, user["id"], relation))
                conn.commit()

            self._send_json(200, {
                "success": True,
                "message": f"Successfully joined {fg['family_name']}!",
                "family_id": family_id
            })
            return

        # 7. API: Add Member by Mobile Number / Name / Username
        if path == "/api/family/add-member":
            token = self._get_auth_token()
            user = get_user_by_token(token)
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required"})
                return

            member_name = str(payload.get("name", "")).strip()
            member_phone = str(payload.get("phone", "")).strip()
            target_uname = str(payload.get("username", "")).strip().lower()
            relation = str(payload.get("relation", "Family Member")).strip()

            if not member_name and not target_uname:
                self._send_json(400, {"success": False, "error": "Member Name or Username is required"})
                return

            clean_phone = re.sub(r"\D", "", member_phone)[-10:]
            if not target_uname:
                target_uname = f"fam_{clean_phone}" if clean_phone else ("user_" + secrets.token_hex(4))

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("PRAGMA foreign_keys = ON;")

                cursor.execute("SELECT id, max_members, family_name, family_code FROM family_groups WHERE primary_user_id = ?", (user["id"],))
                fg = cursor.fetchone()
                if not fg:
                    self._send_json(403, {"success": False, "error": "Only the Primary Account Holder can add members"})
                    return

                family_id = fg["id"]

                cursor.execute("SELECT COUNT(*) as cnt FROM family_members WHERE family_id = ?", (family_id,))
                cnt = cursor.fetchone()["cnt"]
                if cnt >= fg["max_members"]:
                    self._send_json(400, {"success": False, "error": f"Family plan limit reached ({fg['max_members']} members maximum)."})
                    return

                # Find or auto-provision member account
                cursor.execute("SELECT id, name FROM users WHERE username = ?", (target_uname,))
                target_user = cursor.fetchone()
                if not target_user:
                    temp_pwd_hash = hash_password("SuryaPass@" + secrets.token_hex(4))
                    display_name = member_name or target_uname.capitalize()
                    cursor.execute("""
                        INSERT INTO users (username, password_hash, name, role, age, weight, height)
                        VALUES (?, ?, ?, 'user', 25, 60.0, 165.0)
                    """, (target_uname, temp_pwd_hash, display_name))
                    new_uid = cursor.lastrowid
                    target_user = {"id": new_uid, "name": display_name}

                # Check if already in family
                cursor.execute("SELECT 1 FROM family_members WHERE family_id = ? AND user_id = ?", (family_id, target_user["id"]))
                if cursor.fetchone():
                    self._send_json(400, {"success": False, "error": f"'{target_user['name']}' is already in your family group."})
                    return

                cursor.execute("""
                    INSERT INTO family_members (family_id, user_id, role, relation)
                    VALUES (?, ?, 'member', ?)
                """, (family_id, target_user["id"], relation))
                conn.commit()

            # Formulate text invitation message
            app_url = "https://play.google.com/store/apps/details?id=com.suryasarthi.app"
            invite_text = (
                f"☀️ सूर्यसारथी १०८ — परिवार साधना आमंत्रण ☀️\n"
                f"नमस्ते {target_user['name']}!\n"
                f"{user['name']} यांनी तुम्हाला '{fg['family_name']}' मध्ये जोडले आहे.\n\n"
                f"🔑 फॅमिली कोड (Family Code): {fg['family_code']}\n"
                f"📲 ॲप इन्स्टॉल लिंक: {app_url}\n\n"
                f"👉 ॲक्टिव्हेट कसे करावे:\n"
                f"१. ॲप इन्स्टॉल करून उघडा.\n"
                f"२. फॅमिली कोड '{fg['family_code']}' टाका.\n"
                f"३. आपला मोफत PRO प्लॅन सक्रिय होईल!\n\n"
                f"🔒 हा स्लॉट आपल्यासाठी कायमस्वरूपी सुरक्षित (Locked) आहे."
            )

            self._send_json(200, {
                "success": True,
                "message": f"{target_user['name']} यांना फॅमिली पासमध्ये जोडले आणि स्लॉट कायमस्वरूपी लॉक झाला!",
                "member_id": target_user["id"],
                "member_name": target_user["name"],
                "family_code": fg["family_code"],
                "phone": clean_phone,
                "invite_text": invite_text,
                "invite_message": invite_text
            })
            return

        # 8. API: Remove Member (Strictly Blocked by Permanent Slot Policy)
        if path == "/api/family/remove-member":
            self._send_json(403, {
                "success": False,
                "error": "नियम व अटी (Family Policy): एकदा जोडलेला सदस्य स्लॉट सबस्क्रिप्शन संपेपर्यंत कायमस्वरूपी लॉक असतो. सदस्य काढता किंवा बदलता येणार नाही (Member slots are permanently locked and cannot be removed or swapped)."
            })
            return

        # 2b. API: Family Sadhana Hub & Dashboard (सूर्यसारथी परिवार साधना)
        if path == "/api/family/dashboard":
            if not user:
                self._send_json(401, {"success": False, "error": "Authentication required to access family dashboard"})
                return

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                # Find if user belongs to any family group
                cursor.execute("""
                    SELECT fg.id, fg.family_code, fg.family_name, fg.primary_user_id, fg.plan_sku, fg.max_members, fg.created_at,
                           fm.role as user_role, fm.relation as user_relation
                    FROM family_members fm
                    JOIN family_groups fg ON fm.family_id = fg.id
                    WHERE fm.user_id = ?
                """, (user["id"],))
                fam_row = cursor.fetchone()

                if not fam_row:
                    self._send_json(200, {
                        "success": True,
                        "in_family": False,
                        "message": "User does not belong to any family group"
                    })
                    return

                family_id = fam_row["id"]
                is_primary = (user["id"] == fam_row["primary_user_id"])

                # Query all members of this family
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.age, u.weight, u.height,
                           fm.role, fm.relation, fm.joined_at
                    FROM family_members fm
                    JOIN users u ON fm.user_id = u.id
                    WHERE fm.family_id = ?
                    ORDER BY CASE WHEN fm.role = 'primary' THEN 0 ELSE 1 END, fm.joined_at ASC
                """, (family_id,))
                member_rows = cursor.fetchall()

                today_str = datetime.now().strftime("%Y-%m-%d")
                members_list = []
                total_family_sets_today = 0
                total_family_cal_today = 0.0
                total_family_sets_all = 0

                for m in member_rows:
                    m_id = m["id"]
                    cursor.execute("""
                        SELECT sets, time_ms, goal FROM user_workouts
                        WHERE user_id = ? AND date = ?
                    """, (m_id, today_str))
                    today_w = cursor.fetchone()
                    today_sets = today_w["sets"] if today_w else 0
                    today_goal = today_w["goal"] if today_w else 36

                    m_wt = m["weight"] or 65.0
                    today_cal = round((today_sets * 0.1) * 8.0 * (m_wt / 60.0) * 12.0, 1) if today_sets > 0 else 0.0

                    cursor.execute("""
                        SELECT SUM(sets) as all_sets FROM user_workouts
                        WHERE user_id = ?
                    """, (m_id,))
                    all_w = cursor.fetchone()
                    all_sets = all_w["all_sets"] if (all_w and all_w["all_sets"]) else today_sets

                    total_family_sets_today += today_sets
                    total_family_cal_today += today_cal
                    total_family_sets_all += all_sets

                    members_list.append({
                        "id": m["id"],
                        "name": m["name"],
                        "username": m["username"],
                        "age": m["age"],
                        "weight": m["weight"],
                        "height": m["height"],
                        "role": m["role"],
                        "relation": m["relation"],
                        "joined_at": m["joined_at"],
                        "is_primary": (m["role"] == "primary"),
                        "today_sets": today_sets,
                        "today_goal": today_goal,
                        "today_calories": today_cal,
                        "all_time_sets": all_sets,
                        "active_today": (today_sets > 0)
                    })

                self._send_json(200, {
                    "success": True,
                    "in_family": True,
                    "is_primary": is_primary,
                    "family": {
                        "id": fam_row["id"],
                        "family_name": fam_row["family_name"],
                        "family_code": fam_row["family_code"],
                        "primary_user_id": fam_row["primary_user_id"],
                        "plan_sku": fam_row["plan_sku"],
                        "max_members": fam_row["max_members"],
                        "members_count": len(members_list),
                        "created_at": fam_row["created_at"]
                    },
                    "totals": {
                        "family_sets_today": total_family_sets_today,
                        "family_calories_today": round(total_family_cal_today, 1),
                        "family_sets_all_time": total_family_sets_all,
                        "active_members_today": sum(1 for m in members_list if m["active_today"]),
                        "total_members": len(members_list),
                        "slots_remaining": max(0, fam_row["max_members"] - len(members_list))
                    },
                    "members": members_list
                })
            return

        self._send_json(404, {"success": False, "error": "Endpoint not found"})

    def end_headers(self):
        """Ensure proper CORS and security headers on every response."""
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def run_server():
    """Start the HTTP server on 0.0.0.0 at port 8088."""
    init_db()
    local_ip = get_local_ip()

    socketserver.TCPServer.allow_reuse_address = True

    with socketserver.TCPServer(("0.0.0.0", PORT), SuryasarthiRequestHandler) as httpd:
        stats = get_system_stats()
        print("=" * 70)
        print(" 🌅 SURYASARTHI 108 — Multi-User SQLite Server")
        print("=" * 70)
        print(f" Dedicated Port    : {PORT} (Isolated from other applications)")
        print(f" Database File     : {DB_FILE}")
        print(f" Registered Users  : {stats['total_users']}")
        print(f" Total Workouts    : {stats['total_workout_records']} logs ({stats['total_sets_across_all_users']} total sets)")
        print(f" Local Machine URL : http://localhost:{PORT}")
        print(f" Network (LAN) URL : http://{local_ip}:{PORT}")
        print("-" * 70)
        print(f" 📲 Open 'http://{local_ip}:{PORT}' on any device on your Wi-Fi!")
        print(" Press Ctrl + C to stop the server.")
        print("=" * 70)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")
            httpd.shutdown()



def wsgi_app(environ, start_response):
    """Standard WSGI entrypoint for PythonAnywhere, Gunicorn, uWSGI."""
    init_db()
    method = environ.get("REQUEST_METHOD", "GET").upper()
    path = environ.get("PATH_INFO", "/")
    query_string = environ.get("QUERY_STRING", "")
    qs = parse_qs(query_string)

    cors_headers = [
        ("Access-Control-Allow-Origin", "*"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ("Access-Control-Allow-Headers", "Content-Type, Authorization"),
        ("Access-Control-Max-Age", "86400"),
    ]

    if method == "OPTIONS":
        start_response("204 No Content", cors_headers)
        return [b""]

    def send_json(status_code, data_obj):
        resp_bytes = json.dumps(data_obj, ensure_ascii=False).encode("utf-8")
        status_map = {
            200: "200 OK",
            400: "400 Bad Request",
            401: "401 Unauthorized",
            403: "403 Forbidden",
            404: "404 Not Found",
            409: "409 Conflict",
            500: "500 Internal Server Error",
        }
        status_str = status_map.get(status_code, f"{status_code} Status")
        headers = cors_headers + [
            ("Content-Type", "application/json; charset=utf-8"),
            ("Content-Length", str(len(resp_bytes))),
            ("Cache-Control", "no-cache, no-store, must-revalidate"),
        ]
        start_response(status_str, headers)
        return [resp_bytes]

    auth_header = environ.get("HTTP_AUTHORIZATION", "")
    token = ""
    if auth_header.startswith("Bearer "):
        token = auth_header[7:].strip()
    elif "token" in qs:
        token = qs["token"][0]

    user = get_user_by_token(token)

    if method == "GET":
        if path == "/api/status":
            return send_json(200, {
                "success": True,
                "status": "online",
                "app": "Suryasarthi 108",
                "server_time": datetime.now().isoformat()
            })

        if path == "/api/auth/me":
            if not user:
                return send_json(401, {"success": False, "error": "Unauthorized / Session expired"})
            return send_json(200, {"success": True, "user": user})

        if path == "/api/data":
            if not user:
                return send_json(401, {"success": False, "error": "Authentication required to access user data"})
            try:
                user_payload = load_user_data_from_db(user["id"])
                return send_json(200, {
                    "success": True,
                    "user": user,
                    "cfg": user_payload["cfg"],
                    "data": user_payload["data"]
                })
            except Exception as e:
                return send_json(500, {"success": False, "error": str(e)})

        if path == "/api/admin/users":
            if not user or user.get("role") != "admin":
                return send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT u.id, u.username, u.name, u.role, u.age, u.weight, u.height, u.created_at,
                           COALESCE(SUM(w.sets), 0) AS total_sets,
                           COUNT(w.date) AS workout_days,
                           MAX(w.date) AS last_active_date
                    FROM users u
                    LEFT JOIN user_workouts w ON u.id = w.user_id
                    GROUP BY u.id
                    ORDER BY u.id ASC
                """)
                users_list = [dict(r) for r in cursor.fetchall()]
            return send_json(200, {"success": True, "users": users_list})

        if path == "/api/admin/user-data":
            if not user or user.get("role") != "admin":
                return send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
            target_user_id = qs.get("user_id", [None])[0]
            if not target_user_id:
                return send_json(400, {"success": False, "error": "Missing user_id parameter"})
            try:
                target_payload = load_user_data_from_db(int(target_user_id))
                return send_json(200, {"success": True, "user_id": target_user_id, **target_payload})
            except Exception as e:
                return send_json(500, {"success": False, "error": str(e)})

        if path == "/api/admin/stats":
            if not user or user.get("role") != "admin":
                return send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
            return send_json(200, {"success": True, "stats": get_system_stats()})

        if path == "/api/backup":
            if not user or user.get("role") != "admin":
                return send_json(403, {"success": False, "error": "Forbidden: Admin access required"})
            if not os.path.exists(DB_FILE):
                return send_json(404, {"success": False, "error": "Database file not found."})
            with open(DB_FILE, "rb") as f:
                db_bytes = f.read()
            headers = cors_headers + [
                ("Content-Type", "application/x-sqlite3"),
                ("Content-Disposition", 'attachment; filename="suryasarthi_users.db"'),
                ("Content-Length", str(len(db_bytes))),
            ]
            start_response("200 OK", headers)
            return [db_bytes]

    elif method == "POST":
        try:
            content_length = int(environ.get("CONTENT_LENGTH", 0))
            body_bytes = environ["wsgi.input"].read(content_length)
            payload = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
        except Exception as e:
            return send_json(400, {"success": False, "error": f"Invalid JSON: {str(e)}"})

        if path == "/api/auth/register":
            username = str(payload.get("username", "")).strip().lower()
            password = str(payload.get("password", "")).strip()
            name = str(payload.get("name", "")).strip() or username.capitalize()
            role = "user"
            try:
                age = int(payload.get("age", 0))
            except Exception:
                age = 0
            try:
                weight = float(payload.get("weight", 0.0))
            except Exception:
                weight = 0.0
            try:
                height = float(payload.get("height", 0.0))
            except Exception:
                height = 0.0

            if not username or not password:
                return send_json(400, {"success": False, "error": "Username and password are required"})

            if not age or age < 5 or age > 120:
                return send_json(400, {"success": False, "error": "Age is mandatory (must be between 5 and 120 years)."})

            if not weight or weight < 20 or weight > 250:
                return send_json(400, {"success": False, "error": "Weight is mandatory (must be between 20 and 250 kg)."})

            if not height or height < 60 or height > 250:
                return send_json(400, {"success": False, "error": "Height is mandatory (must be between 60 and 250 cm)."})

            pwd_hash = hash_password(password)
            token = secrets.token_hex(24)

            try:
                with sqlite3.connect(DB_FILE) as conn:
                    cursor = conn.cursor()
                    cursor.execute("""
                        INSERT INTO users (username, password_hash, name, role, age, weight, height)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (username, pwd_hash, name, role, age, weight, height))
                    user_id = cursor.lastrowid
                    cursor.execute("""
                        INSERT INTO user_sessions (token, user_id)
                        VALUES (?, ?)
                    """, (token, user_id))
                    conn.commit()

                user_obj = {
                    "id": user_id,
                    "username": username,
                    "name": name,
                    "role": role,
                    "age": age,
                    "weight": weight,
                    "height": height
                }
                return send_json(200, {
                    "success": True,
                    "message": "User registered successfully",
                    "token": token,
                    "user": user_obj
                })
            except sqlite3.IntegrityError:
                return send_json(409, {"success": False, "error": "Username already exists. Please choose another."})
            except Exception as e:
                return send_json(500, {"success": False, "error": str(e)})

        if path == "/api/auth/login":
            username = str(payload.get("username", "")).strip().lower()
            password = str(payload.get("password", "")).strip()

            if not username or not password:
                return send_json(400, {"success": False, "error": "Username and password are required"})

            with sqlite3.connect(DB_FILE) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT id, username, password_hash, name, role, age, weight, height
                    FROM users
                    WHERE username = ?
                """, (username,))
                row = cursor.fetchone()

                if not row or not verify_password(password, row["password_hash"]):
                    return send_json(401, {"success": False, "error": "Invalid username or password"})

                user_id = row["id"]
                token = secrets.token_hex(24)

                cursor.execute("""
                    INSERT INTO user_sessions (token, user_id)
                    VALUES (?, ?)
                """, (token, user_id))
                conn.commit()

                user_obj = {
                    "id": user_id,
                    "username": row["username"],
                    "name": row["name"],
                    "role": row["role"],
                    "age": row["age"] or 0,
                    "weight": row["weight"] or 0,
                    "height": row["height"] or 0
                }
                return send_json(200, {
                    "success": True,
                    "message": "Login successful",
                    "token": token,
                    "user": user_obj
                })

        if path == "/api/auth/logout":
            if token:
                with sqlite3.connect(DB_FILE) as conn:
                    cursor = conn.cursor()
                    cursor.execute("DELETE FROM user_sessions WHERE token = ?", (token,))
                    conn.commit()
            return send_json(200, {"success": True, "message": "Logged out successfully"})

        if path == "/api/data":
            if not user:
                return send_json(401, {"success": False, "error": "Authentication required to save data"})

            try:
                save_user_data_to_db(user["id"], payload, create_snapshot=False)
                return send_json(200, {
                    "success": True,
                    "message": "Practice data saved to SQLite",
                    "user_id": user["id"]
                })
            except Exception as e:
                return send_json(500, {"success": False, "error": str(e)})

    return send_json(404, {"success": False, "error": "Endpoint not found"})


application = wsgi_app


if __name__ == "__main__":
    run_server()
