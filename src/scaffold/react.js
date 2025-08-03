import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { askUser } from "./../../utils/ack.js";

import { validateTemplate } from "./../../helpers/validateTemplate.js";
import { validateTargetDir } from "./../../helpers/validateTargetDir.js";
import { initGit } from "./../../helpers/initGit.js";
import { checkPackageManager } from "./../../helpers/checkPackageManager.js";
import { installDependencies } from "./../../helpers/installDependencies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createReactApp() {
  try {
    const { appName, packageManager, language, architecture } = await askUser();
    const targetPath = path.join(process.cwd(), appName);
    const templatePath = path.join(
      __dirname,
      "../../templates",
      "react",
      `vite-${architecture}-${language}`
    );

    if (!validateTemplate(templatePath, language, architecture)) return;
    if (!(await validateTargetDir(targetPath, appName))) return;

    console.log(
      chalk.cyan(`\n📁 Creating project "${appName}" from template...`)
    );
    await fs.copy(templatePath, targetPath);

    if (!(await initGit(targetPath))) return;
    if (!(await checkPackageManager(packageManager))) return;

    await installDependencies(packageManager, targetPath);

    await fs.writeJson(path.join(targetPath, ".meta.json"), {
      appName,
      packageManager,
      language,
      architecture,
      createdAt: new Date().toISOString(),
    });

    console.log(
      chalk.greenBright(`\n✅ Project "${appName}" created successfully!\n`)
    );
    console.log(chalk.cyan(`\n👉 Next steps:`));
    console.log(chalk.yellow(`  cd ${appName}`));
    console.log(chalk.yellow(`  ${packageManager} run dev\n`));
  } catch (error) {
    console.error(chalk.redBright(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
