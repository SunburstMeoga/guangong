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
export async function buy(nftType) {
  const tx = await GAMETRADE.buy(nftType);
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
export async function setOff(nftId, expeditionOrder) {
  const tx = await GAMETRADE.create(nftId, expeditionOrder, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);
  return result;
}

//使用华佗道具卡
export async function huatuoProps(walletAddress, nftIndex) {
  const result = await GAMETRADE.huaTuo(walletAddress, nftIndex, 59);
  return result;
}

//使用张角道具卡
export async function zhangjiaoProps(nftId) {
  const result = await GAMETRADE.zhangJiao(nftId);
  return result;
}

//使用诸葛亮道具卡
export async function zhugeliangProps(walletAddress, nftId) {
  const result = await GAMETRADE.zhuGeLiang(walletAddress, nftId);
  return result;
}

//使用孟获道具卡
export async function menghuoProps(walletAddress, nftId) {
  const result = await GAMETRADE.mengHuo(walletAddress, nftId);
  return result;
}

//使用孟获道具卡
export async function yuanshuProps(walletAddress, nftId) {
  const result = await GAMETRADE.yuanShu(walletAddress, nftId);
  return result;
}

//用户领取奖金池收益
export async function receivePoolEarnings(receiveAmount) {
  const result = await GAMETRADE.income3(receiveAmount);
  const tx = await tx.wait();
  return result;
}

//用户领取财神卡收益
export async function wealthEarnings(cardIndex) {
  const result = await GAMETRADE.income2(cardIndex);
  const tx = await tx.wait();
  return result;
}

//用户领取出征卡收益
export async function campaignEarnings(cardIndex) {
  const result = await GAMETRADE.income1(cardIndex);
  const tx = await tx.wait();
  return result;
}

//用户购买财神卡
export async function buyFortuneCard(nftType) {
  const tx = await GAMETRADE.buy2(nftType);
  const result = await tx.wait();
  console.log(result);
  return result;
}
