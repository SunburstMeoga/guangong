import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider);
const GAMETRADE = new ethers.Contract(
  config.game_addr,
  config.game_abi,
  signer
);

//用户收益查询
export async function userInfo(address) {
  const result = GAME.UserInfo(address);
  return result;
}
//用户贡献值等级
export async function userLevel(address) {
  const result = await GAME.getStar(address);
  return result;
}

//购买nft
export async function buy(nftId) {
  const tx = await GAMETRADE.buy(nftId);
  const result = await tx.wait();
  console.log(result);
  return result;
}

//合成nft
export async function synthesisNFT(nftsId, targetId) {
  const tx = await GAMETRADE.upgradeRole(nftsId, targetId, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);
  return result;
}

//出征
export async function setOff(nftId, tokenId) {
  const tx = await GAMETRADE.create(nftId, tokenId, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);
  return result;
}

//用户购买财神卡
export async function buyFortuneCard(id) {
  const tx = await GAMETRADE.buy2(id);
  const result = await tx.wait();
  console.log(result);
  return result;
}
