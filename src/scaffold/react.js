import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { askUser } from "./../../utils/ack.js";

import { validateTemplate } from "./../../helpers/validate/validateTemplate.js";
import { validateTargetDir } from "./../../helpers/validate/validateTargetDir.js";
import { checkPackageManager } from "./../../helpers/validate/checkPackageManager.js";

import { editViteConfig } from "./../../helpers/config/editViteConfig.js";
import { initGit } from "./../../helpers/config/initGit.js";
import { installDependencies } from "./../../helpers/config/installDependencies.js";
import { editPackageJson } from "./../../helpers/config/packageJsonEditor.js";

import { generateStateManagerTemplate } from "./../../helpers/state/generateStateManagerTemplate.js";

import { convertTsToJsReferences } from "./../../helpers/convertTsToJsReferences.js";
import { fixHtmlEntryPoint } from "./../../helpers/fixHtmlEntryPoint.js";
import { setupRouting } from "./../../helpers/setupRouting.js";
import { toggleTypeScriptSupport } from "./../../helpers/toggleTypeScriptSupport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createReactApp() {
  try {
    const {
      appName,
      packageManager,
      language,
      architecture,
      routing,
      privateRouting,
      stateManager,
    } = await askUser();

    const targetPath = path.join(process.cwd(), appName);
    const templatePath = path.join(
      __dirname,
      "../../templates",
      "react",
      `${architecture}`
    );

    if (!validateTemplate(templatePath, language, architecture)) return; // Validate template if it exists
    if (!(await validateTargetDir(targetPath, appName))) return; // Validate target directory if it exists

    console.log(
      chalk.cyan(`\n📁 Creating project "${appName}" from template...`)
    );

    await fs.copy(templatePath, targetPath); // Copy template files

    if (language === "js") {
      await convertTsToJsReferences(targetPath); // Convert TS references to JS in main.tsx
      await fixHtmlEntryPoint(targetPath); // Fix HTML entry point for JS projects
    }

    // Add routing setup if enabled
    if (routing) {
      await setupRouting({
        targetPath,
        language,
        architecture,
        privateRouting,
      });
    }

    if (stateManager && stateManager !== "none") {
      await generateStateManagerTemplate({
        targetPath,
        language,
        architecture,
        stateManager,
      });
    }

    await editPackageJson(targetPath, appName, language, routing, stateManager); // Edit package.json with new app name and dependencies
    await editViteConfig(targetPath, language); // Edit Vite config based on language

    if (language === "js") {
      await toggleTypeScriptSupport(targetPath); // Remove TypeScript support if JS is selected
    }

    if (!(await initGit(targetPath))) return; // Initialize Git repository
    if (!(await checkPackageManager(packageManager))) return; // Check package manager

    await installDependencies(packageManager, targetPath); // Install dependencies

    // Create .meta.json file with project metadata
    await fs.writeJson(path.join(targetPath, ".meta.json"), {
      appName,
      packageManager,
      language,
      architecture,
      routing,
      privateRouting,
      stateManager,
      createdAt: new Date().toISOString(),
    });

    // Log success message
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
