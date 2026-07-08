const express = require("express");
const db = require("../db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Public: list all products
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  res.json(rows);
});

// Public: get a single product
router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "পণ্য পাওয়া যায়নি" });
  res.json(row);
});

// Admin: create product
router.post("/", requireAdmin, (req, res) => {
  const { name, note = "", price = 0, image = "" } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "পণ্যের নাম আবশ্যক" });
  }
  const info = db
    .prepare("INSERT INTO products (name, note, price, image) VALUES (?, ?, ?, ?)")
    .run(String(name).trim(), note, Number(price) || 0, image);
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(row);
});

// Admin: update product
router.put("/:id", requireAdmin, (req, res) => {
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "পণ্য পাওয়া যায়নি" });

  const {
    name = existing.name,
    note = existing.note,
    price = existing.price,
    image = existing.image,
  } = req.body || {};

  db.prepare(
    "UPDATE products SET name = ?, note = ?, price = ?, image = ? WHERE id = ?"
  ).run(name, note, Number(price) || 0, image, req.params.id);

  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  res.json(row);
});

// Admin: delete product
router.delete("/:id", requireAdmin, (req, res) => {
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "পণ্য পাওয়া যায়নি" });
  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
