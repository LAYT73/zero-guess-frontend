import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const presetsDir = path.resolve(__dirname, "../../presets");

export function loadPresetList() {
  if (!fs.existsSync(presetsDir)) {
    console.log("❌ No 'presets/' directory found.");
    process.exit(1);
  }

  const files = fs.readdirSync(presetsDir);
  const presetNames = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.basename(file, ".json"));

  return presetNames;
}
