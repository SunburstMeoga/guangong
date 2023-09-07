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
  popularized_addr: "0x8a1d58d461F763a79c3995a903ab8252fEB42066",
  nft_addr: "0xA94b8353a1c8Eb85676bC5Bd24EF39C552f6F427",

  map_addr: "0x6fbA8e1eac2683bD5b3000e272B5fCD305881203",
  market_addr: "0x1C7B7313264579716A8e59510506CEB58f1819c0",

  game_addr: "0xb426B6d400f776bf13D660f4A5E375CdCE0bD2aC",
  // A 0x52974912707C5cBB1C2d25C66307942901c1d2A3
  // B 0x40972d311BC09e2b57A47E81D854CF4905A57e24
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
