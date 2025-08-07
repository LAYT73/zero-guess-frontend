# zero-guess-frontend

[![npm](https://img.shields.io/npm/v/zero-guess-frontend.svg?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![downloads](https://img.shields.io/npm/dm/zero-guess-frontend?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/zero-guess-frontend)
[![github issues](https://img.shields.io/github/issues/LAYT73/zero-guess-frontend?&style=for-the-badge&color=E0AF68)](https://github.com/LAYT73/zero-guess-frontend/issues)
[![github last commits](https://img.shields.io/github/last-commit/LAYT73/zero-guess-frontend?style=for-the-badge&color=AD8EE6)](https://www.npmjs.com/package/zero-guess-frontend)
[![license](https://img.shields.io/npm/l/@nestjs/core.svg?style=for-the-badge&logoColor=white)](https://github.com/LAYT73/zero-guess-frontend?tab=MIT-1-ov-file)

**zero-guess-frontend** is a CLI tool for fast and structured creation of React frontend projects. It minimizes boilerplate, follows best practices, and adapts to your needs.

---

## 🚀 Features

- **Initialize a React project** with a choice of architecture: Feature-Sliced Design (FSD), Atomic Design, or Empty.
- **Language selection:** TypeScript (recommended) or JavaScript.
- **Automatic configuration of package.json, Vite, Git, .gitignore, and other files.**
- **Supports popular package managers:** npm, yarn, pnpm.
- **Add Routing templates:** you can add react-router-dom with templates for your init project.
- **Add State manager with templates:** you can also add Redux(Toolkit)/MobX with templates without any other actions.
- **Extensible templates:** easily add your own templates to the [`templates/`](templates/) folder.
- **Presets:** create your own custom presets by using `zgf-preset` and then use `zgf --preset=name-of-your-preset`.
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

---

## 🏗️ Project Structure

```bash
├── .github/             # GitHub Action for npm deployment
├── bin/                 # CLI entry point
├── core/                 # Core CLI logic
│   ├── setup/           # Core modules
│   └── scaffold/        # Generation modules (React etc.)
├── helpers/             # Helper functions
├── templates/           # Project templates (React/FSD, Atomic, Empty, React-Router-Dom, State managers and your custom)
├── utils/               # Utilities (fs, user requests)
├── tests/               # Tests
├── presets/            # Presets for project init
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## 🛠️ Template Extension

Add your template to the [`templates/`](templates/) folder to make it available in the CLI.

Update [`utils/requests.js`](utils/requests.js) to register your new template.

---

## 📝 Scripts

- `dev` — development mode
- `build` — build the project
- `preview` — preview the built app

---

## ❓ FAQ

**Q:** How to add my own template?
**A:** Create a new folder in [`templates/`](templates/), add the option in [`utils/requests.js`](utils/requests.js), and define the structure.

**Q:** Can I use JavaScript only?
**A:** Yes, select JS during initialization — all TS files and configs will be removed automatically.

**Q:** How to add tests, Storybook, etc.?
**A:** These options will be available in future versions. Stay tuned!

---

## 📚 Docs & Support

- [DOCS](https://layt73.github.io/zero-guess-frontend-docs/)
- [GitHub Repository](https://github.com/LAYT73/zero-guess-frontend)
- [Npm package](https://www.npmjs.com/package/zero-guess-frontend)
- [Create an Issue](https://github.com/LAYT73/zero-guess-frontend/issues)

---

## 🧑‍💻 Author

**Nikita Shipilov**
License: ISC

---

## 💡 Contributing

PRs and suggestions are welcome!
