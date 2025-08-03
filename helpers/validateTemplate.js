import fs from "fs-extra";
import chalk from "chalk";

export function validateTemplate(templatePath, language, architecture) {
  if (!fs.existsSync(templatePath)) {
    console.log(
      chalk.redBright(
        `\n❌ Template directory "${templatePath}" does not exist.\nPlease check your selected architecture (${architecture}) and language (${language}).`
      )
    );
    return false;
  }
  return true;
}
