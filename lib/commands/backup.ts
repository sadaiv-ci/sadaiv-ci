import fs from "fs";
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";
import chalk from "chalk";
import { exec } from "child_process";
import { getFilesFromPath } from "web3.storage";
import { createZipFile } from '../helpers/zip'
import { sendTransactionOnChain } from "../helpers/deploy";

export async function backup(args: string[]) {
  exec("git init", (error: any, stdout: any, stderr: any) => {
    if (error) {
      throw error;
    }
    console.log(stderr);
    console.log(stdout);
  });

  if (args.length < 6) {
    console.log(chalk.red(`Expected 7 arguments in backup command but recieved ${args.length}`))
    process.exit(1);
  }

  // Creating zip file.
  console.log(chalk.grey("Creating zip file..."))
  const zipFilePath = await createZipFile();
  console.log(chalk.green(`Created zip file at: ${zipFilePath}`))

  console.log(chalk.grey("Uploading to Filecoin network..."))
  const files = await getFilesFromPath(zipFilePath);
  try {
    // Putting the files on Web3Storage.
    const client = new Web3Storage({ token: args[0] })
    const cid = await client.put(files);
    console.log(chalk.green(`Finished uploading on Filecoin network, CID: ${cid}`))

    // Sending transcation for blockchain to index.
    console.log(chalk.grey("Sending transaction to blockchain..."))
    const response = await sendTransactionOnChain({
      repositoryOwner: args[1],
      repositoryName: args[2],
      branchName: args[3],
      developer: args[4],
      commitMessage: args[5],
      cid: cid
    })
    if(response.status !== 200) {
      throw Error("Failed to process transaction for the Smart Contract");
    }

    console.log(chalk.green(`Transaction confirmed, added to the blockchain`))
  } catch (e: any) {
    console.log(chalk.red(e.toString()));
    process.exit(1);
  }

  console.log(chalk.green("Project backed up successfully!"))
}
