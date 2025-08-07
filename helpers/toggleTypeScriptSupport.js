import fs from "fs-extra";
import path from "path";

/**
 * Removes TypeScript support from the project by deleting TypeScript configuration files
 *
 * @param {string} targetPath - Path to the project root.
 */
export async function toggleTypeScriptSupport(targetPath) {
  try {
    // Remove tsconfig.*.json
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

    // Replace .ts/.tsx with .js/.jsx
    const srcPath = path.join(targetPath, "src");
    await replaceExtensionsRecursive(srcPath);

    // Modify ESLint config for JavaScript
    const eslintPath = path.join(targetPath, "eslint.config.js");
    if (await fs.pathExists(eslintPath)) {
      await modifyEslintConfigForJS(eslintPath);
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
      await replaceExtensionsRecursive(fullPath);
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

async function modifyEslintConfigForJS(eslintPath) {
  let content = await fs.readFile(eslintPath, "utf8");

  // 1. Удалить import tseslint
  content = content.replace(
    /import\s+tseslint\s+from\s+['"]typescript-eslint['"]\s*\n?/g,
    ""
  );

  // 2. Заменить '**/*.{ts,tsx}' на '**/*.{js,jsx}'
  content = content.replace(/\*\*\s*\{\s*ts\s*,\s*tsx\s*\}/g, "**/*.{js,jsx}");
  content = content.replace(/\*\*\/\*\.\{ts,tsx\}/g, "**/*.{js,jsx}");

  // 3. Удалить tseslint.configs.recommended,
  content = content.replace(/tseslint\.configs\.recommended,\s*\n?/g, "");

  await fs.writeFile(eslintPath, content, "utf8");
}
