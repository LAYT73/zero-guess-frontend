import fs from "fs-extra";
import path from "path";

/**
 * Rename and edit Vite config file when switching from TypeScript to JavaScript.
 *
 * @param {string} targetPath - Path to the project root.
 * @param {"ts" | "js"} language - Project language.
 */
export async function editViteConfig(targetPath, language) {
  try {
    const tsConfigPath = path.join(targetPath, "vite.config.ts");
    const jsConfigPath = path.join(targetPath, "vite.config.js");

    if (language === "js") {
      if (await fs.pathExists(tsConfigPath)) {
        // Read the content and replace the syntax if necessary
        let content = await fs.readFile(tsConfigPath, "utf-8");

        // Remove type annotations and replace TS ES modules with JS equivalents
        content = content
          .replace(/: \w+/g, "") // crude type removal
          .replace(/\.ts(['"])/g, ".js$1") // replace .ts with .js in paths
          .replace(/ as Plugin/g, ""); // remove type assertions

        await fs.writeFile(jsConfigPath, content, "utf-8");
        await fs.remove(tsConfigPath);
      }
    }
  } catch (error) {
    console.error("❌ Failed to edit Vite config:", error.message);
    throw error;
  }
}
