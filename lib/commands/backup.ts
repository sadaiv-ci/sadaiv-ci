import fs from "fs";
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";
import chalk from "chalk";
import { exec } from "child_process";
import { getFilesFromPath } from "web3.storage";
import {createZipFile} from '../helpers/zip'

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

  // Creating zip file.
  console.log(chalk.grey("Creating zip file..."))
  const zipFilePath = await createZipFile();
  console.log(chalk.green(`Created zip file at: ${zipFilePath}`))

  console.log(chalk.grey("Uploading to Filecoin network..."))
  const files = await getFilesFromPath(zipFilePath);
  
  // Creating storage client.
  try{
    const client = new Web3Storage({ token: tokens[0] })
    const cid = await client.put(files);
    console.log(chalk.green(`Finished uploading on Filecoin network, CID: ${cid}`))
  } catch (e: any) {
    console.log(chalk.red(e.toString()));
    process.exit(1);
  }

  console.log(chalk.green("Project successfully backed up!"))
}
