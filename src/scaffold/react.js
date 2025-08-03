import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import { askUser } from "../../utils/ack.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createReactApp() {
  const answers = await askUser();
  const { appName, packageManager, language, architecture } = answers;

  const targetPath = path.join(process.cwd(), appName);
  const templateBasePath = path.join(__dirname, "../../templates");

  // Example: templates/react/vite-fsd-ts
  const templatePath = path.join(
    templateBasePath,
    "react",
    `vite-${architecture}-${language}`
  );

  console.log(
    chalk.cyan(`\n📁 Creating project "${appName}" from template...`)
  );

  // Copy template files to target directory
  await fs.copy(templatePath, targetPath);

  // Initialize git repository
  await execa("git", ["init"], { cwd: targetPath, stdio: "inherit" });

  // Install dependencies
  await execa(packageManager, ["install"], {
    cwd: targetPath,
    stdio: "inherit",
  });

  console.log(
    chalk.greenBright(`\n✅ Project "${appName}" created successfully!\n`)
  );
}
