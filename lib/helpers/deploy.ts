import { SMART_CONTRACT_INTERACTION_ENDPOINT } from "../config";
import fetch from "node-fetch";

type SendTransactionParams = {
  repositoryOwner: string,
  repositoryName: string,
  branchName: string,
  developer: string,
  commitMessage: string,
  cid: string
}

export async function sendTransactionOnChain({
  repositoryOwner,
  repositoryName,
  branchName,
  developer,
  commitMessage,
  cid }: SendTransactionParams) {

  const response = await fetch(SMART_CONTRACT_INTERACTION_ENDPOINT + new URLSearchParams({
    repositoryOwner,
    repositoryName,
    branchName,
    developer,
    commitMessage,
    cid
  }));

  return response
}