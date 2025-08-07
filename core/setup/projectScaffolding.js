import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { validateTemplate } from "../../helpers/validate/validateTemplate.js";
import { validateTargetDir } from "../../helpers/validate/validateTargetDir.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function projectScaffolding(config) {
  const { appName, architecture, language } = config;

  const targetPath = path.join(process.cwd(), appName);
  const templatePath = path.join(
    __dirname,
    "../../templates",
    "react",
    architecture
  );

  if (!validateTemplate(templatePath, language, architecture)) process.exit(1);
  if (!(await validateTargetDir(targetPath, appName))) process.exit(1);

  console.log(
    chalk.cyan(`\n📁 Creating project "${appName}" from template...`)
  );
  await fs.copy(templatePath, targetPath);

  return { templatePath, targetPath };
}
