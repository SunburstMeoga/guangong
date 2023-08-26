import { ethers } from "ethers"
import { config } from '@/const/config'
import Web3 from 'web3'

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider)
const WGT = new ethers.Contract(config.wgt_addr, config.erc20_abi, provider)
const GAMETRADE = new ethers.Contract(config.game_addr, config.game_abi, signer)
const WGTTRADE = new ethers.Contract(config.wgt_addr, config.erc20_abi, signer)


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
export  async function accountBalance(walletAddress) {
  const res = await WEB3.eth.getBalance(walletAddress)
  return res
}

//授权
export async function approve() {
  const tx = await WGTTRADE.approve(config.game_addr,ethers.MaxUint256)
  const result = await tx.wait()
  console.log(result)
  return result
}

//购买nft
export async function buy(nftType) {
  const tx = await GAMETRADE.buy(nftType)
  const result = await tx.wait()
  console.log(result)
  return result
}