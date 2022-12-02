import { backup, defaultCommand } from "./commands";
import chalk from "chalk"

const commands = {
  "backup": "Helps in backing up repository on Filecoin Network, use like this: npx sadaiv backup <web3.storage_token>"
}

export async function handler(command: string, args: string[]) {
  switch (command) {
    case "backup": {
      await backup(args);
      break;
    }
    default: {
      await defaultCommand(command, args);
      break;
    }
  }
}

export function help() {
  console.log(chalk.white("Available Commands:"))
  Object.keys(commands).forEach((item: string, index: number) => {
    const value = Object.values(commands)[index]
    console.log(chalk.white(`- ${item}: `), chalk.grey(value))
  })
}
