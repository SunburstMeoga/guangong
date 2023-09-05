import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const POPULARIZED = new ethers.Contract(
  config.popularized_addr,
  config.popularized_abi,
  provider
);

//上级地址
export async function preAddress(address) {
  const result = await POPULARIZED.spreads(address);
  return result;
}
