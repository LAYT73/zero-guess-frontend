import inquirer from "inquirer";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { loadPresetList } from "../helpers/preset/loadPresetList.js";
import { loadPresetConfig } from "../helpers/preset/loadPresetConfig.js";
import chalk from "chalk";
import { generateComponents } from "./generate.js";

const allowedArgs = [
  "--name",
  "-n",
  "--pm",
  "--packageManager",
  "--lang",
  "--language",
  "--arch",
  "--architecture",
  "--routing",
  "--private",
  "--privateRouting",
  "--sm",
  "--preset",
  "--preset-list",
  "--help",
];

function validateArgs(rawArgs) {
  const isValidArgs = rawArgs.every((arg) => {
    if (allowedArgs.includes(arg)) return true;
    if (
      arg.startsWith("--") &&
      allowedArgs.some((flag) => flag.startsWith(arg.split("=")[0]))
    )
      return true;
    if (!arg.startsWith("-")) return true;
    return false;
  });

  if (!isValidArgs) {
    console.log(
      chalk.red("❌ Unknown command or option detected.\n") +
        "Use " +
        chalk.cyan("zgf --help") +
        " to see available options."
    );
    process.exit(1);
  }
}

function handlePresetList() {
  const list = loadPresetList();
  if (list.length === 0) {
    console.log("No presets found.");
  } else {
    console.log(chalk.blue("\nAvailable presets:"));
    list.forEach((p) => console.log(`- ${p}`));
  }
  process.exit(0);
}

function handlePreset(presetName) {
  const config = loadPresetConfig(presetName);
  return {
    appName: config.appName,
    packageManager: config.packageManager,
    language: config.language,
    architecture: config.architecture,
    routing: config.routing,
    privateRouting: config.privateRouting,
    stateManager: config.stateManager,
  };
}

function validateRequiredCliArgs(argv) {
  const { name, pm, lang, arch } = argv;
  const provided = [name, pm, lang, arch].filter(Boolean).length;

  if (provided > 0 && provided < 4) {
    console.log(
      "\n❗ You have not provided all required CLI parameters.\n" +
        "You must specify at least: --name, --pm, --lang, --arch\n" +
        "Example: zgf --name=my-app --pm=yarn --lang=ts --arch=fsd\n" +
        "Or you can provide all parameters interactively using <zgf> without any flags.\n" +
        "For help use <zgf --help>."
    );
    process.exit(1);
  }

  if (name && pm && lang && arch) {
    return {
      appName: name,
      packageManager: pm,
      language: lang,
      architecture: arch,
      routing: argv.routing,
      privateRouting: argv.privateRouting,
      stateManager: argv.sm || "none",
    };
  }

  return null;
}

async function promptUser(isPreset = false) {
  return inquirer.prompt([
    {
      name: "appName",
      message: isPreset ? "Enter preset name:" : "Enter project name:",
      default: isPreset ? "default-name" : "frontend-app",
    },
    {
      type: "list",
      name: "packageManager",
      message: "Select package manager:",
      choices: ["npm", "yarn", "pnpm"],
      default: "npm",
    },
    {
      type: "list",
      name: "language",
      message: "Choose language:",
      choices: [
        { name: "TypeScript (recommended)", value: "ts" },
        { name: "JavaScript", value: "js" },
      ],
      default: "ts",
    },
    {
      type: "list",
      name: "architecture",
      message: "Choose folder structure:",
      choices: [
        { name: "Feature-Sliced Design (FSD)", value: "fsd" },
        { name: "Atomic Design", value: "atomic" },
        { name: "Empty (flat)", value: "empty" },
      ],
      default: "fsd",
    },
    {
      type: "confirm",
      name: "routing",
      message: "Setup routing (react-router-dom)?",
      default: false,
    },
    {
      type: "confirm",
      name: "privateRouting",
      message: "Include public/private routes?",
      default: true,
      when: (answers) => answers.routing === true,
    },
    {
      type: "list",
      name: "stateManager",
      message: "Choose state manager:",
      choices: [
        { name: "Redux Toolkit", value: "redux" },
        { name: "MobX", value: "mobx" },
        { name: "None", value: "none" },
      ],
      default: "none",
    },
  ]);
}

const argv = yargs(hideBin(process.argv))
  .usage("Usage: zgf [options]")
  .example(
    "zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux",
    "Generate a frontend project with the given settings"
  )
  .option("name", {
    alias: "n",
    type: "string",
    description: "Project name",
  })
  .option("pm", {
    alias: "packageManager",
    type: "string",
    choices: ["npm", "yarn", "pnpm"],
  })
  .option("lang", {
    alias: "language",
    choices: ["ts", "js"],
    type: "string",
  })
  .option("arch", {
    alias: "architecture",
    choices: ["fsd", "atomic", "empty"],
    type: "string",
  })
  .option("routing", {
    type: "boolean",
    description: "Include react-router",
  })
  .option("private", {
    alias: "privateRouting",
    type: "boolean",
    description: "Include private routing",
  })
  .option("sm", {
    type: "string",
    description: "Select state manager",
    choices: ["redux", "mobx", "none"],
  })
  .option("preset", {
    type: "string",
    description: "Use preset by name",
  })
  .option("preset-list", {
    type: "boolean",
    description: "List available presets",
  })
  .help().argv;

export async function askUser(isPreset = false) {
  validateArgs(process.argv.slice(2));

  if (process.argv.includes("g")) {
    await generateComponents();
    process.exit(1);
  }

  if (argv["preset-list"]) {
    handlePresetList();
  }

  if (argv.preset) {
    return handlePreset(argv.preset);
  }

  const cliConfig = validateRequiredCliArgs(argv);
  if (cliConfig) {
    return cliConfig;
  }

  // fallback to interactive prompt
  const answers = await promptUser(isPreset);
  return answers;
}
