<template>
    <div>
        <div>
            <div class="py-8 top-0 sticky flex justify-center z-10 bg-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">领取出征收益</div>
                </div>
            </div>
            <div class="flex flex-col justify-start items-center" v-show="dataList.length !== 0">
                <div class="w-11/12 rounded bg-bottom-content mb-4 p-2 flex justify-between items-center"
                    v-for="(item, index) in dataList" :key="index">
                    <div class="text-xs text-gray-200">
                        <div class="mb-2">
                            tokenId: {{ item.nft_tokens }}
                        </div>
                        <div class="mb-2">
                            出征时间: {{ filterTime(item.utc) }}
                        </div>
                        <div class="">
                            收益可领取时间: {{ filterTime(Number(item.utc) + cycle_num) }}
                        </div>
                    </div>
                    <div class="buy-button text-sm rounded px-2 py-1" @click="handleGetEarning(item, index)">
                        领取收益
                    </div>
                </div>
            </div>
            <div v-show="dataList.length == 0" class="w-full text-center font-bold text-xl text-white">
                该角色卡暂无出征收益可领取
            </div>
        </div>
        <van-popup v-model:show="showIncomeMethod" position="bottom">
            <div class="text-card-content bg-cover-content flex w-full pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择出征卡收益领取方式
                </div>
                <div @click="currentIncome = index" v-for="(item, index) in campaignIncomeMethods" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-between items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentIncome == index ? 'buy-button text-white' : ''">
                    <span>{{ item.title }}</span>

                </div>
                <div class="flex w-11/12 justify-between items-center mt-6">

                    <div class="w-5/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showIncomeMethod = false">
                        取消
                    </div>
                    <div class="w-5/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded"
                        @click="handleConfirmGetIncome">
                        领取
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import gameContractApi from '@/request/ether_request/game'
import nftContractApi from '@/request/ether_request/nft'
import popularContractApi from '@/request/ether_request/popularized'
import { config } from '@/const/config'
import { ZeroAddress } from "ethers"
import { filterTime } from '@/utils/filterValue'
import nfts_list from '@/nft_datas/nfts_list'

