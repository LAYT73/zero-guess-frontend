import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copies the store and slice templates into the project.
 * @param {string} targetPath - The target path for the copied templates.
 * @param {string} language - The programming language of the templates.
 * @param {string} architecture - The architecture type (e.g., fsd, atomic).
 * @param {string} stateManager - The state management library (e.g., redux, mobx).
 */
export async function generateStateManagerTemplate({
  targetPath,
  language,
  architecture,
  stateManager,
}) {
  const srcTemplatePath = path.join(
    __dirname,
    "../../templates/sm",
    stateManager,
    language
  );

  if (!(await fs.pathExists(srcTemplatePath))) {
    console.log(
      chalk.redBright(`❌ Template ${stateManager}/${language} not found.`)
    );
    return;
  }

  // Determine the destination path based on the architecture
  let stateDestination = "";
  switch (architecture) {
    case "fsd":
      stateDestination = path.join(targetPath, "src", "app", "store");
      break;
    case "atomic":
      stateDestination = path.join(targetPath, "src", "store");
      break;
    case "empty":
    default:
      stateDestination = path.join(targetPath, "src", "store");
      break;
  }

  try {
    await fs.ensureDir(stateDestination);
    await fs.copy(srcTemplatePath, stateDestination);
    console.log(
      chalk.green(`✅ State manager (${stateManager}) added to project.`)
    );
  } catch (error) {
    console.error(
      chalk.redBright(`❌ Error copying template: ${error.message}`)
    );
  }
}
