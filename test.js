const http = require("http");
const { spawn } = require("child_process");

const child = spawn(process.execPath, ["app.js"], {
  env: { ...process.env, PORT: "3100" },
  stdio: ["ignore", "pipe", "pipe"]
});

let finished = false;

function finish(code, message) {
  if (finished) return;
  finished = true;
  clearTimeout(timer);
  child.kill();
  console.log(message);
  process.exit(code);
}

const timer = setTimeout(() => finish(1, "Test failed: application did not start in time."), 10000);

setTimeout(() => {
  http.get("http://127.0.0.1:3100/health", (res) => {
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
      if (res.statusCode === 200 && body.includes("UP")) {
        finish(0, "Test passed: /health returned 200 and status UP.");
      } else {
        finish(1, `Test failed: unexpected response ${res.statusCode} ${body}`);
      }
    });
  }).on("error", err => finish(1, `Test failed: ${err.message}`));
}, 1000);
