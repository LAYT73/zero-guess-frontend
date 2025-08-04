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
      await replaceExtensionsRecursive(srcPath);
    }
  } catch (error) {
    console.error("❌ Failed to toggle TypeScript support:", error.message);
    throw error;
  }
}

async function replaceExtensionsRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await replaceExtensionsRecursive(fullPath); // рекурсивный вызов
    } else {
      const ext = path.extname(entry.name);
      if (ext === ".ts" || ext === ".tsx") {
        const newExt = ext === ".ts" ? ".js" : ".jsx";
        const newName = path.basename(entry.name, ext) + newExt;
        const newPath = path.join(dir, newName);
        await fs.rename(fullPath, newPath);
      }
    }
  }
}
