const express = require("express");
const db = require("../db");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Public: customer places an order.
// Expected body: { customerName, phone, address, note, items: [{productId, name, price, qty}] }
router.post("/", (req, res) => {
  const { customerName, phone = "", address = "", note = "", items } = req.body || {};

  if (!customerName || !String(customerName).trim()) {
    return res.status(400).json({ error: "আপনার নাম আবশ্যক" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "কমপক্ষে একটি পণ্য নির্বাচন করুন" });
  }

  // Recompute total server-side from the given items so a tampered
  // client-side price can't be trusted blindly.
  let total = 0;
  const cleanItems = items.map((it) => {
    const qty = Math.max(1, Number(it.qty) || 1);
    const price = Number(it.price) || 0;
    total += qty * price;
    return {
      productId: it.productId,
      name: it.name,
      price,
      qty,
    };
  });

  const info = db
    .prepare(
      `INSERT INTO orders (customerName, phone, address, note, items, total, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`
    )
    .run(
      String(customerName).trim(),
      phone,
      address,
      note,
      JSON.stringify(cleanItems),
      total
    );

  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ ...row, items: JSON.parse(row.items) });
});

// Admin: list all orders, newest first.
router.get("/", requireAdmin, (req, res) => {
  const rows = db.prepare("SELECT * FROM orders ORDER BY id DESC").all();
  res.json(rows.map((r) => ({ ...r, items: JSON.parse(r.items) })));
});

// Admin: update order status (pending / confirmed / delivered / cancelled)
router.patch("/:id/status", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  const allowed = ["pending", "confirmed", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "সঠিক status দিন" });
  }
  const existing = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "অর্ডার পাওয়া যায়নি" });

  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  res.json({ ...row, items: JSON.parse(row.items) });
});

// Admin: delete an order
router.delete("/:id", requireAdmin, (req, res) => {
  const existing = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "অর্ডার পাওয়া যায়নি" });
  db.prepare("DELETE FROM orders WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
