import fs from "fs-extra";
import path from "path";

const PROJECT_CONFIG = ".zgfconfig.json";

export function readProjectConfig(cwd) {
  const p = path.join(cwd, PROJECT_CONFIG);
  if (fs.pathExistsSync(p)) {
    try {
      return fs.readJsonSync(p);
    } catch {
      return {};
    }
  }
  return {};
}

export function writeProjectConfig(cwd, data) {
  const p = path.join(cwd, PROJECT_CONFIG);
  const current = readProjectConfig(cwd);
  const next = { ...current, ...data };
  fs.writeJsonSync(p, next, { spaces: 2 });
  return next;
}
