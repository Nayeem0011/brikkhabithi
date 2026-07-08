require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const uploadRoutes = require("./routes/upload");

const app = express();

// CLIENT_ORIGIN can be a single URL or a comma-separated list (e.g. when you
// have both a production and a preview frontend URL). Trailing slashes are
// stripped since "https://x.com/" !== "https://x.com" for CORS matching.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length
      ? allowedOrigins
      : "*", // no CLIENT_ORIGIN set -> allow all (fine for testing, not ideal for production)
  })
);
app.use(express.json());

console.log("=== Brikkhabithi backend starting ===");
console.log("CLIENT_ORIGIN(s):", allowedOrigins.length ? allowedOrigins : "(none set — allowing *)");
console.log("ADMIN_USERNAME set:", !!process.env.ADMIN_USERNAME);
console.log("ADMIN_PASSWORD set:", !!process.env.ADMIN_PASSWORD);
console.log("JWT_SECRET set:", !!process.env.JWT_SECRET);
console.log("DATA_DIR:", process.env.DATA_DIR || "(not set — using ephemeral local disk, data will be lost on redeploy)");

// Serve uploaded product images statically (see DATA_DIR note in db.js / upload.js)
const uploadsPath = path.join(process.env.DATA_DIR || __dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Fallback error handler (e.g. multer file-type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "সার্ভার ত্রুটি" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Brikkhabithi backend running on http://localhost:${PORT}`);
});