import { Popup, showToast } from 'vant'
export default {
    components: { [Popup.name]: Popup },
    data() {
        return {
            campaignIncomeMethods: [{ title: '领取159WGT到钱包', isWGA: 0 }, { title: '领取159WGA-T到钱包', isWGA: 1 }],
            dataList: [],
            cardIndex: null,
            showIncomeMethod: false,
            cardJsIndex: null,
            currentIncome: 0,
            typeID: null,
            cycle_num: 10 * 60,
            typeID: null,
            campaignCardInfo: {},
            campaignIsWGAIncome: null
        }
    },
    mounted() {
        console.log(this.$route.params.cardIndex)
        this.cardIndex = Number(this.$route.params.cardIndex)
        this.typeID = Number(this.$route.query.typeID)
        const nftItem = nfts_list.filter(item => {
            return item.id == parseInt(this.typeID)
        })
        this.campaignCardInfo = nftItem[0]
        this.viewCampaignIncomeMethod()
        this.getCardInfor(window.ethereum.selectedAddress, this.cardIndex)
    },
    methods: {
        filterTime,
        cancelPay() {
            window.history.back();
        },
        async handleGetEarning(item, index) {
            this.$loading.show()

            // item.utc = item.utc
            try {
                await this.viewCampaignIncomeMethod()
                if (this.campaignIsWGAIncome == 0) {
                    this.campaignIncomeMethods = [{ title: `领取 ${this.campaignCardInfo.travel_reward * this.$store.state.WGTPoint} WGT 到钱包`, isWGA: 2 }, { title: `领取 ${this.campaignCardInfo.travel_reward * 20} WGT-A 到钱包`, isWGA: 1 }]
                    this.currentIncome = 0

                } else if (this.campaignIsWGAIncome == 1) {
                    this.campaignIncomeMethods = [{ title: `领取 ${this.campaignCardInfo.travel_reward * 20} WGT-A 到钱包`, isWGA: 1 }]
                    this.currentIncome = 0

                } else if (this.campaignIsWGAIncome == 2) {
                    this.campaignIncomeMethods = [{ title: `领取 ${this.campaignCardInfo.travel_reward * 20} WGT 到钱包`, isWGA: 2 }]
                    this.currentIncome = 0

                }
                this.$loading.hide()

            } catch {
                this.$loading.hide()
                showToast('获取收益领取方式失败，请重试')
                return
            }

            let cycle_num = 0;
            if (this.typeID == 1 || this.typeID == 2 || this.typeID == 3) {
                cycle_num = 60 * 60 * 24 * 7
            } else if (this.typeID == 4 || this.typeID == 5 || this.typeID == 6 || this.typeID == 7 || this.typeID == 8) {
                cycle_num = 60 * 60 * 24 * 30
            } else if (this.typeID == 9) {
                cycle_num = 60 * 60 * 24 * 60
            }
            if (item.utc !== 0) {
                let timeStamp = Date.now() / 1000
                let canCampaignAgain = timeStamp - Number(item.utc) > cycle_num
                console.log('canCampaignAgain', Number(item.utc) + cycle_num)
                if (!canCampaignAgain) {
                    this.$loading.hide()
                    showToast(`请在${this.resultFormat(Number(item.utc) + cycle_num - timeStamp)}后领取收益`)
                    return
                }
            }
            this.showIncomeMethod = true
            this.cardJsIndex = index
            console.log(index)
            console.log(item, index)
            // return
        },
        //检查erc721授权状态
        async erc721ApppprovalState(contractAddress) {
            return await nftContractApi.isApprovedAll(window.ethereum.selectedAddress, contractAddress)
        },
        //erc721合约授权操作
        async erc721ContractApppproval(contractAddress) {
            const result = await nftContractApi.apppprovalForAll(contractAddress)
            return result
        },
        //点击领取方式弹窗确认领取按钮
        async handleConfirmGetIncome() {
            this.showIncomeMethod = false
            this.$loading.show()
            let erc721ApppprovalState
            try {
                erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        this.erc721ContractApppproval(config.game_addr)
                            .then(res => {
                                console.log(res)
                                this.$confirm.hide()
                                this.$loading.hide()
                                showToast('授权成功')
                            })
                            .catch(err => {
                                this.$confirm.hide()
                                this.$loading.hide()

                                showToast('授权失败')
                            })
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            }
            let havePreAddr = await this.isBeenPromoted(window.ethereum.selectedAddress)
            if (!havePreAddr) {
                this.$loading.hide()
                showToast('当前地址无上级地址，不可领取')
                return
            }
            this.userReceiveCampaign(window.ethereum.selectedAddress, this.cardIndex, this.cardJsIndex, this.campaignIncomeMethods[this.currentIncome].isWGA)

        },
        async isBeenPromoted(walletAddress) {
            let result = await popularContractApi.relationshipAddress(walletAddress)
            console.log(result)
            let havePreAddr
            if (result.parent !== ZeroAddress) {
                havePreAddr = true
            } else {
                havePreAddr = false
            }
            return havePreAddr

        },
        //用户领取出征卡收益
        userReceiveCampaign(walletAddress, index, cardJsIndex, isWGA) {
            console.log(walletAddress, index, cardJsIndex, isWGA)

            gameContractApi.campaignEarnings(walletAddress, index, cardJsIndex, isWGA)
                .then(res => {
                    console.log(res)
                    showToast('领取成功')
                    this.getCardInfor(window.ethereum.selectedAddress, this.cardIndex)
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()
                    console.log('err', err)
                })
        },

        resultFormat(timestamp) {
            let d = parseInt(timestamp / (24 * 60 * 60))
            d = d < 10 ? "0" + d : d
            let h = parseInt(timestamp / (60 * 60) % 24);
            h = h < 10 ? "0" + h : h
            let m = parseInt(timestamp / 60 % 60);
            m = m < 10 ? "0" + m : m
            let s = parseInt(timestamp % 60);
            s = s < 10 ? "0" + s : s
            let count = d + '天' + h + '时' + m + '分' + s + '秒'
            return count
        },
        //获取角色卡的出征令信息
        async getCardInfor(walletAddress, cardIndex) {
            this.$loading.show()
            gameContractApi.cardInfo(walletAddress, cardIndex)
                .then(res => {
                    this.dataList = res.nft_tokens
                    this.typeID = Number(res[1]) % 100
                    console.log(res, this.dataList)
                    console.log(this.typeID)

                    if (this.typeID == 1 || this.typeID == 2 || this.typeID == 3) {
                        this.cycle_num = 60 * 60 * 24 * 7
                    } else if (this.typeID == 4 || this.typeID == 5 || this.typeID == 6 || this.typeID == 7 || this.typeID == 8) {
                        this.cycle_num = 60 * 60 * 24 * 30
                    } else if (this.typeID == 9) {
                        this.cycle_num = 60 * 60 * 24 * 60
                    }

                    this.$loading.hide()
                })
                .catch(err => {
                    console.log(err)
                    this.$loading.hide()
                })
            // let timeStamp = Date.now() / 1000
            // let result = await gameContractApi.cardInfo(walletAddress, cardIndex);
            // let within24Hours = timeStamp - Number(result.nft_tokens[0].utc) < 60 * 10
            // // console.log(timeStamp - (Number(result.nft_tokens[0].utc) * 60 * 10))
            // console.log(within24Hours, timeStamp - Number(result.nft_tokens[0].utc))
            // if (within24Hours) {
            //     return 10 * 60 - Number(result.nft_tokens[0].utc)
            // } else {
            //     return false
            // }
        },
        //查询出征卡收益方式

        async viewCampaignIncomeMethod() {
            this.campaignIsWGAIncome = await gameContractApi.campaignIncomeMethod()
            this.campaignIsWGAIncome = Number(this.campaignIsWGAIncome)
        },
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>