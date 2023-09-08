import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const WGA = new ethers.Contract(config.wga_addr, config.erc20_abi, provider);
const WGATRADE = new ethers.Contract(config.wga_addr, config.erc20_abi, signer);

//用户wga资产
export async function wgaAssets(walletAddress) {
  const result = await WGA.balanceOf(walletAddress);
  return result;
}

//erc20是否授权
export async function isAllowance(walletAddress, contractAddress) {
  const result = await WGA.allowance(walletAddress, contractAddress);
  return result;
}

//erc20授权
export async function approve(contractAddress) {
  const result = await WGATRADE.approve(contractAddress, ethers.MaxUint256);
  // const result = await tx.wait();
  console.log(result);
  return result;
}
