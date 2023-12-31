import { config } from "@/const/config";
import axios from "axios";

//热卖商品列表
export async function hotList() {
  const result = await axios.get(`${config.api}nft/hot`);
  return result;
}

//用户nft资产
export async function ownerList(address) {
  const result = await axios.get(`${config.api}nft/owner/${address}`);
  return result;
}

//用户上传关公地图并获取ID
export async function getLocationID(address, obj) {
  const result = await axios.post(`${config.api}map/${address}`, obj);
  return result;
}

//查看用户标注的地图
export async function userMarkedMapList(address) {
  const result = await axios.get(`${config.api}map/${address}`);
  return result;
}

//查看用户上传的地图详情
export async function userMarkedDetials(mapID) {
  const result = await axios.get(`${config.api}map/id/${mapID}`);
  return result;
}

//关公祭地图列表
export async function worshipList() {
  const result = await axios.get(`${config.api}map/worship`);
  return result;
}

//用户正在挂单售卖的nft列表
export async function pendingOrderList(address) {
  const result = await axios.get(`${config.api}market/owner/${address}`);
  return result;
}

//二手市场列表
export async function marketList() {
  const result = await axios.get(`${config.api}market/list`);
  return result;
}

//nft挂单数据到接口
export async function pendingOrderApi(address, obj) {
  const result = await axios.post(`${config.api}market/${address}`, obj);
  return result;
}

//nft撤销挂单数据到接口
export async function cancelOrderApi(nftId) {
  const result = await axios.put(`${config.api}market/${nftId}/2`);
  return result;
}

//用户购买二手nft上传数据到接口
export async function buyMarketNFTApi(nftId) {
  const result = await axios.put(`${config.api}market/${nftId}/1`);
  return result;
}

//用户查看nft详情
export async function nftDetails(nftId) {
  const result = await axios.get(`${config.api}market/nft/${nftId}`);
  return result;
}

//用户查看某个出征令牌的数量
export async function outboundTokens(address, tokenType) {
  const result = await axios.get(
    `${config.api}nft/owner/${address}/${tokenType}`
  );
  return result;
}

//查看用户总收益
export async function userIncome(walletAddress) {
  const result = await axios.get(`${config.api}income/${walletAddress}`);
  return result;
}

//查看某个收益类型的收益列表
export async function earningList(walletAddress, earningType) {
  const result = await axios.get(
    `${config.api}income/${walletAddress}/${earningType}`
  );
  return result;
}

//查找用户某个类型nft的个数
export async function acountFromNFTType(walletAddress, nftType) {
  const reslut = await axios.get(
    `${config.api}nft/owner/${walletAddress}/${nftType}`
  );
  return reslut;
}

//推荐关系邀请人待绑定的被邀请人列表
export async function toBeBound(walletAddress) {
  const result = await axios.get(
    `${config.api}friends/childs/${walletAddress}/0`
  );
  return result;
}

// 推荐关系邀请人已绑定的被邀请人列表
export async function boundList(walletAddress) {
  const result = await axios.get(
    `${config.api}friends/childs/${walletAddress}/1`
  );
  return result;
}
