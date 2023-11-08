import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let popularContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const POPULARIZED = new ethers.Contract(
    config.popularized_addr,
    config.popularized_abi,
    provider
  );
  const POPULARIZEDTRADE = new ethers.Contract(
    config.popularized_addr,
    config.popularized_abi,
    signer
  );

  popularContractApi = {
    //查询当前地址相关的上下级地址
    relationshipAddress: async function (walletAddress) {
      const result = await POPULARIZED.spreads(walletAddress);
      return result;
    },
    //下级地址签名
    addressSign: async function (preAddress) {
      const tx = await POPULARIZEDTRADE.popularize1(preAddress);
      const result = await tx.wait();
      return result;
    },
  };
}

export default popularContractApi;
