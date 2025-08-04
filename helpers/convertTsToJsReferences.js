import fs from "fs-extra";
import path from "path";

/**
 * Преобразует main.tsx → main.jsx и корректирует ссылки.
 *
 * @param {string} targetPath - Путь к проекту.
 * @param {"ts" | "js"} language - Язык проекта.
 */
export async function convertTsToJsReferences(targetPath, language) {
  if (language !== "js") return;

  const mainTsxPath = path.join(targetPath, "src", "main.tsx");
  const mainJsxPath = path.join(targetPath, "src", "main.jsx");

  if (!(await fs.pathExists(mainTsxPath))) return;

  let content = await fs.readFile(mainTsxPath, "utf-8");

  // Удалить "!" после getElementById
  content = content.replace(
    /getElementById\('root'\)!/g,
    "getElementById('root')"
  );

  // Заменить .tsx на .jsx в импортах
  content = content.replace(/\.tsx/g, ".jsx");

  // Записать как .jsx и удалить .tsx
  await fs.writeFile(mainJsxPath, content, "utf-8");
  await fs.remove(mainTsxPath);
}
