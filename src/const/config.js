import erc20_abi from './erc20.json'
import erc721_abi from './erc721.json'
import game_abi from './game.json'
import market_abi from './market.json'

const config = {
    erc20_abi: erc20_abi,
    erc721_abi: erc721_abi,
    game_abi: game_abi,
    market_abi:market_abi,
    usdt_addr: '0x1728Dae76dDCa4739Fe69e4B9633967f2e18B086',
    wgt_addr: '0x1c088A864fae8C82B1B2684274c906aBd89eeE83',
    nft_addr: '0x895aD9A2DEb2d493635130b481A8e4E246945FEA',
    game_addr: '0x52fF30c5286CFd2705AD3eED4C8AF6aECEE4de02',
    market_addr: '0x41b613D29E81c64cA5e21787E75938dB734eFB5F',

    /*
    usdt_addr: '0xc0cf857BdC00c6eF5544aD5E920edd9848CCb9C8',
    wgt_addr: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
    nft_addr: '0x2f0D258388b9d2945b66b111BF9159bFf39f7847',
    game_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3',
    market_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3',
    */
    api: 'http://47.115.211.205/api/',
    chainId: '0xb63f',
}

export { config }
