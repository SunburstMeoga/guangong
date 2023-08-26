import { ethers } from "ethers"
import { config } from '@/const/config'
import Web3 from 'web3'

const provider = new ethers.BrowserProvider(window.ethereum)
const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
const WGT =  new ethers.Contract(config.wgt_addr,config.erc20_abi, provider)
const WEB3 = new Web3(window.ethereum)


export async function nftsList(nftTypes) {
    // const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
    const request = await GAME.getNFTs(nftTypes)
    console.log(request)
    return request
}

//是否有授权
export async function isAllowance(walletAddress) {
    const request = await WGT.allowance(walletAddress, config.game_addr)
    console.log('是否已授权', request)
    return request
}

//获取账户余额
export function accountBalance(walletAddress) {
    WEB3.eth.getBalance(walletAddress).then(res => {
        console.log('余额',res)
        return res
    })
}

//授权
export async function approve(authorizationAmount) {
    const request = await WGT.approve(config.game_addr, authorizationAmount)
    console.log('是否已授权', request)
    return request
}

//购买nft
export function buy(nftType) {
    // console.log('购买操作')
    // let game = new WEB3.eth.Contract(config.game_addr, config.game_abi)
    // game.methods.buy(nftType).send()
    // .then(res => {
    //     console.log('购买',res)
    // })
    // .catch(err=> {
    //     console.log('购买',err)
    // })
    let wallet = new ethers.Wallet('0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB')
  let walletSigner = wallet.connect(provider)
   const tx = {
    from: '0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB',
    to: config.game_addr,
    value: ethers.utils.parseEther('23423234'),
    nonce: window.ethersProvider.getTransactionCount(
      send_account,
      "latest"
    ),
    gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    // gasPrice: gas_price,
  }

  walletSigner.sendTransaction(tx).then((transaction) => {
   
    console.dir(transaction)
    alert("Send finished!")
  })
    
    // return request
}