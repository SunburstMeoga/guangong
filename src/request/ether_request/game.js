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
    //查询出征卡收益领取方式 wgt或者wgt-a
    campaignIncomeMethod: async function () {
      const result = await GAME.wgt_A();
      return result;
    },
    wgtWealthIncomeMethod: async function () {
      const result = await GAME.wgt_B();
      return result;
    },
    wgaWealthIncomeMethod: async function () {
      const result = await GAME.wga_B();
      return result;
    },
    //获取商品价格usdt所需的wgt
    WGTFromUSDT: async function (usdt) {
      const result = await GAME.getWGT(usdt);
      return result;
    },
    //获取商品价格usdt所需的wga
    WGAFromUSDT: async function (usdt) {
      const result = await GAME.getWGA(usdt);
      return result;
    },
    //获取商品价格usdt所需的wgt
    WGTFromUSDT: async function (usdt) {
      const result = await GAME.getWGT(usdt);
      return result;
    },
    //用户收益查询
    userInfo: async function (address) {
      const result = await GAME.UserInfo(address);
      return result;
    },
    //获取用户的星级
    userStar: async function (walletAddress) {
      const result = await GAME.getStar(walletAddress);
      return result;
    },
    //用户贡献值等级
    userLevel: async function (address) {
      const result = await GAME.getStar(address);
      return result;
    },
    childPerformance: async function (walletAddress) {
      const result = await GAME.getChildSum(walletAddress);
      return result;
    },
    //购买nft
    buy: async function (nftType) {
      const tx = await GAMETRADE.buy(nftType, {
        gasLimit: 7999999,
      });
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //合成nft
    synthesisNFT: async function (nftsType, targetType) {
      console.log("升级参数-----", nftsType, targetType);
      const tx = await GAMETRADE.upgradeRole(nftsType, targetType);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //出征
    setOff: async function (nftId, expeditionOrder) {
      const tx = await GAMETRADE.create(nftId, expeditionOrder);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //再次出征
    userCampaignAgain: async function (cardIndex, expeditionOrder) {
      const tx = await GAMETRADE.nextGame(cardIndex, expeditionOrder);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //使用华佗道具卡
    huatuoProps: async function (walletAddress, nftIndex, tokenId) {
      const result = await GAMETRADE.huaTuo(walletAddress, nftIndex, tokenId);
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
    receivePoolEarnings: async function (walletAddress) {
      console.log("walletAddress", walletAddress);
      const tx = await GAMETRADE.income3(walletAddress);

      const result = await tx.wait();
      return result;
    },
    //用户领取财神卡收益
    wealthEarnings: async function (walletAddress, cardIndex, isWga) {
      console.log(walletAddress, cardIndex, isWga);
      const tx = await GAMETRADE.income2(walletAddress, cardIndex, isWga, {
        gasLimit: 7999999,
      });
      const result = await tx.wait();
      return result;
    },
    //用户领取出征卡收益
    campaignEarnings: async function (
      walletAddress,
      cardIndex,
      cardJsIndex,
      isWga
    ) {
      const tx = await GAMETRADE.income1(
        walletAddress,
        cardIndex,
        cardJsIndex,
        isWga
      );
      const result = await tx.wait();
      return result;
    },
    //用户购买财神卡
    buyFortuneCard: async function (nftType, isWgt) {
      const tx = await GAMETRADE.buy2(nftType, isWgt);
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    //旧版本wgt更换新wga
    wgt2wga: async function (exchangeAmount) {
      const tx = await GAMETRADE.wgt2wga(ethers.parseEther(exchangeAmount));
      const result = await tx.wait();
      console.log(result);
      return result;

      // console.log(ethers.parseEther(exchangeAmount));
      // const result = await GAME.wgt2wga(ethers.parseEther(exchangeAmount));
      // return result;
    },
    // 旧版本wga更换新wga
    wga2wga: async function (exchangeAmount) {
      const tx = await GAMETRADE.wga2wga(ethers.parseEther(exchangeAmount));
      const result = await tx.wait();
      console.log(result);
      return result;
    },
    cardInfo: async function (walletAddress, cardIndex) {
      const result = await GAME.GetCard(walletAddress, cardIndex);
      return result;
    },
  };
}

export default gameContractApi;
