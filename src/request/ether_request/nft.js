import { ethers } from "ethers";
import { config } from "@/const/config";

let provider = {};
let signer = {};
let nftContractApi = {};
if (window.ethereum && window.ethereum.selectedAddress) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const NFT = new ethers.Contract(config.nft_addr, config.erc20_abi, provider);
  const NFTTRADE = new ethers.Contract(
    config.nft_addr,
    config.erc721_abi,
    signer
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
  };
}

export default nftContractApi;
