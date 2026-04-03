const { execSync } = require("child_process");

try {
  const fetch = execSync("git fetch origin main", {
    cwd: "/vercel/share/v0-project",
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  console.log("fetch:", fetch);

  const reset = execSync("git reset --hard origin/main", {
    cwd: "/vercel/share/v0-project",
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  console.log("reset:", reset);

  console.log("Done — local files now match origin/main");
} catch (e) {
  console.error("Error:", e.message);
  console.error(e.stderr);
}
