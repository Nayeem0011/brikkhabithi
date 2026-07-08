const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Simple single-admin login: username + password are checked against
// values in .env. On success, issue a JWT valid for 7 days.
router.post("/login", (req, res) => {
  // If these aren't set as environment variables on the server (e.g. in the
  // Railway dashboard -> Variables tab), login will always fail with a
  // confusing "wrong username/password" message. Fail loudly instead so
  // it's obvious this is a server config problem, not a typo.
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error(
      "Missing required env vars: ADMIN_USERNAME / ADMIN_PASSWORD / JWT_SECRET. " +
      "Set these in your hosting provider's environment variables (e.g. Railway -> Variables)."
    );
    return res.status(500).json({
      error: "সার্ভার কনফিগারেশন সমস্যা: ADMIN_USERNAME/ADMIN_PASSWORD/JWT_SECRET সেট করা নেই",
    });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "username ও password দিন" });
  }

  const validUser = username === process.env.ADMIN_USERNAME;
  const validPass = password === process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return res.status(401).json({ error: "ভুল username অথবা password" });
  }

  const token = jwt.sign(
    { role: "admin", username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, username });
});

module.exports = router;
