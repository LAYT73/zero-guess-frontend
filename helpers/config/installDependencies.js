import { execa } from "execa";
import chalk from "chalk";

/**
 * Installs project dependencies using the specified package manager.
 * @param {string} pm - Package manager to use (e.g., "npm", "yarn", "pnpm").
 * @param {string} cwd - Current working directory where the command should be executed.
 * @returns {Promise<void>}
 */
export async function installDependencies(pm, cwd) {
  console.log(chalk.blue("📦 Installing dependencies..."));
  await execa(pm, ["install"], { cwd, stdio: "inherit" });
}
