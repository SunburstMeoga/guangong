import { ethers } from "ethers";
import { config } from "@/const/config";
import Web3 from "web3";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider);
const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
const NFT = new ethers.Contract(config.nft_addr, config.erc20_abi, provider);
const MAP = new ethers.Contract(config.map_addr, config.map_abi, provider);
const POPULARIZED = new ethers.Contract(
  config.popularized_addr,
  config.popularized_abi,
  provider
);

const MARKET = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  provider
);
const MAPTRADE = new ethers.Contract(config.map_addr, config.map_abi, signer);
const MARKETTRADE = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  signer
);
const GAMETRADE = new ethers.Contract(
  config.game_addr,
  config.game_abi,
  signer
);
const WGTTRADE = new ethers.Contract(config.wgt_addr, config.erc20_abi, signer);
const NFTTRADE = new ethers.Contract(
  config.nft_addr,
  config.erc721_abi,
  signer
);

const WEB3 = new Web3(window.ethereum);

export async function nftsList(nftTypes) {
  // const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
  const request = await NFT.getNFTs(nftTypes);
  console.log(request);
  return request;
}

//erc20是否授权
export async function isAllowance(walletAddress, contractAddress) {
  const request = await WGT.allowance(walletAddress, contractAddress);
  return request;
}

//获取账户余额
export async function accountBalance(walletAddress) {
  const res = await WEB3.eth.getBalance(walletAddress);
  return res;
}

//erc20授权
export async function approve(contractAddress) {
  const tx = await WGTTRADE.approve(contractAddress, ethers.MaxUint256);
  const result = await tx.wait();
  console.log(result);
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

//上级地址
export async function preAddress(address) {
  const result = await POPULARIZED.spreads(address);
  return result;
}

//上传地图到合约
export async function updataMap(locationID) {
  const tx = await MAPTRADE.update(locationID, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);

  return result;
}

//查看用户已标注的关公地图列表
export async function userMarkedMap(address) {
  const result = await MAP.Infos(address);
  return result;
}

//查看用户上传的关公地图详情
export async function userMarkedDetials(address, mapIndex) {
  const result = await MAP.GetMap(address, mapIndex);
  return result;
}

//申请认证关公地图
export async function markMap(mapIndex) {
  const tx = await MAPTRADE.mark(mapIndex, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);

  return result;
}

//撤销已认证的关公地图
export async function cancelMarkMap(mapIndex) {
  const tx = await MAPTRADE.cancelMark(mapIndex, {
    gasLimit: 9999999,
  });
  const result = await tx.wait();
  console.log(result);

  return result;
}

//被邀请玩家确认关公地图数据
export async function confirmMapInfo(uploaderAddress, mapIndex) {
  const tx = await MAPTRADE.confirm(uploaderAddress, mapIndex, {
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

//用户贡献值等级
export async function userLevel(address) {
  const result = await GAME.getStar(address);
  return result;
}

//用户祭拜关公地图
export async function worship(uploadAddress, mapIndex, amount) {
  const tx = await MAPTRADE.worship(
    uploadAddress,
    mapIndex,
    ethers.parseEther(amount)
  );
  const result = await tx.wait();
  return result;
}

//用户收益查询
export async function userInfo(address) {
  const result = GAME.UserInfo(address);
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

//erc721授权
export async function apppprovalForAll(contractAddress) {
  const tx = await NFTTRADE.setApprovalForAll(contractAddress, true);
  const result = await tx.wait();
  return result;
}

//erc721是否授权
export async function isApprovedAll(walletAddress, contractAddress) {
  const result = await NFTTRADE.isApprovedForAll(
    walletAddress,
    contractAddress
  );
  // const result = await tx.wait();
  return result;
}
