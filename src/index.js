import chalk from "chalk";
import { createReactApp } from "./scaffold/react.js";

export async function main() {
  console.log(chalk.greenBright(`\n⚡ Zero Guess Frontend CLI for React ⚡\n`));

  await createReactApp();
}
