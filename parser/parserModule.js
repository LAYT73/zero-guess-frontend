import fs from "fs-extra";
import path from "path";
import yaml from "yaml";

/**
 * Converts {{=param}} syntax to {{ param }} for compatibility with template engine
 */
function preprocessTemplate(str) {
  return str.replace(/\{\{=(.+?)\}\}/g, "{{$1}}");
}

/**
 * Very basic UpperCamelCase validator
 */
function isUpperCamelCase(str) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

/**
 * Simple condition evaluator (for booleans only)
 */
function evaluateCondition(template, context) {
  const expr = preprocessTemplate(template).replace(
    /\{\{\s*(\w+)\s*\}\}/g,
    "$1"
  );

  const fn = new Function(...Object.keys(context), `return ${expr}`);
  return fn(...Object.values(context));
}

/**
 * Simple variable interpolation with strict mode
 * Throws an error if a variable is not found in context
 */
function renderTemplate(template, context) {
  const preprocessed = preprocessTemplate(template);
  return preprocessed.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    if (!(key in context)) {
      throw new Error(`Unknown template variable: "${key}"`);
    }
    return context[key];
  });
}

/**
 * Main generator function
 */
export async function generateFromYaml(templatePath, userParams, outputDir) {
  const fileContent = await fs.readFile(templatePath, "utf8");
  const template = yaml.parse(fileContent);

  const context = {};

  for (const [param, config] of Object.entries(template.params || {})) {
    const value = userParams[param] ?? config.default;

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
  }
}
