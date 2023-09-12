import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let popularContractApi = {};
if (window.ethereum || window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const POPULARIZED = new ethers.Contract(
    config.popularized_addr,
    config.popularized_abi,
    provider
  );

  popularContractApi = {
    //查询当前地址相关的上下级地址
    relationshipAddress: async function (walletAddress) {
      const result = await POPULARIZED.spreads(walletAddress);
      return result;
    },
  };
}

export default popularContractApi;
