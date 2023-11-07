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
  nft_addr: "0x7842d9A95A5c0c2D4114fFB434E9FA950Ba365C3",
  popularized_addr: "0x045BeE56cD93531029F9afb21D3aBeA64F626a43",
  wgt1_addr: "0x8a6dbe0328Dd98FCfA70a6d182A05B3cBBaB3b07",
  wga1_addr: "0xEFDBe94717E7361ac8A6c46564afd789E481b1e3",
  game_addr: "0x46D77b3a054f1e0f5C0D598BD55C61E8C7C5Ed14",
  map_addr: "0xa2aa267EDeF688326193953a8c7aF6e747173421",
  market_addr: "0x632Bd647ae0fA067Dde4223648DC6A0Bc7ab066a",
  help_addr: "0xB146d1aF31F171b053F2940f420a2B767F17949E",
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
