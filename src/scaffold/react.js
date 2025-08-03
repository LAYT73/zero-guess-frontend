import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import { askUser } from "./../../utils/ack.js";

// Получение __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createReactApp() {
  const answers = await askUser();
  const {
    appName,
    packageManager,
    language,
    architecture,
    i18n,
    apiClient,
    stateManager,
  } = answers;

  const targetPath = path.join(process.cwd(), appName);
  const templateBasePath = path.join(__dirname, "../../templates");

  // Строим путь к шаблону, например:
  // templates/react/vite-fsd-ts
  // Можно сделать структуру шаблонов по шаблону: templates/{framework}/vite-{architecture}-{language}
  const templatePath = path.join(
    templateBasePath,
    "react",
    `vite-${architecture}-${language}`
  );

  console.log(chalk.cyan(`\n📁 Creating project "${appName}" from template`));

  // Копируем шаблон
  await fs.copy(templatePath, targetPath);

  // TODO: добавить базовую настройку i18n, API client, state manager

  // Инициализируем git
  await execa("git", ["init"], { cwd: targetPath, stdio: "inherit" });

  // Устанавливаем зависимости нужным пакетным менеджером
  await execa(packageManager, ["install"], {
    cwd: targetPath,
    stdio: "inherit",
  });

  console.log(
    chalk.greenBright(`\n✅ Project "${appName}" created successfully!`)
  );
}
