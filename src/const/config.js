import erc20_abi from './erc20.json'
import erc721_abi from './erc721.json'
import game_abi from './game.json'

const config = {
    erc20_abi: erc20_abi,
    erc721_abi: erc721_abi,
    game_abi: game_abi,
    usdt_addr: '0xc0cf857BdC00c6eF5544aD5E920edd9848CCb9C8', 
    wgt_addr: '0x5E822d2c5b16F1a4Be09839a397E636DF1136Fc8',
    nft_addr: '0x2f0D258388b9d2945b66b111BF9159bFf39f7847', //所有的nft都在这里
    game_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3', //官方发售、玩法
    market_addr: '0xEFDBe94717E7361ac8A6c46564afd789E481b1e3', //二级市场
    api: 'http://47.115.211.205/api/',
    chainId: '0xb63f',
}

export { config }
