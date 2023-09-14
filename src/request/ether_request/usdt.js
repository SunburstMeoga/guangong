import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let usdtContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const USDT = new ethers.Contract(
    config.usdt_addr,
    config.erc20_abi,
    provider
  );
  const USDTTRADE = new ethers.Contract(
    config.usdt_addr,
    config.erc20_abi,
    signer
  );

  usdtContractApi = {
    //erc20是否授权
    isAllowance: async function (walletAddress, contractAddress) {
      const result = await USDT.allowance(walletAddress, contractAddress);
      return result;
    },

    //erc20授权
    approve: async function approve(contractAddress) {
      const result = await USDTTRADE.approve(
        contractAddress,
        ethers.MaxUint256
      );
      // const result = await tx.wait();
      console.log(result);
      return result;
    },

    //用户usdt余额
    usdtAssets: async function (walletAddress) {
      const result = await USDT.balanceOf(walletAddress);
      return result;
    },
  };
}

export default usdtContractApi;
