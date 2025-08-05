import { execa } from "execa";
import chalk from "chalk";

export async function checkPackageManager(pm) {
  try {
    await execa(pm, ["--version"]);
    return true;
  } catch {
    console.log(
      chalk.redBright(
        `\n❌ Package manager "${pm}" not found. Install it and try again.`
      )
    );
    return false;
  }
}
