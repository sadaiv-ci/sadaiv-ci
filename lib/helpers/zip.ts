
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";
import path from "path";

export async function createZipFile() {
  const currentPath = path.resolve("./");
  const homedir = require("os").homedir();

  const timestamp = Date.now();
  
  const zipFilePath = path.join(homedir, `${timestamp}.zip`);
  await zip(`${currentPath}`, zipFilePath);

  return zipFilePath
}