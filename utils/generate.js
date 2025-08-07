import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { generateFromYaml } from "./../parser/parserModule.js";

const CONFIG_PATH = path.resolve(process.cwd(), ".zgfconfig.json");

export async function generateComponents() {
  const [, , cmd, templateName, aliasKey] = process.argv;

  if (cmd !== "g") return;

  const config = await fs.readJSON(CONFIG_PATH).catch(() => {
    console.error("❌ Missing or invalid .zgfconfig.json");
    process.exit(1);
  });

  // Alias validation
  const aliasPath = config.alias?.[aliasKey];
  if (!aliasPath) {
    console.error(`❌ Alias "${aliasKey}" not found in .zgfconfig.json. \n
      Please define it in the "alias" section and use this as in example:\n
      zgf g <templateName> <aliasKey>\n`);
    process.exit(1);
  }

  const generatorPath = config["components.zgf"]?.path || "./";
  const templateFilePath = path.resolve(
    generatorPath,
    `${templateName}.zgf.yaml`
  );

  if (!(await fs.pathExists(templateFilePath))) {
    console.error(
      `❌ Template file "${templateName}.zgf.yaml" not found in ${generatorPath}`
    );
    process.exit(1);
  }

  // Parse the template file
  const templateContent = await fs.readFile(templateFilePath, "utf8");
  const yaml = await import("yaml");
  const template = yaml.parse(templateContent);

  // Interactive prompts for parameters
  const questions = Object.entries(template.params || {}).map(
    ([name, config]) => {
      const q = {
        name,
        message: config.placeholder || `Enter ${name}:`,
        default: config.default,
      };

      if (config.type === "enum") {
        q.type = "list";
        q.choices = config.values;
      } else if (config.type === "boolean") {
        q.type = "confirm";
      } else {
        q.type = "input";
        if (config.validator === "UpperCamelCase") {
          q.validate = (val) =>
            /^[A-Z][a-zA-Z0-9]*$/.test(val) || "Must be UpperCamelCase";
        }
      }

      return q;
    }
  );

  const answers = await inquirer.prompt(questions);

  const outputDir = path.resolve(aliasPath, answers.componentName);
  await generateFromYaml(templateFilePath, answers, outputDir);
}
