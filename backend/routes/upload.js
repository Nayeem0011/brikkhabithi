const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

function fileFilter(req, file, cb) {
  const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype);
  cb(ok ? null : new Error("শুধুমাত্র ছবি (jpg/png/webp/gif) আপলোড করা যাবে"), ok);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Admin-only: upload a single product image, returns the public URL/path
// to be saved on the product record.
router.post("/", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "কোনো ফাইল পাওয়া যায়নি" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
