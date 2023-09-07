import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const POPULARIZED = new ethers.Contract(
  config.popularized_addr,
  config.popularized_abi,
  provider
);

//查询当前地址相关的上下级地址
export async function relationshipAddress(walletAddress) {
  const result = await POPULARIZED.spreads(walletAddress);
  return result;
}
