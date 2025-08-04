import fs from "fs-extra";
import path from "path";

/**
 * Удаляет TypeScript-файлы и конфиги при выборе языка JavaScript.
 *
 * @param {string} targetPath - Путь к корню проекта.
 * @param {"ts" | "js"} language - Язык проекта.
 */
export async function toggleTypeScriptSupport(targetPath, language) {
  try {
    if (language === "js") {
      // Удалить tsconfig.*.json
      const tsconfigs = [
        "tsconfig.json",
        "tsconfig.node.json",
        "tsconfig.app.json",
        "vite-env.d.ts",
        path.join("src", "vite-env.d.ts"),
      ];

      for (const config of tsconfigs) {
        const configPath = path.join(targetPath, config);
        if (await fs.pathExists(configPath)) {
          await fs.remove(configPath);
        }
      }

      // Заменить расширения .ts/.tsx на .js/.jsx
      const srcPath = path.join(targetPath, "src");
      const files = await fs.readdir(srcPath);

      for (const file of files) {
        const ext = path.extname(file);
        if (ext === ".ts" || ext === ".tsx") {
          const newExt = ext === ".ts" ? ".js" : ".jsx";
          const oldPath = path.join(srcPath, file);
          const newPath = path.join(srcPath, path.basename(file, ext) + newExt);
          await fs.rename(oldPath, newPath);
        }
      }
    }
  } catch (error) {
    console.error("❌ Failed to toggle TypeScript support:", error.message);
    throw error;
  }
}
