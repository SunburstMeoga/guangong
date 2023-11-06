import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";
import popularized_abi from "./popularized.json";
import help_abi from "./help.json";

const config = {
  chainId: "0x19c2e0",
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
  usdt_addr: "0xAd6902607fb95559efb8F1349e265254d53e525D",
  wgt_addr: "0x365CB7Fea69efb321d1aCF6f03D3F10dAD71395A",
  wga_addr: "0x6DAE86606ef4Fa20eC317261bf8c7A2252840595",
  popularized_addr: "0x3C1014b8C5710780341111bfA0b5691B2daf38D1",
  nft_addr: "0xC89e619Bf93262446B507aa4aAC8981bC8B70Cc1",
  map_addr: "0xa2aa267EDeF688326193953a8c7aF6e747173421",
  market_addr: "0xA76905eaCaf8eD4981bB64A20b512298b910453F",
  game_addr: "0xfBD05538374fdE3520376297c4000125B87Bd558",
  help_addr: "0xd4B0D23be6CBC2A6E8De6421Cf1A7c321A6E2fda",

  // A 0x52974912707C5cBB1C2d25C66307942901c1d2A3
  // B 0x40972d311BC09e2b57A47E81D854CF4905A57e24
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
