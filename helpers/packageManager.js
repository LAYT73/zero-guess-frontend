import fs from "fs-extra";
import { execa } from "execa";
import chalk from "chalk";
import inquirer from "inquirer";
import { readProjectConfig, writeProjectConfig } from "./config/userConfig.js";

export function detectPackageManager(cwd) {
  try {
    const saved = readProjectConfig(cwd);
    if (saved && typeof saved.packageManager === "string") {
      return saved.packageManager;
    }
  } catch {}


  const files = fs.readdirSync(cwd);
  if (files.includes("pnpm-lock.yaml")) return "pnpm";
  if (files.includes("yarn.lock")) return "yarn";
  if (files.includes("bun.lockb")) return "bun";
  if (files.includes("package-lock.json")) return "npm";

  const order = ["pnpm", "yarn", "bun", "npm"];
  for (const pm of order) {
    try {
      const res = execa.sync(pm, ["--version"]);
      if (res.exitCode === 0) return pm;
    } catch {}
  }
  return "npm";
}

export function buildAddCommand(pm, pkgs, { dev = false } = {}) {
  if (!Array.isArray(pkgs) || pkgs.length === 0) {
    throw new Error("No packages provided to add");
  }
  switch (pm) {
    case "yarn":
      return { cmd: "yarn", args: ["add", ...(dev ? ["-D"] : []), ...pkgs] };
    case "pnpm":
      return { cmd: "pnpm", args: ["add", ...(dev ? ["-D"] : []), ...pkgs] };
    case "bun":
      return { cmd: "bun", args: ["add", ...(dev ? ["-d"] : []), ...pkgs] };
    case "npm":
    default:
      return { cmd: "npm", args: ["install", ...(dev ? ["--save-dev"] : []), ...pkgs] };
  }
}

export function buildRunCommand(pm, script, scriptArgs = []) {
  if (!script) throw new Error("No script provided to run");
  switch (pm) {
    case "yarn":
      return { cmd: "yarn", args: ["run", script, ...scriptArgs] };
    case "pnpm":
      return { cmd: "pnpm", args: ["run", script, ...scriptArgs] };
    case "bun":
      return { cmd: "bun", args: ["run", script, ...scriptArgs] };
    case "npm":
    default:
      return { cmd: "npm", args: ["run", script, ...scriptArgs] };
  }
}

export async function ensurePmAvailable(pm) {
  try {
    await execa(pm, ["--version"]);
    return true;
  } catch {
    console.log(chalk.redBright(`❌ Package manager "${pm}" not found. Install it and try again.`));
    return false;
  }
}

export async function resolvePackageManager(cwd, { promptIfMissing = true } = {}) {
  const detected = detectPackageManager(cwd);
  if (detected) return detected;

  if (!promptIfMissing) return "npm";

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "pm",
      message: "Select package manager to use (saved to .zgfconfig.json):",
      choices: ["npm", "yarn", "pnpm", "bun"],
      default: "npm",
    },
  ]);
  writeProjectConfig(cwd, { packageManager: answer.pm });
  return answer.pm;
}
