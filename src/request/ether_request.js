import { ethers } from "ethers"
import { config } from '@/const/config'

const provider = new ethers.BrowserProvider(window.ethereum)

export async function  nftsList(nftTypes) {
    const GAME =  new ethers.Contract(config.game_addr, config.game_abi, provider)
    const request = await GAME.getNFTs(nftTypes)
    console.log(request)
    return request
}