const services = ["payment-app", "login-app", "search-app", "email-app"];
const levels = ["INFO", "INFO", "INFO", "WARN", "ERROR"]; // INFO zyada, ERROR kam (real jaisa)
const messages = {
  INFO: ["User logged in", "Page loaded", "Order placed", "Email sent"],
  WARN: ["Slow response", "Memory 80% full", "Retrying request"],
  ERROR: ["Database connection failed", "Payment declined", "Timeout after 30s"],
};

const TOTAL = 1000; // kitne logs bhejne hain

async function run() {
  const start = Date.now();

  for (let i = 0; i < TOTAL; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const options = messages[level];
    const message = options[Math.floor(Math.random() * options.length)];

    await fetch("http://localhost:2000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, level, message }),
    });
  }

  const seconds = (Date.now() - start) / 1000;
  console.log("Bheje: " + TOTAL + " logs");
  console.log("Time: " + seconds + " seconds");
  console.log("Speed: " + Math.round(TOTAL / seconds) + " logs/second");
}

run();