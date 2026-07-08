const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// IMPORTANT (Railway / most container hosts): the filesystem is EPHEMERAL.
// Anything written to disk (this sqlite file, uploaded images) is wiped
// every time the service redeploys or restarts. To keep data permanently:
//   1. In Railway: Service -> Settings -> Volumes -> add a volume, mount
//      path e.g. /data
//   2. Set an environment variable DATA_DIR=/data on the service
// Without a volume + DATA_DIR set, products/orders WILL disappear on redeploy.
const DATA_DIR = process.env.DATA_DIR || __dirname;
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "data.sqlite"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    note TEXT DEFAULT '',
    price REAL NOT NULL DEFAULT 0,
    image TEXT DEFAULT '',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    phone TEXT DEFAULT '',
    address TEXT DEFAULT '',
    note TEXT DEFAULT '',
    items TEXT NOT NULL,
    total REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// No default/seed products — the table starts empty and the admin
// panel is the only way products get added.

module.exports = db;
