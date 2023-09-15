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
  usdt_addr: "0xA24F46528936011E853213A22e761Eb5FF1De4f5",
  wgt_addr: "0x18adcf54b0959d1d8E5CcB6f9f6df1197D1b0eC3",
  wga_addr: "0xe66004588f33a562268B5977BF2a5316d442a5D5",
  popularized_addr: "0xaA96B499801Dabc538FF281d885Ae0E8bbc0A700",
  nft_addr: "0x762F119158a44f4FcE603C54Fc1Bd73C8cD182e7",

  map_addr: "0x2b4974789BfE1CD367B8C5b353361243227Bf108",
  market_addr: "0xb0eE6A561fcef516b4B8E7BCBf0743F3fbAF1B61",

  game_addr: "0xAffF3eEE252C410E7467Ffb1cd80B121cF7c118D",
  help_addr: "0xE31f52540197A8092c9022D6306C1534D0d5aF01",

  // A 0x52974912707C5cBB1C2d25C66307942901c1d2A3
  // B 0x40972d311BC09e2b57A47E81D854CF4905A57e24
  api: "https://api.wgtone.live/",
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
