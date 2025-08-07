import chalk from "chalk";
import { askUser } from "../../utils/requests.js";
import { projectScaffolding } from "./../setup/projectScaffolding.js";
import { configureProject } from "./../setup/configureProject.js";
import { setupFeatures } from "./../setup/setupFeatures.js";
import { finalizeProject } from "./../setup/finalizeProject.js";

export async function createReactApp() {
  try {
    const config = await askUser();

    const { templatePath, targetPath } = await projectScaffolding(config);
    await setupFeatures(config, targetPath);
    await configureProject(config, targetPath);
    await finalizeProject(config, targetPath);

    console.log(
      chalk.greenBright(
        `\n✅ Project "${config.appName}" created successfully!\n`
      )
    );
    console.log(chalk.cyan(`👉 Next steps:`));
    console.log(chalk.yellow(`  cd ${config.appName}`));
    console.log(chalk.yellow(`  ${config.packageManager} run dev\n`));
  } catch (error) {
    console.error(chalk.redBright(`\n❌ Error: ${error.message}\n`));
    process.exit(1);
  }
}
