import fs from "fs-extra";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sets up routing for the project based on the specified language and architecture.
 * @param {Object} options - Options for setting up routing.
 * @param {string} options.targetPath - Path to the project root.
 * @param {"ts" | "js"} options.language - Project language.
 * @param {"fsd" | "atomic" | "empty"} options.architecture - Project architecture.
 * @param {boolean} options.privateRouting - Whether to set up private routing.
 * @returns {Promise<void>}
 */
export async function setupRouting({
  targetPath,
  language,
  architecture,
  privateRouting,
}) {
  const routingTemplatePath = path.join(
    __dirname,
    "..",
    "templates",
    "rrd",
    language
  );

  const tempDir = path.join(os.tmpdir(), `routing-temp-${Date.now()}`);

  try {
    // 1. Create a temporary directory
    await fs.ensureDir(tempDir);

    // 2. Copy base routing
    await fs.copy(path.join(routingTemplatePath, "base"), tempDir);

    // 3. Copy private routing (if enabled)
    if (privateRouting) {
      await fs.copy(path.join(routingTemplatePath, "private"), tempDir);
    }

    // 4. Determine the destination path based on architecture
    let routerDest;
    switch (architecture) {
      case "fsd":
        routerDest = path.join(targetPath, "src", "app", "providers", "router");
        break;
      case "atomic":
        routerDest = path.join(targetPath, "src", "shared", "router");
        break;
      case "empty":
      default:
        routerDest = path.join(targetPath, "src", "router");
        break;
    }

    // 5. Move to the temporary directory
    await fs.ensureDir(routerDest);
    await fs.move(path.join(tempDir, "router"), routerDest, {
      overwrite: true,
    });

    // 6. Clean up
    await fs.remove(tempDir);

    console.log(
      `✅ Routing has been set up for "${architecture}" architecture!`
    );
  } catch (err) {
    console.error(`❌ Failed to set up routing: ${err.message}`);
  }
}
