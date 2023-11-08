import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let wgaContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const WGA = new ethers.Contract(config.wga_addr, config.erc20_abi, provider);
  const PREWGA = new ethers.Contract(
    config.wga1_addr,
    config.erc20_abi,
    provider
  );

  const WGATRADE = new ethers.Contract(
    config.wga_addr,
    config.erc20_abi,
    signer
  );
  const PREWGATRADE = new ethers.Contract(
    config.wga1_addr,
    config.erc20_abi,
    signer
  );
  wgaContractApi = {
    //用户wga资产
    wgaAssets: async function (walletAddress) {
      const result = await WGA.balanceOf(walletAddress);
      return result;
    },
    //用户老版本的wga资产
    preWGABalance: async function (walletAddress) {
      const result = await PREWGA.balanceOf(walletAddress);
      return result;
    },

    //erc20是否授权
    isAllowance: async function (walletAddress, contractAddress) {
      const result = await WGA.allowance(walletAddress, contractAddress);
      return result;
    },
    //erc20是否授权
    isAllowanceGame: async function (walletAddress, contractAddress) {
      const result = await PREWGA.allowance(walletAddress, contractAddress);
      return result;
    },

    //erc20授权
    approve: async function approve(contractAddress) {
      const result = await WGATRADE.approve(contractAddress, ethers.MaxUint256);
      // const result = await tx.wait();
      console.log(result);
      return result;
    },

    //erc20授权
    approveGame: async function approve(contractAddress) {
      const result = await PREWGATRADE.approve(
        contractAddress,
        ethers.MaxUint256
      );
      // const result = await tx.wait();
      console.log(result);
      return result;
    },
  };
}

export default wgaContractApi;
