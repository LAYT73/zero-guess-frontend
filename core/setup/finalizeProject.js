import fs from "fs-extra";
import path from "path";
import { checkPackageManager } from "../../helpers/validate/checkPackageManager.js";
import { initGit } from "../../helpers/config/initGit.js";
import { installDependencies } from "../../helpers/config/installDependencies.js";

export async function finalizeProject(config, targetPath) {
  const { packageManager } = config;

  if (!(await initGit(targetPath))) process.exit(1);
  if (!(await checkPackageManager(packageManager))) process.exit(1);

  await installDependencies(packageManager, targetPath);

  await fs.writeJson(path.join(targetPath, ".meta.json"), {
    ...config,
    createdAt: new Date().toISOString(),
  });
}
