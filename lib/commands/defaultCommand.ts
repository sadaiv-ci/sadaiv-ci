const chalk = require('chalk');
export async function defaultCommand(command: string, args: any) {
  console.log(chalk.red(`Failed to execute '${command}: No such command exists.`))
  process.exit(1);
}
