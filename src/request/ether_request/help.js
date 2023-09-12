import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let helpContractApi = {};

if (window.ethereum || window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  const HELP = new ethers.Contract(config.help_addr, config.help_abi, provider);

  helpContractApi = {
    //财神卡领取收益信息
    wealthEarningsInfor: async function (address, nftIndex) {
      const result = HELP.GetIncome2(address, nftIndex);
      return result;
    },
    //总奖金池收益信息
    poolEarningsInfor: async function poolEarningsInfor(address) {
      const result = await HELP.GetIncome3(address);
      return result;
    },
    //获取商品价格usdt所需的wgt
    WGTFromUSDT: async function (usdt) {
      const result = await HELP.getWGT(usdt);
      return result;
    },
    //获取商品价格usdt所需的wga
    WGAFromUSDT: async function (usdt) {
      const result = await HELP.getWGA(usdt);
      return result;
    },
  };
}

export default helpContractApi;
