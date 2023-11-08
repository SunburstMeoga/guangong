import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let wgtContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
  const PREWGT = new ethers.Contract(
    config.wgt1_addr,
    config.erc20_abi,
    provider
  );
  const WGTTRADE = new ethers.Contract(
    config.wgt_addr,
    config.erc20_abi,
    signer
  );
  const PREWGTTRADE = new ethers.Contract(
    config.wgt1_addr,
    config.erc20_abi,
    signer
  );

  wgtContractApi = {
    // erc20是否授权
    isAllowance: async function (walletAddress, contractAddress) {
      const result = await WGT.allowance(walletAddress, contractAddress);
      return result;
    },
    isAllowanceGame: async function (walletAddress, contractAddress) {
      const result = await PREWGT.allowance(walletAddress, contractAddress);
      console.log("result", result);
      return result;
    },
    //用户wgt资产
    wgtAssets: async function (walletAddress) {
      const result = await WGT.balanceOf(walletAddress);
      return result;
    },
    //用户老版本的wga资产
    preWGTBalance: async function (walletAddress) {
      const result = await PREWGT.balanceOf(walletAddress);
      return result;
    },

    // erc20授权
    approve: async function (contractAddress) {
      const tx = await WGTTRADE.approve(contractAddress, ethers.MaxUint256);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    // erc20授权
    approveGame: async function (contractAddress) {
      const tx = await PREWGTTRADE.approve(contractAddress, ethers.MaxUint256);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
  };

  console.log(wgtContractApi, "wgtContractApi");
}

export default wgtContractApi;
