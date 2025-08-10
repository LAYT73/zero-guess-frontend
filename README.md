# zero-guess-frontend

![ZGF](https://github.com/LAYT73/zero-guess-frontend-docs/blob/main/static/img/zgf.gif)

[![npm](https://img.shields.io/npm/v/zero-guess-frontend.svg?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![downloads](https://img.shields.io/npm/dm/zero-guess-frontend?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![github issues](https://img.shields.io/github/issues/LAYT73/zero-guess-frontend?&style=for-the-badge&color=E0AF68)](https://github.com/LAYT73/zero-guess-frontend/issues)
[![github last commits](https://img.shields.io/github/last-commit/LAYT73/zero-guess-frontend?style=for-the-badge&color=AD8EE6)](https://www.npmjs.com/package/zero-guess-frontend)
[![license](https://img.shields.io/npm/l/@nestjs/core.svg?style=for-the-badge&logoColor=white)](https://github.com/LAYT73/zero-guess-frontend?tab=MIT-1-ov-file)

**zero-guess-frontend** is a CLI tool for fast and structured creation of React frontend projects. It minimizes boilerplate, follows best practices, and adapts to your needs.

[Русская версия / Russian version](./README.ru.md)

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
  - [Interactive Mode](#option-1-interactive-mode)
  - [CLI Options](#option-2-cli-options)
- [🆘 CLI Help](#-cli-help)
- [🛠️ Creating Custom Component Templates](#️-creating-custom-component-templates)
  - [1. Create config](#1-create-config)
  - [2. Create template](#2-create-template)
  - [3. .zgf.yaml structure](#3-zgfyaml-structure)
  - [4. Generate component](#4-generate-component)
- [🏗️ Project Structure](#️-project-structure)
- [❓ FAQ](#-faq)
- [📚 Docs & Support](#-docs--support)
- [🧑‍💻 Author](#-author)
- [💡 Contributing](#-contributing)

---

## 🚀 Features

- **Initialize a React project** with a choice of architecture: Feature-Sliced Design (FSD), Atomic Design, or Empty.
- **Language selection:** TypeScript (recommended) or JavaScript.
- **Automatic configuration of package.json, Vite, Git, .gitignore, and other files.**
- **Supports popular package managers:** npm, yarn, pnpm.
- **Add Routing templates:** you can add react-router-dom with templates for your init project.
- **Add State manager with templates:** you can also add Redux(Toolkit)/MobX with templates without any other actions.
- **Extensible templates:** easily add your own templates to the [`templates/`](templates/) folder.
- **Presets:** create your own custom presets using `zgf-preset` and apply them with `zgf --preset=name-of-your-preset`.
- **Generate custom components:** create a `.zgfconfig.json` file and a `{componentTemplate}.zgf.yaml` template. Then you can generate components into the alias folder using generate command: `zgf g componentTemplate @aliasToYourFolder`.
- **Planned:** Storybook, tests, UI Kit, linters, and more.
- **Documentation**: [Modern and useful documentation.](https://layt73.github.io/zero-guess-frontend-docs/)

---

## 📦 Installation

```bash
npm install -g zero-guess-frontend
```

---

## ⚡ Quick Start

### Option 1: Interactive mode

```bash
zgf
```

![Demo](https://github.com/LAYT73/zero-guess-frontend-docs/blob/main/static/img/setup.gif)

Follow the prompts:

- Project name
- Package manager
- Language (TypeScript / JavaScript)
- Architecture (FSD / Atomic / Empty)
- Routing (optionally with private route setup)
- State manager (RTK / Mobx / None)

### Option 2: CLI options

```bash
zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

| Option          | Alias | Type    | Description                             |
| --------------- | ----- | ------- | --------------------------------------- |
| `--name`        | `-n`  | string  | Project name                            |
| `--pm`          |       | string  | Package manager (`npm`, `yarn`, `pnpm`) |
| `--lang`        |       | string  | Language (`ts`, `js`)                   |
| `--arch`        |       | string  | Architecture (`fsd`, `atomic`, `empty`) |
| `--routing`     |       | boolean | Include `react-router-dom`              |
| `--private`     |       | boolean | Add public/private routing setup        |
| `--sm`          |       | string  | State manager (`redux`, `mobx`, `none`) |
| `--help`        |       | boolean | Show help                               |
| `--version`     |       | boolean | Show CLI version                        |
| `--preset`      |       | string  | Create project by preset                |
| `--preset-list` |       | boolean | Print list of presets                   |

---

## 🆘 CLI Help

Run the following command to see all available CLI options:

```bash
zgf --help
```

Or to check the installed version:

```bash
zgf --version
```

Example output:

```bash
Usage: zgf [options]

Options:
  --name                  Project name
  --pm                    Package manager         [choices: "npm", "yarn", "pnpm"]
  --lang                  Programming language    [choices: "ts", "js"]
  --arch                  Architecture type       [choices: "fsd", "atomic", "empty"]
  --routing               Include react-router-dom
  --private               Add private/public routes
  --sm                    State manager           [choices: "redux", "mobx", "none"]
  --help                  Show help
  --version               Show CLI version
  --preset                Create project by preset
  --preset-list           Print list of presets

Examples:
  zgf --name=my-app --pm=yarn --lang=ts --arch=fsd --routing --private --sm=redux
```

Create your own preset for faster initialization.

```bash
zgf-preset
```

Attention! For presets and other functions to work correctly, you must install CLI globally, as described earlier.

---

## 🛠️ Creating Custom Component Templates

[Example](https://github.com/LAYT73/zero-guess-frontend/tree/main/examples)

Zero Guess Frontend allows you to generate custom components using `{componentTemplate}.zgf.yaml` templates.

### 1. Create config

Add `.zgfconfig.json` in the project root:

```json
{
  "components.zgf": {
    "path": "./templates/"
  },
  "alias": {
    "@components": "./src/components/"
  }
}
```

- `components.zgf.path` — path to your `.zgf.yaml` templates.
- `alias` — shortcuts for output folders (multiple aliases allowed).

---

### 2. Create template

In the specified folder (e.g., `./templates/`), create a file:

```bash
{componentTemplate}.zgf.yaml
```

Example:

```bash
ui-component.zgf.yaml
```

---

### 3. `.zgf.yaml` structure

```yaml
params:
  componentName:
    placeholder: "Input component name"
    type: string
    default: "MyComponent"
    validator: "UpperCamelCase"

  componentStyleExtension:
    placeholder: "Select style extension"
    type: enum
    values:
      - css
      - scss
      - module.scss
      - module.css
    default: "css"

  addPublicApi:
    placeholder: "Add public Api?"
    type: boolean
    default: true

files:
  - name: "{{=componentName}}.tsx"
    content: |
      import "./{{=componentName}}.{{=componentStyleExtension}}";
      import React from "react";

      interface {{=componentName}}Props {
        children: React.ReactNode;
      }

      const {{=componentName}}: React.FC<{{=componentName}}Props> = ({ children }) => {
        return <div>{children}</div>;
      };

      export default {{=componentName}};

  - name: "{{=componentName}}.{{=componentStyleExtension}}"
    content: ""

  - name: "index.ts"
    condition: "{{=addPublicApi}}"
    content: |
      export { default as {{=componentName}} } from "./{{=componentName}}";
```

**Key elements:**

- `params` — parameters prompted from CLI.
- `files` — files generated using the parameters.
- `{{=paramName}}` — parameter substitution in file names/content.
- `condition` — create file only if the expression is true.

#### Hooks (optional)

You can run commands before/after generation and per created file via `hooks` in your `.zgf.yaml`.

Supported hooks:

- `preGenerate` — runs before any files are created.
- `afterEach` — runs after each file is created. Extra vars available: `fileName`, `filePath`.
- `postGenerate` — runs after all files are created. Extra var: `createdFiles` (JSON string array of objects `{ filename, fullPath }`).

Step formats:

- String — treated as a shell command.
- Object — `{ run, cwd?, shell?, continueOnError?, condition?, timeout?, env?, onError? }`

Context variables available in hooks:

- All your `params` (e.g., `{{=componentName}}`).
- `outputDir` — resolved generation target directory.
- `templateDir` — directory of the `.zgf.yaml` template.

Error context (available inside `onError` steps):

- `errorMessage` — stringified error message
- `exitCode` — process exit code (if any)
- `stdout` / `stderr` — captured streams when available

Example:

```yaml
hooks:
  preGenerate:
    - run: "echo Start scaffolding in {{=outputDir}}"

  afterEach:
    - run: "echo Created {{=fileName}} at {{=filePath}}"
    - run: "npx prettier --write {{=filePath}}"
      condition: "{{=addPublicApi}}" # optional condition
      timeout: 20000 # ms
      env: # templated env vars
        COMPONENT: "{{=componentName}}"
        FILE: "{{=fileName}}"
      onError:
        - run: "echo 'Prettier failed for {{=fileName}}: {{=errorMessage}}' >&2"
        - run: "node ./scripts/report-hook-failure.js --file='{{=filePath}}' --code='{{=exitCode}}'"
          cwd: "{{=templateDir}}"
      continueOnError: true

  postGenerate:
    - run: "npx eslint --fix ."
      cwd: "{{=outputDir}}" # working directory for the command
      timeout: 30000
      env:
        GEN_OUT_DIR: "{{=outputDir}}"
      onError: "echo 'ESLint failed with code {{=exitCode}}' >&2"
    - run: "node ./scripts/index-files.js --files='{{=createdFiles}}'"
      cwd: "{{=templateDir}}"
      continueOnError: true # do not fail generation if this step fails
```

Notes:

- Default `cwd` is `{{=outputDir}}`. The generator ensures it exists before `preGenerate` runs.
- `shell` defaults to `true` for cross-platform execution of string commands.
- If you use tools like `prettier`/`eslint`, ensure they are available in the target project (e.g., installed locally so `npx` can find them).
- `onError` runs when a step fails. If `continueOnError: true`, generator continues after `onError`; otherwise it throws after `onError` completes.
- `condition` controls whether a step runs. Expression is evaluated against the hook context.

---

### 4. Generate component

```bash
zgf g ui-component @components
```

- `ui-component` — template name without `.zgf.yaml`
- `@components` — alias from `.zgfconfig.json`

The command will generate the component in the target folder using your template.

This feature in development! If you have problems you can create [issue](https://github.com/LAYT73/zero-guess-frontend/issues)

---

## 🏗️ Project Structure

```bash
├── .github/             # GitHub Action for npm deployment
├── bin/                 # CLI entry point
├── config/              # Cofig for dependencies (react-router-dom, mobx etc.)
├── core/                # Core CLI logic
│   ├── setup/           # Core modules
│   └── scaffold/        # Generation modules (React etc.)
├── examples/            # Example .zgfconfig.json, demo component.zgf.yaml and /components folder
├── helpers/             # Helper functions
├── parser/              # Yaml parser for your custom components
├── presets/             # Presets for project init
├── templates/           # Project templates (React/FSD, Atomic, Empty, React-Router-Dom, State managers)
├── tests/               # Tests
├── utils/               # Utilities (fs, user requests)
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## ❓ FAQ

### ❓ What is the difference between FSD and Atomic architecture?

**FSD (Feature-Sliced Design)** focuses on scalability and domain-driven structure. It's ideal for large-scale projects with clear domain boundaries.
**Atomic Design** is UI-centric, breaking components down into atoms, molecules, organisms, etc., and is better suited for design systems and small-to-medium projects.

---

### ❓ Can I use this tool with an existing React project?

Not directly. `zero-guess-frontend` is optimized for initializing new projects from scratch.
However, you can extract templates and component generators for use in your existing project if needed.

---

### ❓ How do I add my own component templates?

1. Add a `.zgfconfig.json` in your project root.
2. Create `{your-template}.zgf.yaml` files in the configured `path`.
3. Use aliases to specify output folders.
4. Run:

   ```bash
   zgf g your-template @yourAlias
   ```

---

### ❓ What package managers are supported?

- `npm`
- `yarn`
- `pnpm`

You can select one interactively or specify it via `--pm` option.

---

### ❓ Can I use JavaScript instead of TypeScript?

Yes. Both `JavaScript` and `TypeScript` are supported. Use the `--lang=js` option when initializing the project.

---

### ❓ What if I don’t want routing or a state manager?

No problem! You can skip both during interactive setup or omit `--routing` and `--sm` flags in CLI.

---

### ❓ How do presets work?

You can save your preferred setup as a **preset**. Create it via:

```bash
zgf-preset
```

Then reuse with:

```bash
zgf --preset=my-preset
```

Presets save time for repeatable configurations.

---

### ❓ Where can I report bugs or suggest features?

Please open an issue on the [GitHub Issues Page](https://github.com/LAYT73/zero-guess-frontend/issues).

---

### ❓ Is it open source and under what license?

Yes, it's open-source under the [MIT License](https://github.com/LAYT73/zero-guess-frontend/blob/main/LICENSE).

---

## 📚 Docs & Support

- [DOCS](https://layt73.github.io/zero-guess-frontend-docs/)
- [GitHub Repository](https://github.com/LAYT73/zero-guess-frontend)
- [Npm package](https://www.npmjs.com/package/zero-guess-frontend)
- [Create an Issue](https://github.com/LAYT73/zero-guess-frontend/issues)

---

## 🧑‍💻 Author

**Nikita Shipilov** [GitHub](https://github.com/LAYT73)

License: MIT

---

## 💡 Contributing

PRs and suggestions are welcome!
