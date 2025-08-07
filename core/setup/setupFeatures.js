import { convertTsToJsReferences } from "../../helpers/convertTsToJsReferences.js";
import { fixHtmlEntryPoint } from "../../helpers/fixHtmlEntryPoint.js";
import { setupRouting } from "../../helpers/setupRouting.js";
import { generateStateManagerTemplate } from "../../helpers/state/generateStateManagerTemplate.js";

export async function setupFeatures(config, targetPath) {
  const { language, routing, privateRouting, stateManager, architecture } =
    config;

  if (language === "js") {
    await convertTsToJsReferences(targetPath);
    await fixHtmlEntryPoint(targetPath);
  }

  if (routing) {
    await setupRouting({ targetPath, language, architecture, privateRouting });
  }

  if (stateManager && stateManager !== "none") {
    await generateStateManagerTemplate({
      targetPath,
      language,
      architecture,
      stateManager,
    });
  }
}
