import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const MARKET = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  provider
);
const MARKETTRADE = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  signer
);

//用户撤销NFT挂单
export async function redemptionNFT(nftId) {
  const tx = await MARKETTRADE.redemption(nftId);
  const result = tx.wait();
  return result;
}

//用户挂单自己的nft资产
export async function pendingOrder(nftId, amount) {
  const tx = await MARKETTRADE.registration(nftId, ethers.parseEther(amount));
  const result = await tx.wait();
  return result;
}

//wga兑换wgt
export async function exchange() {
  const tx = await MARKETTRADE.exchange(ethers.parseEther(wga));
  const result = await tx.wait();
  return result;
}
