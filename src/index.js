import inquirer from "inquirer";
import chalk from "chalk";
import { createReactApp } from "./scaffold/react.js";

const VERSION = "0.0.1";

export async function main() {
  console.log(
    chalk.greenBright(`\n⚡ Zero Guess Frontend CLI\n Version: ${VERSION}\n`)
  );

  await createReactApp();
}
