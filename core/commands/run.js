import { execa } from "execa";
import chalk from "chalk";
import { buildRunCommand, resolvePackageManager, ensurePmAvailable } from "../../helpers/packageManager.js";

export async function runScript(script, scriptArgs = []) {
  const cwd = process.cwd();
  if (!script) {
    console.log(chalk.red("❌ Please specify a script to run."));
    process.exitCode = 1;
    return;
  }
  const pm = await resolvePackageManager(cwd, { promptIfMissing: true });
  if (!(await ensurePmAvailable(pm))) return;

  const { cmd, args } = buildRunCommand(pm, script, scriptArgs);
  console.log(chalk.cyan(`▶ Running: ${pm} ${args.join(" ")}`));
  await execa(cmd, args, { stdio: "inherit", cwd });
}
