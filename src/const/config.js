import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";
import popularized_abi from "./popularized.json";
import help_abi from "./help.json";
import nft_abi from "./nft.json";

const config = {
  chainId: "46655",
  rpc_url: "https://app.dexduel.com/rpc",
  chainName: "WGT MainNet",

  blockExplorerUrls: "",
  erc20_abi: erc20_abi,
  erc721_abi: erc721_abi,
  game_abi: game_abi,
  market_abi: market_abi,
  nft_abi: nft_abi,
  map_abi: map_abi,
  popularized_abi: popularized_abi,
  help_abi: help_abi,
  usdt_addr: "0xA24F46528936011E853213A22e761Eb5FF1De4f5",
  wga1_addr: "0xe66004588f33a562268B5977BF2a5316d442a5D5",
  wgt1_addr: "0xbD35645dB55388a34059a2dB30aCd63D1550a79a",
  wga_addr: "0x65786ff5C6B73AaaBCDa8F6D29D9cB6D716934DB",
  wgt_addr: "0xe4f8dA4FB9cfAFC98168bc47aC7939b022B46236",
  nft_addr: "0x46a33Dc2B367AF21ba652E3fFD83874eE55dC671",
  popularized_addr: "0x73c8e2d4e0E4584810ABe0f6b27f6E9210Ff44EE",
  game_addr: "0x815dC4D0dDB730fb65fAEc8FC0539C0C643F582A",
  map_addr: "0xC29f628C3fC83d6607881be9A4Aa299bD278474d",
  market_addr: "0x76ae895E93Fa5ee43055b31d2Cfa9003aa52d196",
  help_addr: "0x1635481e6f9e77665BD5fEc527d2c61d47B7eba7",
  api: "https://app.wgtone.live/api/",
  rpc: "https://rpc.pgchain.org",
  imageBaseURL: "https://app.wgtone.live/api/",
  // chainId: "0xb63f",
  // 1 设置NFTbaseURL
  // 2
  /*
    usdt_addr: '0x8a6dbe0328Dd98FCfA70a6d182A05B3cBBaB3b07',
    wgt_addr: '0xce6D840Cf15a89a231ef00aE1418E37ce43d5e1f',
    nft_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3',
    game_addr: '0x6DAE86606ef4Fa20eC317261bf8c7A2252840595',
    market_addr: '0x3C1014b8C5710780341111bfA0b5691B2daf38D1',
    chainId: '0x11623',
    */
};

export { config };
