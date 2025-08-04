import fs from "fs-extra";
import path from "path";

/**
 * Обновляет entry-point в index.html для JavaScript версии.
 *
 * @param {string} targetPath - Путь к проекту.
 * @param {"ts" | "js"} language - Язык проекта.
 */
export async function fixHtmlEntryPoint(targetPath, language) {
  if (language !== "js") return;

  const indexHtmlPath = path.join(targetPath, "index.html");
  if (!(await fs.pathExists(indexHtmlPath))) return;

  let content = await fs.readFile(indexHtmlPath, "utf-8");

  // Заменить main.tsx на main.jsx
  content = content.replace(/src\/main\.tsx/g, "src/main.jsx");

  await fs.writeFile(indexHtmlPath, content, "utf-8");
}
