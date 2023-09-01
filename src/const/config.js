import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";
import popularized_abi from "./popularized.json";

const config = {
  erc20_abi: erc20_abi,
  erc721_abi: erc721_abi,
  game_abi: game_abi,
  market_abi: market_abi,
  map_abi: map_abi,
  popularized_abi: popularized_abi,
  usdt_addr: "0xc0cf857BdC00c6eF5544aD5E920edd9848CCb9C8",
  wgt_addr: "0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8",
  wga_addr: "0x4477ab4e190c88B70C29Fe73ACdA53943D6Ef46d",
  popularized_addr: "0xd3E1F69D5660a121CB0d2e67B9d19E752337cd26",
  map_addr: "0x54606F6e7BBCAA7c26a4b45574084b088A8a54a2",

  nft_addr: "0xf09E5b3dA649f8b4f102BC689527650360da9Cdb",
  game_addr: "0xa30Fdf5D8498e5F5BfcCA0FaF0b3fC58d057D97a",
  market_addr: "0x97E3A8Bee9c05641Bd6c7E57D77821c5c2704Dde",

  api: "http://47.115.211.205/api/",
  chainId: "0xb63f",
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
