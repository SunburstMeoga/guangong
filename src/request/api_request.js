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

//查看用户标注的地图邀请链接
export async function mapLink(address) {
  const result = await axios.get(`${config.api}map/${address}`);
  return result;
}
