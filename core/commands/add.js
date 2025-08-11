import { execa } from "execa";
import chalk from "chalk";
import { buildAddCommand, resolvePackageManager, ensurePmAvailable } from "../../helpers/packageManager.js";

export async function addPackages(pkgs, options = {}) {
  const cwd = process.cwd();
  const pm = await resolvePackageManager(cwd, { promptIfMissing: true });
  const dev = !!options.dev;

  if (!pkgs || pkgs.length === 0) {
    console.log(chalk.red("❌ Please specify at least one package to add."));
    process.exitCode = 1;
    return;
  }

  if (!(await ensurePmAvailable(pm))) return;

  const { cmd, args } = buildAddCommand(pm, pkgs, { dev });
  console.log(chalk.cyan(`📦 Installing: ${pkgs.join(", ")} (pm=${pm}${dev ? ", dev" : ""})`));
  await execa(cmd, args, { stdio: "inherit", cwd });
  console.log(chalk.green("✅ Dependencies installed."));
}
