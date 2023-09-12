import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let marketContractApi = {};
if (window.ethereum && window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const MARKET = new ethers.Contract(
    config.market_addr,
    config.market_abi,
    provider
  );
  const MARKETTRADE = new ethers.Contract(
    config.market_addr,
    config.market_abi,
    signer
  );

  marketContractApi = {
    //用户撤销NFT挂单
    redemptionNFT: async function (nftId) {
      const tx = await MARKETTRADE.redemption(nftId);
      const result = tx.wait();
      return result;
    },

    //用户挂单自己的nft资产
    pendingOrder: async function (nftId, amount) {
      const tx = await MARKETTRADE.registration(
        nftId,
        ethers.parseEther(amount)
      );
      const result = await tx.wait();
      return result;
    },

    //wga兑换wgt
    exchange: async function exchange(exchangeAmount) {
      console.log(ethers.parseEther(exchangeAmount));
      const tx = await MARKETTRADE.exchange(ethers.parseEther(exchangeAmount));
      const result = await tx.wait();
      return result;
    },

    //用户购买二手市场NFT
    dealNFT: async function dealNFT(nftId, amount) {
      console.log(amount, ethers.parseEther(amount));
      const result = MARKETTRADE.deal(nftId, ethers.parseEther(amount));
      return result;
    },
  };
}

export default marketContractApi;
