import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";
import popularized_abi from "./popularized.json";
import help_abi from "./help.json";

const config = {
  chainId: "46655",
  rpc_url: "http://47.115.211.205/rpc",
  chainName: "WGT MainNet",
  blockExplorerUrls: "",
  erc20_abi: erc20_abi,
  erc721_abi: erc721_abi,
  game_abi: game_abi,
  market_abi: market_abi,
  map_abi: map_abi,
  popularized_abi: popularized_abi,
  help_abi: help_abi,
  usdt_addr: "0xc0cf857BdC00c6eF5544aD5E920edd9848CCb9C8",
  wgt_addr: "0x2f0D258388b9d2945b66b111BF9159bFf39f7847",
  wga_addr: "0xce6D840Cf15a89a231ef00aE1418E37ce43d5e1f",
  popularized_addr: "0xf0338105141d964A93305c750428dE0a5899b75A",
  nft_addr: "0xEFDBe94717E7361ac8A6c46564afd789E481b1e3",

  map_addr: "0xbF795cCB82EE957417c55E6064ABEd00a3AD4B27",
  market_addr: "0x4De647B1F752D22B4087c7B0A850946d106aD1b5",

  game_addr: "0xe7c5F699d528716F4809029a4b518BEd6030BE21",
  help_addr: "0xCAdA86b40C973bA14293c4A37A894937261c593A",
  // A 0x52974912707C5cBB1C2d25C66307942901c1d2A3
  // B 0x40972d311BC09e2b57A47E81D854CF4905A57e24
  api: "http://47.115.211.205/api/",
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
