import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
const WGTTRADE = new ethers.Contract(config.wgt_addr, config.erc20_abi, signer);

//erc20是否授权
export async function isAllowance(walletAddress, contractAddress) {
  const request = await WGT.allowance(walletAddress, contractAddress);
  return request;
}

//erc20授权
export async function approve(contractAddress) {
  const tx = await WGTTRADE.approve(contractAddress, ethers.MaxUint256);
  const result = await tx.wait();
  console.log(result);
  return result;
}
