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
  wgt_addr: "0xbD35645dB55388a34059a2dB30aCd63D1550a79a",
  wga_addr: "0xe66004588f33a562268B5977BF2a5316d442a5D5",
  popularized_addr: "0x1eB0FDf166F63135e26CC6F917Bf90c4cF7BBf91",
  nft_addr: "0x512631Fc2c8a3038795451d7B23c5E705782eE8a",

  map_addr: "0xa3A55EeF5B339F3a36830b56955A6f50E89dE22B",
  market_addr: "0x03812bCe4935Bd6e2B6fb6BD8647921B2f73aD9d",

  game_addr: "0xa891f52e8e43B7Ca1EA2e505acD05312fDa0CA4C",
  help_addr: "0xF018B4690E5627EC8230B575a4c59935437Bef81",

  // A 0x52974912707C5cBB1C2d25C66307942901c1d2A3
  // B 0x40972d311BC09e2b57A47E81D854CF4905A57e24
  api: "https://api.wgtone.live/",
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
