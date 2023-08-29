import { ethers } from "ethers";
import { config } from "@/const/config";
import Web3 from "web3";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider);
const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
const GAMETRADE = new ethers.Contract(
  config.game_addr,
  config.game_abi,
  signer
);
const WGTTRADE = new ethers.Contract(config.wgt_addr, config.erc20_abi, signer);

const WEB3 = new Web3(window.ethereum);

export async function nftsList(nftTypes) {
  // const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
  const request = await GAME.getNFTs(nftTypes);
  console.log(request);
  return request;
}

//是否有授权
export async function isAllowance(walletAddress) {
  const request = await WGT.allowance(walletAddress, config.game_addr);
  console.log("是否已授权", request);
  return request;
}

//获取账户余额
export async function accountBalance(walletAddress) {
  const res = await WEB3.eth.getBalance(walletAddress);
  return res;
}

//授权
export async function approve() {
  const tx = await WGTTRADE.approve(config.game_addr, ethers.MaxUint256);
  const result = await tx.wait();
  console.log(result);
  return result;
}

//购买nft
export async function buy(nftId) {
  console.log("购买的nftid", nftId);
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

//上级地址
export async function preAddress(address) {
  const result = await GAME.spreads(address);
  return result;
}
