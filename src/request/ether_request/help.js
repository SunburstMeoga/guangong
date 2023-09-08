import { ethers } from "ethers";
import { config } from "@/const/config";

const provider = new ethers.BrowserProvider(window.ethereum);
const HELP = new ethers.Contract(config.help_addr, config.help_abi, provider);

//财神卡领取收益信息
export async function wealthEarningsInfor(address, nftIndex) {
  const result = HELP.GetIncome2(address, nftIndex);
  return result;
}
//总奖金池收益信息
export async function poolEarningsInfor(address) {
  const result = await HELP.GetIncome3(address);
  return result;
}
