import fs from "fs-extra";
import path from "path";

/**
 * Редактирует package.json в указанной директории.
 *
 * @param {string} targetPath - Путь к директории проекта.
 * @param {string} appName - Новое имя проекта.
 * @param {"ts" | "js"} language - Выбранный язык проекта.
 */
export async function editPackageJson(targetPath, appName, language) {
  try {
    const pkgJsonPath = path.join(targetPath, "package.json");

    // Прочитать package.json
    const pkg = await fs.readJson(pkgJsonPath);

    // Заменить имя проекта
    pkg.name = appName;

    // Если выбран язык JS, удалить зависимости TypeScript и типы
    if (language === "js") {
      if (pkg.devDependencies) {
        delete pkg.devDependencies.typescript;
        delete pkg.devDependencies["typescript-eslint"];
        delete pkg.devDependencies["@types/react"];
        delete pkg.devDependencies["@types/react-dom"];
      }

      // Обновить скрипт сборки без tsc
      if (pkg.scripts && pkg.scripts.build?.includes("tsc")) {
        pkg.scripts.build = "vite build";
      }
    }

    // Записать обратно
    await fs.writeJson(pkgJsonPath, pkg, { spaces: 2 });
  } catch (error) {
    console.error("❌ Failed to edit package.json:", error.message);
    throw error;
  }
}
