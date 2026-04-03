import { execSync } from "child_process";

try {
  const result = execSync(
    "cd /vercel/share/v0-project && git fetch origin main && git reset --hard origin/main",
    { encoding: "utf-8" }
  );
  console.log(result);
} catch (e) {
  console.error(e.message);
}
