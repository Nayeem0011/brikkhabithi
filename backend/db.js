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

// Seed with the existing hardcoded products, only if table is empty.
const count = db.prepare("SELECT COUNT(*) as c FROM products").get().c;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO products (name, note, price, image) VALUES (?, ?, ?, ?)"
  );
  const seed = [
    ["বাইকুনুর আঙুর চারা", "মিষ্টি, বীজবিহীন জাত", 350, ""],
    ["বোম্বাই লিচু চারা", "ছোট দানা, রসালো", 300, ""],
    ["ড্রাগন ফ্রুট চারা", "লাল মাংসল জাত", 250, ""],
    ["আমের চারা", "দ্রুত ও নিয়মিত ফলন", 280, ""],
    ["মাল্টা ও কমলা", "রসালো, কমলা স্বাদ", 320, ""],
    ["স্ট্রবেরি পেয়ারা চারা", "মুচমুচে ও মিষ্টি", 260, ""],
    ["আপেল কুল", "মিষ্টি স্বাদ", 240, ""],
    ["কাগজি লেবু চারা", "সারা বছর ফলনশীল", 180, ""],
  ];
  const tx = db.transaction((rows) => {
    for (const r of rows) insert.run(...r);
  });
  tx(seed);
}

module.exports = db;
