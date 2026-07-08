const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Simple single-admin login: username + password are checked against
// values in .env. On success, issue a JWT valid for 7 days.
router.post("/login", (req, res) => {
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
