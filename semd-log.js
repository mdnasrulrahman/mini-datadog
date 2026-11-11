fetch("http://localhost:2000/logs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    service: "payment-app",
    level: "ERROR",
    message: "Database connection failed",
  }),
})
  .then((r) => r.json())
  .then(console.log);