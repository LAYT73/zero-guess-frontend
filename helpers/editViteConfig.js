import fs from "fs-extra";
import path from "path";

/**
 * Переименовывает vite.config.ts → vite.config.js, если выбран язык JS.
 *
 * @param {string} targetPath - Путь к проекту.
 * @param {"ts" | "js"} language - Язык проекта.
 */
export async function editViteConfig(targetPath, language) {
  try {
    const tsConfigPath = path.join(targetPath, "vite.config.ts");
    const jsConfigPath = path.join(targetPath, "vite.config.js");

    if (language === "js") {
      if (await fs.pathExists(tsConfigPath)) {
        // Прочитать содержимое, заменить синтаксис при необходимости
        let content = await fs.readFile(tsConfigPath, "utf-8");

        // Удалить аннотации типа и заменить ES-модули TS на JS-эквиваленты
        content = content
          .replace(/: \w+/g, "") // грубая очистка типов
          .replace(/\.ts(['"])/g, ".js$1") // замена .ts на .js в путях
          .replace(/ as Plugin/g, ""); // удалить типовые приведения

        await fs.writeFile(jsConfigPath, content, "utf-8");
        await fs.remove(tsConfigPath);
      }
    }
  } catch (error) {
    console.error("❌ Failed to edit Vite config:", error.message);
    throw error;
  }
}
