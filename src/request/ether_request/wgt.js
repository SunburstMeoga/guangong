import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let wgtContractApi = {};
if (window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
  const WGTTRADE = new ethers.Contract(
    config.wgt_addr,
    config.erc20_abi,
    signer
  );

  wgtContractApi = {
    // erc20是否授权
    isAllowance: async function (walletAddress, contractAddress) {
      const request = await WGT.allowance(walletAddress, contractAddress);
      return request;
    },
    //用户wgt资产
    wgtAssets: async function (walletAddress) {
      const result = await WGT.balanceOf(walletAddress);
      return result;
    },
    // erc20授权
    approve: async function (contractAddress) {
      const tx = await WGTTRADE.approve(contractAddress, ethers.MaxUint256);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
  };
}

export default wgtContractApi;
