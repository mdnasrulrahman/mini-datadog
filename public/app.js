async function loadLogs() {
  const level = document.getElementById("level-filter").value;
  const search = document.getElementById("search-box").value;

  const url =
    "/logs?level=" + encodeURIComponent(level) +
    "&search=" + encodeURIComponent(search);

  const response = await fetch(url);
  const logs = await response.json();

  document.getElementById("count").textContent =
    "Showing logs: " + logs.length;

  const table = document.getElementById("log-table");
  table.innerHTML = "";

  logs.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + new Date(log.time).toLocaleTimeString() + "</td>" +
      "<td>" + log.service + "</td>" +
      '<td class="' + log.level + '">' + log.level + "</td>" +
      "<td>" + log.message + "</td>";
    table.appendChild(row);
  });
}

loadLogs();
setInterval(loadLogs, 2000);

async function checkAlert() {
  const response = await fetch("/alert");
  const data = await response.json();
  const banner = document.getElementById("alert-banner");

  if (data.alert) {
    banner.textContent = "🚨 ALERT: pichle 1 minute mein " + data.errors + " ERROR!";
    banner.className = "alert-on";
  } else {
    banner.textContent = "";
    banner.className = "";
  }
}
checkAlert();
setInterval(checkAlert, 2000);