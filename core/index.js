import chalk from "chalk";
import { createReactApp } from "./scaffold/react.js";
import updateNotifier from "update-notifier";

import pkg from "../package.json" with { type: 'json' };

export async function main() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 1000 * 60 * 60 * 12, // 12 hours
      shouldNotifyInNpmScript: true,
      distTag: "latest",
    });

    if (notifier.update) {
      console.log(
        chalk.yellow(
          `🧩 Update available: ${chalk.bold(pkg.version)} → ${chalk.bold(
            notifier.update.latest
          )}`
        )
      );
      console.log(
        chalk.dim(`💡 Run: ${chalk.green(`npm install -g ${pkg.name}`)} to update!`)
      );
      console.log("");
    }

  console.log(chalk.greenBright(`\n⚡ Zero Guess Frontend CLI for React ⚡\n`));

  await createReactApp();
}
