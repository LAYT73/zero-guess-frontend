import fs from "fs-extra";
import path from "path";

/**
 * Edits the package.json file to update the project name and dependencies
 *
 * @param {string} targetPath - Path to the project directory.
 * @param {string} appName - New project name.
 * @param {"ts" | "js"} language - Selected project language.
 * @param {boolean} routing - Whether routing is enabled.
 */
export async function editPackageJson(targetPath, appName, language, routing) {
  try {
    const pkgJsonPath = path.join(targetPath, "package.json");

    // Read package.json
    const pkg = await fs.readJson(pkgJsonPath);

    // Replace project name
    pkg.name = appName;

    // If JS is selected, remove TypeScript dependencies and types
    if (language === "js") {
      if (pkg.devDependencies) {
        delete pkg.devDependencies.typescript;
        delete pkg.devDependencies["typescript-eslint"];
        delete pkg.devDependencies["@types/react"];
        delete pkg.devDependencies["@types/react-dom"];
      }

      // Update build script without tsc
      if (pkg.scripts && pkg.scripts.build?.includes("tsc")) {
        pkg.scripts.build = "vite build";
      }
    }

    if (pkg.dependencies && routing) {
      pkg.dependencies["react-router-dom"] = "^7.1.1";
    }

    // Write back
    await fs.writeJson(pkgJsonPath, pkg, { spaces: 2 });
  } catch (error) {
    console.error("❌ Failed to edit package.json:", error.message);
    throw error;
  }
}
