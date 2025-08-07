import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const presetsDir = path.resolve(__dirname, "../../presets");

export function loadPresetConfig(presetName) {
  const filePath = path.resolve(presetsDir, `${presetName}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Preset "${presetName}" not found.`);
    process.exit(1);
  }

  try {
    const config = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return config;
  } catch (err) {
    console.error(`❌ Failed to parse preset JSON: ${err.message}`);
    process.exit(1);
  }
}
