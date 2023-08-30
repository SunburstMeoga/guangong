import erc20_abi from "./erc20.json";
import erc721_abi from "./erc721.json";
import game_abi from "./game.json";
import market_abi from "./market.json";
import map_abi from "./map.json";

const config = {
  erc20_abi: erc20_abi,
  erc721_abi: erc721_abi,
  game_abi: game_abi,
  market_abi: market_abi,
  map_abi: map_abi,
  usdt_addr: "0x1728Dae76dDCa4739Fe69e4B9633967f2e18B086",
  wgt_addr: "0x1c088A864fae8C82B1B2684274c906aBd89eeE83",
  nft_addr: "0x895aD9A2DEb2d493635130b481A8e4E246945FEA",
  game_addr: "0xcA3431db0C443b8b1c2A07968F0f6ECdf19fb0e4",
  market_addr: "0x41b613D29E81c64cA5e21787E75938dB734eFB5F",
  map_addr: "0x85901424CeE58A6579193B95DD029832b622162F",
  /*
    usdt_addr: '0xc0cf857BdC00c6eF5544aD5E920edd9848CCb9C8',
    wgt_addr: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
    nft_addr: '0x2f0D258388b9d2945b66b111BF9159bFf39f7847',
    game_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3',
    market_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3',
    */
  api: "http://47.115.211.205/api/",
  chainId: "0xb63f",
};

export { config };
