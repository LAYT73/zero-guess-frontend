import fs from "fs-extra";
import path from "path";

/**
 * Converts TypeScript references in main.tsx to JavaScript references.
 *
 * @param {string} targetPath - Path to the project.
 */
export async function convertTsToJsReferences(targetPath) {
  const mainTsxPath = path.join(targetPath, "src", "main.tsx");
  const mainJsxPath = path.join(targetPath, "src", "main.jsx");

  if (!(await fs.pathExists(mainTsxPath))) return;

  let content = await fs.readFile(mainTsxPath, "utf-8");

  // Remove "!" after getElementById
  content = content.replace(
    /getElementById\('root'\)!/g,
    "getElementById('root')"
  );

  // Replace .tsx with .jsx in imports
  content = content.replace(/\.tsx/g, ".jsx");

  // Write as .jsx and remove .tsx
  await fs.writeFile(mainJsxPath, content, "utf-8");
  await fs.remove(mainTsxPath);
}
