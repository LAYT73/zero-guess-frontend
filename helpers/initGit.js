import { execa } from "execa";
import chalk from "chalk";

export async function initGit(targetPath) {
  try {
    await execa("git", ["init"], { cwd: targetPath, stdio: "inherit" });
  } catch (error) {
    if (
      error.code === "ENOENT" ||
      (typeof error.message === "string" &&
        error.message.toLowerCase().includes("not found"))
    ) {
      console.log(
        chalk.redBright(
          `\n❌ Git is not installed or not available in your PATH.\nInstall it from https://git-scm.com/ and try again.`
        )
      );
      return false;
    }
    throw error;
  }
  return true;
}
