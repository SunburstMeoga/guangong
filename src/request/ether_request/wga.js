import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let wgaContractApi = {};
if (window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const WGA = new ethers.Contract(config.wga_addr, config.erc20_abi, provider);
  const WGATRADE = new ethers.Contract(
    config.wga_addr,
    config.erc20_abi,
    signer
  );
  wgaContractApi = {
    //用户wga资产
    wgaAssets: async function (walletAddress) {
      const result = await WGA.balanceOf(walletAddress);
      return result;
    },

    //erc20是否授权
    isAllowance: async function (walletAddress, contractAddress) {
      const result = await WGA.allowance(walletAddress, contractAddress);
      return result;
    },

    //erc20授权
    approve: async function approve(contractAddress) {
      const result = await WGATRADE.approve(contractAddress, ethers.MaxUint256);
      // const result = await tx.wait();
      console.log(result);
      return result;
    },
  };
}

export default wgaContractApi;
