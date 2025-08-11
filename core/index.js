import chalk from "chalk";
import { createReactApp } from "./scaffold/react.js";
import updateNotifier from "update-notifier";
import { addPackages } from "./commands/add.js";
import { runScript } from "./commands/run.js";

import pkg from "../package.json" with { type: 'json' };

function printHelp() {
  console.log(`\nUsage:\n  zgf                    Create a React app (interactive)\n  zgf add [options] <pkg...>    Add dependencies via detected package manager\n  zgf run <script> [args...]    Run npm/yarn/pnpm/bun script\n\nOptions for add:\n  -D, --dev               Install as devDependencies\n`);
}

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

  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd) {
    // Default behavior remains: create app interactively
    await createReactApp();
    return;
  }

  if (cmd === "help" || cmd === "-h" || cmd === "--help") {
    printHelp();
    return;
  }

  if (cmd === "add") {
    const rest = args.slice(1);
    const dev = rest.includes("-D") || rest.includes("--dev");
    const pkgs = rest.filter((a) => a !== "-D" && a !== "--dev");
    await addPackages(pkgs, { dev });
    return;
  }

  if (cmd === "run") {
    const script = args[1];
    const scriptArgs = args.slice(2);
    await runScript(script, scriptArgs);
    return;
  }

  console.log(chalk.red(`Unknown command: ${cmd}`));
  printHelp();
}
