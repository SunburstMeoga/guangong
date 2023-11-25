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
  usdt_addr: "0x6188A058Df2cd350Be5f19DF046c34A578cB58F6",
  wga1_addr: "0x005A89549f5504443Ba1242259b4149e4F21ceA7",
  wgt1_addr: "0x7c2dDeFFd1717820A934d1288C0bE59247437632",
  wga_addr: "0x167bf46afBE82A052C94F5CCfC96aA4a069Ad6eD",
  wgt_addr: "0x7B98de4BC49Fbe11f65DDcC2D91928506c6B4916",
  nft_addr: "0x4a80819D27Afc0E4f221d993099F4c2dc3f9dCE7",
  popularized_addr: "0x3B18edA1fe1E9c343557db2b1aCd30E70006f6c4",
  game_addr: "0xFc269820472BeeDe0B0AF15469319F49b1c1bAD4",
  map_addr: "0xe61218D6c05337a50677EB1Fc691e26C1496F9dA",
  market_addr: "0x91D5188f56F0bdd91c5915012745BcB967bD4a2E",
  help_addr: "0xa5e3BFE07f8E0a3f206B155A242c7d4eD9DA5114",
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
