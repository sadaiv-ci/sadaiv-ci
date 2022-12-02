import path from "path";
import fs from "fs";
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";
import chalk from "chalk";
function makeStorageClient(token: string) {
  return new Web3Storage({ token });
}
import { exec } from "child_process";
import { getFilesFromPath } from "web3.storage";

export async function backup(tokens: string[]) {
  exec("git init", (error: any, stdout: any, stderr: any) => {
    if (error) {
      throw error;
    }
    console.log(stderr);
    console.log(stdout);
  });

  if(tokens.length !== 1) {
    console.log(chalk.red("Expected only 1 argument in backup command i.e. web3.storage access token"))
    process.exit(1);
  }
}
