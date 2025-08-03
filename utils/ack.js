import inquirer from "inquirer";

export async function askUser() {
  const answers = await inquirer.prompt([
    {
      name: "appName",
      message: "Enter project name:",
      default: "frontend-app",
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
      name: "framework",
      message: "Choose frontend framework:",
      choices: ["react"],
      default: "react",
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
      name: "i18n",
      message: "Add localization (i18n)?",
      default: false,
    },
    {
      type: "list",
      name: "apiClient",
      message: "Choose API client:",
      choices: [
        { name: "None", value: "none" },
        { name: "Fetch (native)", value: "fetch" },
        { name: "Axios", value: "axios" },
      ],
      default: "none",
    },
    {
      type: "list",
      name: "stateManager",
      message: "Choose state manager:",
      choices: [
        { name: "None", value: "none" },
        { name: "Redux Toolkit", value: "redux" },
        { name: "MobX", value: "mobx" },
      ],
      default: "none",
    },
  ]);

  return answers;
}
