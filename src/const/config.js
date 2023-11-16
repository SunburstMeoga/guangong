import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";
import popularized_abi from "./popularized.json";
import help_abi from "./help.json";

const config = {
  chainId: "46655",
  rpc_url: "https://app.dexduel.com/rpc",
  chainName: "WGT MainNet",

  blockExplorerUrls: "",
  erc20_abi: erc20_abi,
  erc721_abi: erc721_abi,
  game_abi: game_abi,
  market_abi: market_abi,
  map_abi: map_abi,
  popularized_abi: popularized_abi,
  help_abi: help_abi,
  usdt_addr: "0x6B0448015C8F1aDB403588154Fc8347dA9192276",
  wga1_addr: "0x17EF7488Dc2aDe6F14d242c7B4F668e8C3241b4b",
  wgt1_addr: "0xbcb4fb71fa36D96944d3096dF54Bdce70971f6e5",
  wga_addr: "0x61432Be9E767807568F75274b54aC36eD67Aaa1f",
  wgt_addr: "0xc468C89B02F5EF4f811D84403d8D368e9cFdE0Dd",
  nft_addr: "0x5761AcfFAAa0ac2f356fD02F1653afdF100E1e5f",
  popularized_addr: "0x32f79f90F50aF66c0aCe1c7c541994Fc850d689f",
  game_addr: "0xc6306cA53561eFe6B5aae67c6B6F95154c89BD97",
  map_addr: "0xCBFB7456432204178B88fF9A03233fc869A6f613",
  market_addr: "0xb5E3e2efA2217f89D8DD259C4D5b4FC7AD2F25C7",
  help_addr: "0x725867e18c85812CaB9Cc41984b88AB9f3b975C4",
  api: "https://app.dexduel.com/api/",
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
