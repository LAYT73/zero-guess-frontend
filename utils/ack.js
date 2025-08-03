import inquirer from "inquirer";

export async function askUser() {
  const answers = await inquirer.prompt([
    // TODO: Implement these options for first version
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
      name: "architecture",
      message: "Choose folder structure:",
      choices: [
        { name: "Feature-Sliced Design (FSD)", value: "fsd" },
        { name: "Atomic Design", value: "atomic" },
        { name: "Empty (flat)", value: "empty" },
      ],
      default: "fsd",
    },
    // TODO: Implement these options later
    // {
    //   type: "confirm",
    //   name: "routing",
    //   message: "Setup routing (react-router-dom)?",
    //   default: true,
    // },
    // {
    //   type: "confirm",
    //   name: "privateRouting",
    //   message: "Include public/private routes?",
    //   default: true,
    //   when: (answers) => answers.routing === true,
    // },
    // {
    //   type: "list",
    //   name: "stateManager",
    //   message: "Choose state manager:",
    //   choices: [
    //     { name: "Redux Toolkit", value: "redux" },
    //     { name: "MobX", value: "mobx" },
    //     { name: "None", value: "none" },
    //   ],
    //   default: "redux",
    // },
    // {
    //   type: "confirm",
    //   name: "i18n",
    //   message: "Add localization (i18n)?",
    //   default: true,
    // },
    // {
    //   type: "checkbox",
    //   name: "testTypes",
    //   message: "Which types of tests to include?",
    //   choices: [
    //     { name: "Unit tests", value: "unit" },
    //     { name: "Integration tests", value: "integration" },
    //     { name: "E2E tests", value: "e2e" },
    //   ],
    // },
    // {
    //   type: "confirm",
    //   name: "storybook",
    //   message: "Include Storybook?",
    //   default: false,
    // },
    // {
    //   type: "list",
    //   name: "uiKit",
    //   message: "Choose UI Kit:",
    //   choices: [
    //     { name: "None", value: "none" },
    //     { name: "shadcn/ui", value: "shadcn" },
    //     { name: "Chakra UI", value: "chakra" },
    //     { name: "Mantine", value: "mantine" },
    //   ],
    //   default: "none",
    // },
    // {
    //   type: "list",
    //   name: "apiClient",
    //   message: "Choose API client:",
    //   choices: [
    //     { name: "None", value: "none" },
    //     { name: "Fetch (native)", value: "fetch" },
    //     { name: "Axios", value: "axios" },
    //   ],
    //   default: "axios",
    // },
    // {
    //   type: "list",
    //   name: "cssSolution",
    //   message: "Choose CSS/styling method:",
    //   choices: [
    //     { name: "CSS / SCSS", value: "scss" },
    //     { name: "CSS Modules", value: "css-modules" },
    //     { name: "Styled Components", value: "styled-components" },
    //   ],
    //   default: "scss",
    // },
    // {
    //   type: "confirm",
    //   name: "includeEnv",
    //   message: "Include .env and .env.local files?",
    //   default: true,
    // },
    // {
    //   type: "list",
    //   name: "transpiler",
    //   message: "Choose transpiler:",
    //   choices: [
    //     { name: "Babel", value: "babel" },
    //     { name: "SWC", value: "swc" },
    //   ],
    //   default: "babel",
    // },
    // {
    //   type: "checkbox",
    //   name: "linters",
    //   message: "Include linters and code formatters?",
    //   choices: [
    //     { name: "ESLint", value: "eslint" },
    //     { name: "Prettier", value: "prettier" },
    //   ],
    // },
    // {
    //   type: "confirm",
    //   name: "husky",
    //   message: "Setup Husky + lint-staged for pre-commit?",
    //   default: true,
    // },
    // {
    //   type: "confirm",
    //   name: "codeStyleFile",
    //   message: "Generate CODE_STYLE.md with conventions?",
    //   default: true,
    // },
  ]);

  return answers;
}
