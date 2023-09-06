import { ethers } from "ethers";
import { config } from "@/const/config";
import Web3 from "web3";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider);
const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider);
const NFT = new ethers.Contract(config.nft_addr, config.erc20_abi, provider);
const MAP = new ethers.Contract(config.map_addr, config.map_abi, provider);
const POPULARIZED = new ethers.Contract(
  config.popularized_addr,
  config.popularized_abi,
  provider
);

const MARKET = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  provider
);
const MAPTRADE = new ethers.Contract(config.map_addr, config.map_abi, signer);
const MARKETTRADE = new ethers.Contract(
  config.market_addr,
  config.market_abi,
  signer
);
const GAMETRADE = new ethers.Contract(
  config.game_addr,
  config.game_abi,
  signer
);
const WGTTRADE = new ethers.Contract(config.wgt_addr, config.erc20_abi, signer);
const NFTTRADE = new ethers.Contract(
  config.nft_addr,
  config.erc721_abi,
  signer
);

const WEB3 = new Web3(window.ethereum);

//获取账户余额
export async function accountBalance(walletAddress) {
  const res = await WEB3.eth.getBalance(walletAddress);
  return res;
}
