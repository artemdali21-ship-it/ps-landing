import { execSync } from "child_process";
execSync("cd /vercel/share/v0-project && npm install lenis", { stdio: "inherit" });
