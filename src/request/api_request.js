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
  const result = await axios.get(`${config.api}market/group`);
  return result;
}
