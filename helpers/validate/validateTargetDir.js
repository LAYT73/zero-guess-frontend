import fs from "fs-extra";
import inquirer from "inquirer";
import chalk from "chalk";

export async function validateTargetDir(targetPath, appName) {
  if (!fs.existsSync(targetPath)) return true;

  const { overwrite } = await inquirer.prompt([
    {
      type: "confirm",
      name: "overwrite",
      message: `⚠️  Directory "${appName}" already exists. Overwrite?`,
      default: false,
    },
  ]);

  if (!overwrite) {
    console.log(chalk.redBright("\n❌ Operation cancelled by user.\n"));
    return false;
  }

  await fs.remove(targetPath);
  return true;
}
