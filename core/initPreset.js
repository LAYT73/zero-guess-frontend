import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

import { askUser } from "../utils/requests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliRoot = path.resolve(__dirname, "..");

export async function initPreset() {
  try {
    const {
      appName,
      packageManager,
      language,
      architecture,
      routing,
      privateRouting,
      stateManager,
    } = await askUser(true);

    const presetDir = path.join(cliRoot, "presets");
    const presetPath = path.join(presetDir, `${appName}.json`);

    await fs.ensureDir(presetDir);

    const meta = {
      appName,
      packageManager,
      language,
      architecture,
      routing,
      privateRouting,
      stateManager,
      createdAt: new Date().toISOString(),
    };

    await fs.writeJson(presetPath, meta, { spaces: 2 });

    console.log(
      chalk.greenBright(
        `\n✅ Preset saved to "${path.relative(process.cwd(), presetPath)}"\n`
      )
    );
  } catch (error) {
    console.error(chalk.redBright(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
