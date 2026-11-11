const express = require("express");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Database file banao (agar nahi hai to khud ban jayegi)
const fs = require("fs");
fs.mkdirSync("data", { recursive: true });
const db = new Database("data/logs.db");

// Table banao (table = excel sheet jaisa, rows aur columns)
db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT,
    level TEXT,
    message TEXT,
    time TEXT
  )
`);

// POST /logs : koi app yahan log bhejta hai
app.post("/logs", (req, res) => {
  const { service, level, message } = req.body;
  const time = new Date().toISOString();

  db.prepare(
    "INSERT INTO logs (service, level, message, time) VALUES (?, ?, ?, ?)"
  ).run(service, level, message, time);

  console.log("Log mila:", { service, level, message });
  res.json({ ok: true });
});

// GET /logs : logs dikhao (filter bhi chalega)
// Example: /logs?level=ERROR  ya  /logs?search=database
app.get("/logs", (req, res) => {
  const { level, search } = req.query;

  let query = "SELECT * FROM logs WHERE 1=1";
  const params = [];

  if (level) {
    query += " AND level = ?";
    params.push(level);
  }
  if (search) {
    query += " AND message LIKE ?";
    params.push("%" + search + "%");
  }
  query += " ORDER BY id DESC LIMIT 200";

  const rows = db.prepare(query).all(...params);
  res.json(rows);
});


// ALERT: har 10 second mein check karo, pichle 1 minute mein kitne ERROR aaye
setInterval(() => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

  const result = db
    .prepare("SELECT COUNT(*) AS total FROM logs WHERE level = 'ERROR' AND time > ?")
    .get(oneMinuteAgo);

  if (result.total >= 5) {
    console.log("🚨 ALERT: pichle 1 minute mein " + result.total + " ERROR aaye!");
  }
}, 10000);

// Dashboard ke liye alert status
app.get("/alert", (req, res) => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
  const result = db
    .prepare("SELECT COUNT(*) AS total FROM logs WHERE level = 'ERROR' AND time > ?")
    .get(oneMinuteAgo);
  res.json({ errors: result.total, alert: result.total >= 5 });
});

app.listen(2000, () => {
  console.log("Server chalu: http://localhost:2000");
});
