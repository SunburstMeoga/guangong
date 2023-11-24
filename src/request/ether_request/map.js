import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const MAP = new ethers.Contract(config.map_addr, config.map_abi, provider);
const MAPTRADE = new ethers.Contract(config.map_addr, config.map_abi, signer);

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

//上传地图到合约
export async function updataMap(locationID) {
  const tx = await MAPTRADE.update(locationID);
  const result = await tx.wait();
  console.log(result);
  return result;
}

//申请认证关公地图
export async function markMap(mapIndex) {
  const tx = await MAPTRADE.mark(mapIndex);
  const result = await tx.wait();
  console.log(result);

  return result;
}

//撤销已认证的关公地图
export async function cancelMarkMap(mapIndex) {
  const tx = await MAPTRADE.cancelMark(mapIndex);
  const result = await tx.wait();
  console.log(result);
  return result;
}

//被邀请玩家确认关公地图数据
export async function confirmMapInfo(uploaderAddress, mapIndex) {
  const tx = await MAPTRADE.confirm(uploaderAddress, mapIndex);
  const result = await tx.wait();
  console.log(result);
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
