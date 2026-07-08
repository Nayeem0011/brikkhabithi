const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "data.sqlite"));
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
