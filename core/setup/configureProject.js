import { editPackageJson } from "../../helpers/config/packageJsonEditor.js";
import { editViteConfig } from "../../helpers/config/editViteConfig.js";
import { toggleTypeScriptSupport } from "../../helpers/toggleTypeScriptSupport.js";

export async function configureProject(config, targetPath) {
  const { appName, language, routing, stateManager } = config;

  await editPackageJson(targetPath, appName, language, routing, stateManager);
  await editViteConfig(targetPath, language);

  if (language === "js") {
    await toggleTypeScriptSupport(targetPath);
  }
}
