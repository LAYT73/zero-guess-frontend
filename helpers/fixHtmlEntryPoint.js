import fs from "fs-extra";
import path from "path";

/**
 * Edits the index.html file to fix the entry point for JavaScript projects.
 *
 * @param {string} targetPath - Path to the project.
 */
export async function fixHtmlEntryPoint(targetPath) {
  const indexHtmlPath = path.join(targetPath, "index.html");
  if (!(await fs.pathExists(indexHtmlPath))) return;

  let content = await fs.readFile(indexHtmlPath, "utf-8");

  // Replace main.tsx with main.jsx
  content = content.replace(/src\/main\.tsx/g, "src/main.jsx");

  await fs.writeFile(indexHtmlPath, content, "utf-8");
}
