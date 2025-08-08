import fs from "fs-extra";
import path from "path";
import yaml from "yaml";
import { renderTemplate, evaluateCondition } from "../helpers/template.js";
import { runHooks } from "../helpers/hooks.js";

/**
 * Very basic UpperCamelCase validator
 */
function isUpperCamelCase(str) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

/**
 * Main generator function
 */
export async function generateFromYaml(templatePath, userParams, outputDir) {
  const fileContent = await fs.readFile(templatePath, "utf8");
  const template = yaml.parse(fileContent);

  const context = {};
  const templateDir = path.dirname(path.resolve(templatePath));

  for (const [param, config] of Object.entries(template.params || {})) {
    const value = userParams[param] ?? config.default;

    // TODO: Implement additional validation logic
    if (config.validator === "UpperCamelCase" && !isUpperCamelCase(value)) {
      throw new Error(`Parameter "${param}" must be in UpperCamelCase`);
    }

    if (config.type === "enum" && !config.values.includes(value)) {
      throw new Error(
        `Parameter "${param}" must be one of: ${config.values.join(", ")}`
      );
    }

    context[param] = value;
  }

  // enrich base context with common variables
  context.outputDir = outputDir;
  context.templateDir = templateDir;

  if (template.hooks?.preGenerate) {
    await fs.ensureDir(outputDir);
    await runHooks(context, outputDir, template.hooks.preGenerate);
  }

  const createdFiles = [];

  for (const file of template.files || []) {
    if (file.condition && !evaluateCondition(file.condition, context)) {
      continue;
    }

    const filename = renderTemplate(file.name, context);
    const content = renderTemplate(file.content || "", context);

    const fullPath = path.join(outputDir, filename);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
    console.log(`✅ Created: ${filename}`);

    createdFiles.push({ filename, fullPath });

    if (template.hooks?.afterEach) {
      await runHooks(context, outputDir, template.hooks.afterEach, { fileName: filename, filePath: fullPath });
    }
  }

  if (template.hooks?.postGenerate) {
    await runHooks(context, outputDir, template.hooks.postGenerate, { createdFiles: JSON.stringify(createdFiles) });
    console.log("✅ postGenerate hooks completed");
  }
}
