import { execa } from "execa";
import chalk from "chalk";

export async function installDependencies(pm, cwd) {
  console.log(chalk.blue("📦 Installing dependencies..."));
  await execa(pm, ["install"], { cwd, stdio: "inherit" });
}
