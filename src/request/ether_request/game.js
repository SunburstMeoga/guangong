import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let gameContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider);
  const GAMETRADE = new ethers.Contract(
    config.game_addr,
    config.game_abi,
    signer
  );

  gameContractApi = {
    //用户收益查询
    userInfo: async function (address) {
      const result = GAME.UserInfo(address);
      return result;
    },
    //用户贡献值等级
    userLevel: async function (address) {
      const result = await GAME.getStar(address);
      return result;
    },
    //购买nft
    buy: async function (nftType, isWGT) {
      const tx = await GAMETRADE.buy(nftType, isWGT);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //合成nft
    synthesisNFT: async function (nftsType, targetType) {
      const tx = await GAMETRADE.upgradeRole(nftsType, targetType, {
        gasLimit: 9999999,
      });
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //出征
    setOff: async function (nftId, expeditionOrder) {
      const tx = await GAMETRADE.create(nftId, expeditionOrder, {
        gasLimit: 9999999,
      });
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //使用华佗道具卡
    huatuoProps: async function (walletAddress, nftIndex) {
      const result = await GAMETRADE.huaTuo(walletAddress, nftIndex, 59);
      return result;
    },
    //使用张角道具卡
    zhangjiaoProps: async function (nftId) {
      const result = await GAMETRADE.zhangJiao(nftId);
      return result;
    },
    //使用诸葛亮道具卡
    zhugeliangProps: async function (walletAddress, nftId) {
      const result = await GAMETRADE.zhuGeLiang(walletAddress, nftId);
      return result;
    },
    //使用孟获道具卡
    menghuoProps: async function (walletAddress, nftId) {
      const result = await GAMETRADE.mengHuo(walletAddress, nftId);
      return result;
    },
    //使用孟获道具卡
    yuanshuProps: async function (walletAddress, nftId) {
      const result = await GAMETRADE.yuanShu(walletAddress, nftId);
      return result;
    },
    //用户领取奖金池收益
    receivePoolEarnings: async function (receiveAmount) {
      const result = await GAMETRADE.income3(receiveAmount);
      const tx = await tx.wait();
      return result;
    },
    //用户领取财神卡收益
    wealthEarnings: async function (cardIndex) {
      const result = await GAMETRADE.income2(cardIndex);
      const tx = await tx.wait();
      return result;
    },
    //用户领取出征卡收益
    campaignEarnings: async function campaignEarnings(cardIndex) {
      const result = await GAMETRADE.income1(cardIndex);
      const tx = await tx.wait();
      return result;
    },
    //用户购买财神卡
    buyFortuneCard: async function buyFortuneCard(nftType) {
      const tx = await GAMETRADE.buy2(nftType);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
  };
}

export default gameContractApi;
