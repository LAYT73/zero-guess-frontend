# zero-guess-frontend

**zero-guess-frontend** is a CLI tool for fast and structured creation of React frontend projects. It minimizes boilerplate, follows best practices, and adapts to your needs.

---

## 🚀 Features

- **Initialize a React project** with a choice of architecture: Feature-Sliced Design (FSD), Atomic Design, or Empty.
- **Language selection:** TypeScript (recommended) or JavaScript.
- **Automatic configuration of package.json, Vite, Git, .gitignore, and other files.**
- **Supports popular package managers:** npm, yarn, pnpm.
- **Add Routing templates:** you can add react-router-dom with templates for your init project.
- **Extensible templates:** easily add your own templates to the [`templates/`](templates/) folder.
- **Planned:** state managers, Storybook, tests, UI Kit, linters, and more.

---

## 📦 Installation

```bash
npm install -g zero-guess-frontend
```

---

## ⚡ Quick Start

1. Run the CLI:

   ```bash
   zgf
   ```

2. Follow the interactive prompts:

   - Project name
   - Package manager
   - Language (TypeScript/JavaScript)
   - Architecture (FSD/Atomic/Empty)
   - Routing (With Private Router template)

3. After generation:

   ```bash
   cd <project_name>
   npm run dev
   # or use your chosen package manager
   ```

---

## 🏗️ Project Structure

```bash
├── bin/                 # CLI entry point
├── src/                 # Core CLI logic
│   └── scaffold/        # Generation modules (React etc.)
├── helpers/             # Helper functions
├── templates/           # Project templates (React/FSD, Atomic, Empty)
├── utils/               # Utilities
├── package.json
└── README.md
```

---

## 🛠️ Template Extension

Add your template to the [`templates/`](templates/) folder to make it available in the CLI.

---

## 📝 Scripts

- `dev` — development mode
- `build` — build the project
- `preview` — preview the built app

---

## ❓ FAQ

**Q:** How to add my own template?
**A:** Create a new folder in [`templates/`](templates/), add the option in [`utils/ack.js`](utils/ack.js), and define the structure.

**Q:** Can I use JavaScript only?
**A:** Yes, select JS during initialization — all TS files and configs will be removed automatically.

**Q:** How to add routing, tests, Storybook, etc.?
**A:** These options will be available in future versions. Stay tuned!

---

## 📚 Docs & Support

- [GitHub Repository](https://github.com/LAYT73/zero-guess-frontend)
- [Create an Issue](https://github.com/LAYT73/zero-guess-frontend/issues)
- [Npm package](https://www.npmjs.com/package/zero-guess-frontend)

---

## 🧑‍💻 Author

Nikita Shipilov
License: ISC

---

## 💡 Contributing

PRs and suggestions are welcome!
