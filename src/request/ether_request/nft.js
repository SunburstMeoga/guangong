import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let nftContractApi = {};
if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const NFT = new ethers.Contract(config.nft_addr, config.erc20_abi, provider);
  const NFTTRADE = new ethers.Contract(
    config.nft_addr,
    config.erc721_abi,
    signer
  );
  const NFTCONTRACT = new ethers.Contract(
    config.nft_addr,
    config.nft_abi,
    provider
  );

  nftContractApi = {
    nftsList: async function (nftTypes) {
      // const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
      const request = await NFT.getNFTs(nftTypes);
      console.log(request);
      return request;
    },
    //erc721授权
    apppprovalForAll: async function (contractAddress) {
      const tx = await NFTTRADE.setApprovalForAll(contractAddress, true);
      const result = await tx.wait();
      // cnsole.log(result, "发起erc721授权");
      return result;
    },
    //erc721是否授权
    isApprovedAll: async function (walletAddress, contractAddress) {
      const result = await NFTTRADE.isApprovedForAll(
        walletAddress,
        contractAddress
      );
      // const result = await tx.wait();
      return result;
    },

    //查询查看某个nft每天的设置产量
    nftDaySet: async function (nftType) {
      const result = await NFTCONTRACT.day_set(nftType);
      // const result = await tx.wait();
      return result;
    },
    //查看nft设置的总产量
    nftTotalSet: async function (nftType) {
      const result = await NFTCONTRACT.total_set(nftType);
      // const result = await tx.wait();
      return result;
    },
    // nftTotalSet: async function (nftType) {
    //   const result = await NFTTRADE.total_set(nftType);
    //   // const result = await tx.wait();
    //   return result;
    // },
    // 查看nft今天的挖出量 day_count
    nftDayCount: async function (nftType) {
      const result = await NFTCONTRACT.day_count(
        // nftType,
        Math.floor(new Date().getTime() / (1000 * 3600 * 24)),
        nftType
      );
      // const result = await tx.wait();
      console.log(Math.floor(new Date().getTime() / (1000 * 3600 * 24 * 1000)));
      return result;
    },
    //查看nft⼀共挖出量，设置总量减掉该值就是剩余的产量
    nftTotalCount: async function (nftType) {
      const result = await NFTCONTRACT.total_count(nftType);
      // const result = await tx.wait();
      return result;
    },
  };
}

export default nftContractApi;
