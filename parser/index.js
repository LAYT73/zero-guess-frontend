// index.js
import { generateFromYaml } from "./parserModule.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import fs from "fs-extra";
import yaml from "yaml";

const rawArgv = yargs(hideBin(process.argv))
  .option("template", {
    type: "string",
    describe: "Path to YAML template",
    demandOption: true,
  })
  .option("out", {
    type: "string",
    describe: "Output directory",
    default: "./generated",
  })
  .help();

const preParsed = rawArgv.parseSync();

const templateRaw = await fs.readFile(preParsed.template, "utf-8");
const template = yaml.parse(templateRaw);
const paramDefs = template.params || {};

for (const [key, def] of Object.entries(paramDefs)) {
  rawArgv.option(key, {
    type: def.type === "enum" ? "string" : def.type,
    choices: def.values,
    default: def.default,
    describe: def.placeholder || key,
  });
}

const argv = rawArgv.parseSync();

await generateFromYaml(preParsed.template, argv, argv.out);
