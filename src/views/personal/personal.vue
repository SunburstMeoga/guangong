<template>
    <div>
        <div class="flex flex-col justify-start items-center pt-20">
            <div class="w-full">
                <personal-assets />
            </div>
            <div class="w-11/12 pb-20">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab title="我的NFT" class="pt-4">
                        <div class="" :class="assetsList.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="assetsList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in assetsList" :key="index" @click="toAassetsDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <assets-card :imageUrl="_item.infor.imageUrl" :price="_item.infor.price"
                                        :name="_item.infor.name" :cardType="getCardType(_item.infor.card_type)"
                                        :token="_item.tokenId" :currency="_item.infor.card_type" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="正在挂单" class="pt-4">
                        <div class="" :class="pendingList.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="pendingList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in  pendingList" :key="index"
                                    @click="toPendingOrderDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <assets-card type="pending" :imageUrl="_item.infor.imageUrl"
                                        :price="filterAmount(_item.amount)" :name="_item.infor.name"
                                        :currency="_item.infor.card_type" :cardType="getCardType(_item.infor.card_type)"
                                        :nftID="_item.tokenId" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="正在出征" class="pt-4">
                        <!-- <div :class="pendingList.length !== 0 ? 'columns-2 gap-x-3' : ''"> -->
                        <div>
                            <div v-if="campaignList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else class="flex justify-start flex-wrap w-full">
                                <div v-for="( _item, _index ) in campaignList" :key="index"
                                    class="rounded-lg mb-2 overflow-hidden break-inside-avoid shadow-md w-6/12 px-1">
                                    <campaign-card type="pending" :nftRole="_item.nft_role" :utc="_item.time"
                                        @campaignAgain="handleCampaignAgain(_item, _index)"
                                        @receiveProceeds="handleReceiveCampaignProceeds(_item, _index)"
                                        :imageUrl="_item.infor.imageUrl" :nftToken="_item.nft_token" :count="_item.count"
                                        :income="_item.income"
                                        :cammaignAttribute="getCammaignAttribute([_item.zhangJiao, _item.zhuGeLiang, _item.mengHuo, _item.yuanShu])"
                                        :name="_item.infor.name" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="财神卡" class="pt-4">
                        <!-- <div :class="pendingList.length !== 0 ? 'columns-2 gap-x-3' : ''"> -->
                        <div>
                            <div v-if="wealthList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else class="flex justify-start flex-wrap w-full">
                                <div v-for="( _item, _index ) in wealthList" :key="index"
                                    class="rounded-lg mb-2 overflow-hidden break-inside-avoid shadow-md w-6/12 px-1">
                                    <wealth-card @receiveProceeds="handleReceiveWealthProceeds(_item, _index)"
                                        type="pending" :isWGA="_item.is_wga" :time="filterTime(_item.time)"
                                        :imageUrl="_item.infor.imageUrl" incomeMethod="领取收益" :name="_item.infor.name" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>

            </div>
        </div>
        <van-popup v-model:show="showOutToken">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择{{ nftInfor.outbound_tokens }}</div>
                <div @click="clickOutToken(index)" v-for="(item, index) in outTokenList" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentOutToken === index ? 'buy-button text-white' : ''">
                    {{ nftInfor.outbound_tokens }} #{{ item.tokenId }}
                </div>
                <div class="flex w-11/12 justify-between items-center mt-6">

                    <div class="w-4/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showOutToken = false">
                        取消
                    </div>
                    <div class="w-7/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="confirmCampaign">
                        确认使用并出征
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 收益方式弹窗 -->
        <van-popup v-model:show="showIncomeMethod" position="bottom">
            <div class="text-card-content bg-cover-content flex w-full pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择{{ cardType == 0 ? '出征卡' : '财神卡' }}收益领取方式
                </div>
                <div v-show="isWGAWealth" class="w-11/12 text-left">
                    <div class="mb-2">本金</div>
                    <div class="buy-button text-white py-3.5 px-2 text-sm rounded mb-4">
                        {{ wealthCapital }}
                    </div>
                </div>
                <!-- <div v-show="isWGAWealth">
                    ：222WGT 领取到钱包
                </div> -->
                <!-- <div v-show="incomeCardType == 0" @click="clickIncomeMethod(item, index)"
                    v-for="(item, index) in campaignIncomeMethods" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-between items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentIncome == index ? 'buy-button text-white' : ''">
                    <span>{{ item.title }}</span>

                </div> -->
                <div v-show="isWGAWealth" class="w-11/12 text-left mb-2">
                    利润
                </div>
                <div v-show="incomeCardType == 1" @click="clickIncomeMethod(item, index)"
                    v-for="(item, index) in wealthIncomeMethods" :key="index"
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
import ModuleTitle from '@/components/ModuleTitle'
import PersonalAssets from '@/components/PersonalAssets'
import AssetsCard from '@/components/AssetsCard'
import CampaignCard from '@/components/CampaignCard'
import WealthCard from '@/components/WealthCard'
import { ownerList, pendingOrderList, outboundTokens } from '@/request/api_request'
import gameContractApi from '@/request/ether_request/game'

import nfts_list from '@/nft_datas/nfts_list'
import { filterTime, filterAmount } from '@/utils/filterValue'
import nftContractApi from '@/request/ether_request/nft'
import { ZeroAddress } from "ethers"

import { config } from '@/const/config'
import helpContractApi from '@/request/ether_request/help'
import popularContractApi from '@/request/ether_request/popularized'




import { Tab, Tabs, showToast, Popup } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popup.name]: Popup, PersonalAssets, AssetsCard, CampaignCard, WealthCard },
    data() {
        return {
            active: 0,
            tabList: [{ title: '所有资产' }, { title: '正在挂单' }],
            assetsList: [],
            pendingList: [],
            campaignList: [],
            wealthList: [],
            outTokenList: [],
            showOutToken: false,
            currentOutToken: 0,
            nftInfor: {},
            cardIndex: 0,
            campaignIsWGAIncome: false,
            wealthIncomePay: null,
            showIncomeMethod: false,
            campaignIncomeMethods: [{ title: '领取到WGT余额', isWGA: 0 }, { title: '领取到WGA-T余额', isWGA: 1 }],
            wealthIncomeMethods: [{ title: '领取到WGT余额', isWGA: 0 }, { title: '领取到WGA-T余额', isWGA: 1 }],
            currentIncome: 1,
            incomeCardIndex: null,
            incomeCardType: null, //当前领取收益的卡片类型，0出征卡，1财神卡
            cardJsIndex: null,
            wealthCardNFTID: null,
            wealthTime: null,
            wealthCardInfo: {},
            isWGAWealth: false,
            wealthCapital: 0
            // assetsList: []
        }
    },
    mounted() {
        if (window.ethereum.selectedAddress) {
            this.getPersonNfts()
            this.getPendingOrderList()
            this.getUserInfo()
            this.viewCampaignIncomeMethod()
            // this.viewWGTWealthIncomeMethod()

        }
        // console.log('ethereum.selectedAddress', ethereum.selectedAddress)
        // console.log(this.getCammaignAttribute([false, false, true, true]))
    },
    methods: {
        filterTime,
        filterAmount,
        //点击领取方式弹窗确认按钮
        async handleConfirmGetIncome() {
            this.showIncomeMethod = false
            console.log(this.incomeCardType)
            this.$loading.show()
            // return
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
            console.log(this.incomeCardType)
            this.userReceiveWealth(window.ethereum.selectedAddress, this.incomeCardIndex, this.wealthIncomeMethods[this.currentIncome].isWGA)
            // if (this.incomeCardType == 1) {
            //     this.userReceiveWealth(window.ethereum.selectedAddress, this.incomeCardIndex, this.wealthIncomeMethods[this.currentIncome].isWGA)
            // } else if (this.incomeCardType == 0) {
            //     this.userReceiveCampaign(window.ethereum.selectedAddress, this.incomeCardIndex, this.cardJsIndex, this.campaignIncomeMethods[this.currentIncome].isWGA)
            // } else {
            //     this.$loading.hide()
            //     showToast('领取失败，请重试')
            // }
        },
        //选择收益方式
        clickIncomeMethod(item, index) {
            this.currentIncome = index
        },
        //点击出征令选项
        clickOutToken(index) {
            this.currentOutToken = index
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
        //获取当前出征卡能领取的金额
        async getCampaignReceiveAmount(nftIndex) {
            console.log(nftIndex)
            const result = await helpContractApi.wealthEarningsInfor(window.ethereum.selectedAddress, nftIndex)
            return result
        },
        //获取当前出征的角色卡需要的出征令牌存货
        async campaignNeededOutboundTokens(outbound_tokens_id) {
            const result = await outboundTokens(window.ethereum.selectedAddress, outbound_tokens_id)
            if (result.data.length !== 0) {
                this.outTokenList = result.data
                return this.outTokenList
            }
            return result.data.length
        },
        //点击再次出征按钮
        async handleCampaignAgain(item, index) {

            this.nftInfor = item.infor
            this.cardIndex = index
            let cycle_num = 0;
            if (item.typeID == 1 || item.typeId == 2 || item.typeId == 3) {
                cycle_num = 60 * 60 * 24 * 7
            } else if (item.typeID == 4 || item.typeId == 5 || item.typeId == 6 || item.typeId == 7 || item.typeId == 8) {
                cycle_num = 60 * 60 * 24 * 30
            } else if (item.typeID == 9) {
                cycle_num = 60 * 60 * 24 * 60
            }
            if (item.time !== 0) {
                let timeStamp = Date.now() / 1000
                let canCampaignAgain = timeStamp - Number(item.time) > cycle_num
                console.log('canCampaignAgain', Number(item.time) + cycle_num)
                if (!canCampaignAgain) {
                    showToast(`请在${this.resultFormat(Number(item.time) + cycle_num - timeStamp)}后再次出征`)
                    return
                }
            }

            if (item.count >= item.infor.loss_period) {
                showToast('当前卡已到达最大出征次数')
                return
            }
            // if (!item.income) {
            //     showToast('请在xx小时后进行出征')
            //     return
            // }
            if (!window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.$loading.show()
            let tokensAcount
            try {
                tokensAcount = await this.campaignNeededOutboundTokens(item.infor.outbound_tokens_id)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            if (tokensAcount == 0) {
                this.$loading.hide()
                showToast(`请先购买${item.infor.outbound_tokens}`)
                return
            }
            this.$loading.hide()
            this.showOutToken = true
            console.log(item.infor.loss_period)
        },
        //erc721合约授权操作
        async erc721ContractApppproval(contractAddress) {
            const result = await nftContractApi.apppprovalForAll(contractAddress)
            return result
        },
        //检查erc721授权状态
        async erc721ApppprovalState(contractAddress) {
            return await nftContractApi.isApprovedAll(window.ethereum.selectedAddress, contractAddress)
        },
        //再次出征
        async userCampaignAgain() {
            console.log(this.cardIndex, this.outTokenList[this.currentOutToken].tokenId)
            gameContractApi.userCampaignAgain(this.cardIndex, this.outTokenList[this.currentOutToken].tokenId)
                .then((res) => {
                    console.log('出征成功', res)
                    this.$loading.hide()
                    showToast('出征成功')
                    this.getUserInfo()
                    this.getPersonNfts()
                    // window.history.back();
                })
                .catch(err => {
                    console.log('出征失败', err)
                    this.$loading.hide()
                    showToast('出征失败')
                })
        },
        //点击出征令牌弹窗的确认按钮
        async confirmCampaign() {
            this.$loading.show()
            this.showOutToken = false
            const erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            console.log('erc721ApppprovalState', erc721ApppprovalState)
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.showOutToken = false
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
            } else {
                this.userCampaignAgain()
            }
        },
        //用户领取出征卡收益
        userReceiveCampaign(walletAddress, index, cardJsIndex, isWGA) {
            console.log(walletAddress, index, cardJsIndex, isWGA)
            // if (item.income) {
            //     showToast('本次出征收益已领取，不可重复领取')
            //     this.$loading.hide()
            //     return
            // }
            console.log(index)
            gameContractApi.campaignEarnings(walletAddress, index, cardJsIndex, isWGA)
                .then(res => {
                    console.log(res)
                    showToast('领取成功')
                    this.getUserInfo()
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()
                    console.log('err', err)
                })
        },
        //用户领取财神卡收益
        userReceiveWealth(walletAddress, index, isWGA) {
            console.log(walletAddress, index, isWGA)
            gameContractApi.wealthEarnings(walletAddress, index, isWGA)
                .then(res => {
                    console.log(res)
                    showToast('领取成功')
                    this.getUserInfo()
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()
                    console.log('err', err)

                })
        },
        //点击领取出征卡收益
        async handleReceiveCampaignProceeds(item, index) {
            console.log(item)
            // return
            // this.incomeCardType = 0
            // this.cardJsIndex = item.cardJsIndex
            // this.incomeCardIndex = index
            // this.showIncomeMethod = true

            this.$router.push({
                path: '/campaign-earning/' + index,
                query: { typeID: item.typeID }
            })
        },
        //查询wgt财神卡收益方式
        async viewWGTWealthIncomeMethod() {
            this.wealthIncomePay = await gameContractApi.wgtWealthIncomeMethod()
            this.wealthIncomePay = Number(this.wealthIncomePay)
            // .then(res => {
            //     this.wealthIncomePay = res

            // })
            // .catch(err => {
            //     console.log('err', err)
            // })
        },
        //查询wga财神卡收益方式
        async viewWGAWealthIncomeMethod() {
            this.wealthIncomePay = await gameContractApi.wgaWealthIncomeMethod()
            this.wealthIncomePay = Number(this.wealthIncomePay)
            // .then(res => {
            //     this.wealthIncomePay = res

            // })
            // .catch(err => {
            //     console.log('err', err)
            // })
        },
        //查询出征卡收益方式
        viewCampaignIncomeMethod() {
            gameContractApi.campaignIncomeMethod()
                .then(res => {
                    this.campaignIsWGAIncome = res
                    if (!this.campaignIsWGAIncome) {
                        this.campaignIncomeMethods = [{ title: '领取到WGT余额', isWGA: 0 }, { title: '领取到WGA-T余额', isWGA: 1 }]
                    } else if (this.campaignIsWGAIncome) {
                        this.campaignIncomeMethods = [{ title: '领取到WGA-T余额', isWGA: 1 }]
                    }
                })
                .catch(err => {
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
        //判断当前卡片是否到了可再次出征的时间
        async getCardInfor(walletAddress, cardIndex) {
            let timeStamp = Date.now() / 1000
            let result = await gameContractApi.cardInfo(walletAddress, cardIndex);
            console.log()
            let within24Hours = timeStamp - Number(result.nft_tokens[0].utc) < 60 * 10
            // console.log(timeStamp - (Number(result.nft_tokens[0].utc) * 60 * 10))
            console.log(within24Hours, timeStamp - Number(result.nft_tokens[0].utc))
            if (within24Hours) {
                return 10 * 60 - Number(result.nft_tokens[0].utc)
            } else {
                return false
            }
        },
        //点击领取财神卡收益
        async handleReceiveWealthProceeds(item, index) {
            this.$loading.show()
            console.log(item)
            // return
            let cycle_num
            if (item.typeID == 12 || item.typeId == 13 || item.typeId == 14 || item.typeId == 15 || item.typeId == 16 || item.typeId == 17 || item.typeId == 18) {
                cycle_num = 60 * 60 * 24 * 30
            } else if (item.typeID == 19) {
                cycle_num = 60 * 60 * 24 * 45
            } else if (item.typeID == 10) {
                cycle_num = 60 * 60 * 24 * 7
            } else if (item.typeID == 11) {
                cycle_num = 60 * 60 * 24 * 15
            } else if (item.typeID == 20) {
                cycle_num = 60 * 60 * 24 * 60
            } else if (item.typeID == 21) {
                cycle_num = 60 * 60 * 24 * 90
            } else if (item.typeID == 22) {
                cycle_num = 60 * 60 * 24 * 180
            }


            if (item.time !== 0) {
                let timeStamp = Date.now() / 1000
                let canCampaignAgain = timeStamp - Number(item.time) > cycle_num
                console.log('canCampaignAgain', Number(item.time) + cycle_num)
                if (!canCampaignAgain) {
                    showToast(`${this.resultFormat(Number(item.time) + cycle_num - timeStamp)}后可领取收益`)
                    this.$loading.hide()
                    return
                }
            }
            let nftItem = nfts_list.filter(_item => {
                // console.log()
                return _item.id == parseInt(item.typeID)
            })
            let wealthCardInfo = nftItem[0]
            this.isWGAWealth = item.is_wga
            try {

                if (item.is_wga) {
                    await this.viewWGAWealthIncomeMethod()
                    this.wealthIncomeMethods = [{ title: `领取 ${Number((wealthCardInfo.award - Number(wealthCardInfo.price)) * this.$store.state.WGTPoint).toFixed(4)} WGT 到钱包`, isWGA: 2 }, { title: `领取 ${Number((wealthCardInfo.award - Number(wealthCardInfo.price)) * 20).toFixed(4)} WGT-A 到钱包`, isWGA: 1 }]
                    this.currentIncome = 0
                    if (this.wealthIncomePay == 1) {
                        this.wealthCapital = `领取 ${Number(wealthCardInfo.price) * 20} WGT-A 到钱包`
                    } else if (this.wealthIncomePay == 2) {
                        this.wealthCapital = `领取 ${Number(wealthCardInfo.price) * this.$store.state.WGTPoint} WGT 到钱包`
                    }
                    this.$loading.hide()
                } else {
                    await this.viewWGTWealthIncomeMethod()
                    if (this.wealthIncomePay == 0) {
                        this.wealthIncomeMethods = [{ title: `领取 ${wealthCardInfo.award * this.$store.state.WGTPoint} WGT 到钱包`, isWGA: 2 }, { title: `领取 ${Number(wealthCardInfo.award * 20).toFixed(4)} WGT-A 到钱包`, isWGA: 1 }]
                        this.currentIncome = 0
                    } else if (this.wealthIncomePay == 1) {
                        this.wealthIncomeMethods = [{ title: `领取 ${Number(wealthCardInfo.award * 20).toFixed(4)} WGT-A 到钱包`, isWGA: 1 }]
                        this.currentIncome = 0
                    } else if (this.wealthIncomePay == 2) {
                        this.wealthIncomeMethods = [{ title: `领取 ${wealthCardInfo.award * this.$store.state.WGTPoint} WGT 到钱包`, isWGA: 2 }]
                        this.currentIncome = 0
                    }
                    this.$loading.hide()
                }
                console.log('wealthIncomePay', this.wealthIncomePay, item.is_wga ? 'wga财神卡' : 'wgt财神卡')
            } catch (err) {
                this.$loading.hide()
                showToast('获取收益领取方式失败，请重试')
                console.log(err)
                return
            }




            this.incomeCardType = 1
            this.incomeCardIndex = index
            this.cardJsIndex = null
            this.showIncomeMethod = true
            this.wealthCardNFTID = item.typeID
            this.wealthTime = item.time

            console.log(item, index)
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
        //卡片类型
        getCardType(card_type) {
            if (card_type == 'nft_role') {
                return 'NFT角色卡'
            } else if (card_type == 'synthesis_props') {
                return '合成道具卡'
            } else if (card_type == 'tactics_props') {
                return '战法道具卡'
            } else if (card_type == 'expedition_order') {
                return '出征令牌'
            }
        },
        //获取出征卡片的属性
        getCammaignAttribute(attrubutes) {
            let arr = []
            attrubutes.map(item => {
                arr.push(item)
            })
            if (arr.indexOf(true) == -1) return '暂无出征属性'
            arr[0] === true ? arr[0] = '张角' : arr[0] = false
            arr[1] === true ? arr[1] = '诸葛亮' : arr[1] = false
            arr[2] === true ? arr[2] = '孟获' : arr[2] = false
            arr[3] === true ? arr[3] = '袁术' : arr[3] = false
            let targetArr = arr.filter(item => {
                return item !== false
            })

            return targetArr.join("&")
        },
        //获取用户信息
        async getUserInfo() {
            gameContractApi.userInfo(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('出征和财神卡', res.cards)
                    //出征
                    let typeListCampaign = []
                    res.cards.map((item, index) => {
                        let obj = {}
                        // let time = ''
                        obj.typeID = item.nft_role > 100 ? parseInt(item.nft_role) % 100 : item.nft_role
                        obj.tokenId = item.nft_role
                        obj.nft_role = item.nft_role
                        obj.nft_tokens = item.nft_tokens
                        obj.cammaignAttribute = item.zhangJiao
                        obj.count = item.count
                        obj.income = item.income
                        obj.outbound_tokens_id = item.outbound_tokens_id
                        obj.cardJsIndex = item.cardJsIndex
                        console.log(item.nft_tokens)
                        // if (time.nft_tokens.length !== 0) {
                        //     obj.time = time.nft_tokens[0].utc
                        // } else {
                        //     obj.time = 0
                        // }
                        typeListCampaign.push(obj)
                        let newArrCampaign = typeListCampaign.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                        newArrCampaign.map(item => {
                            nfts_list.map(_item => {
                                if (item.typeID == _item.id) {
                                    item.infor = _item
                                }
                            })
                        })
                        // this.campaignList = newArrCampaign.sort((a, b) => Number(a.tokenId) - Number(b.tokenId));
                        this.campaignList = newArrCampaign
                        console.log(this.campaignList)
                    })
                    this.campaignList.map((item, index) => {
                        gameContractApi.cardInfo(window.ethereum.selectedAddress, index)
                            .then(res => {
                                if (res.nft_tokens.length !== 0) {
                                    item.time = res.nft_tokens[0].utc
                                } else {
                                    item.time = 0
                                }
                            })
                            .catch(err => {

                            })
                    })


                    // res.cards.map((item, index) => {
                    //     let time = gameContractApi.cardInfo(window.ethereum.selectedAddress, index)
                    //     console.log(item, index, time)
                    //     // .then(time => {
                    //     //     console.log('time----', index, time.nft_tokens.length)
                    //     //     let obj = {}
                    //     //     obj.typeID = item.nft_role > 100 ? parseInt(item.nft_role) % 100 : item.nft_role
                    //     //     obj.tokenId = item.nft_role
                    //     //     obj.nft_role = item.nft_role
                    //     //     obj.nft_tokens = item.nft_tokens
                    //     //     obj.cammaignAttribute = item.zhangJiao
                    //     //     obj.count = item.count
                    //     //     obj.income = item.income
                    //     //     obj.outbound_tokens_id = item.outbound_tokens_id
                    //     //     obj.cardJsIndex = item.cardJsIndex
                    //     //     console.log(item.nft_tokens)
                    //     //     if (time.nft_tokens.length !== 0) {
                    //     //         obj.time = time.nft_tokens[0].utc
                    //     //     } else {
                    //     //         obj.time = 0
                    //     //     }
                    //     //     typeListCampaign.push(obj)
                    //     //     let newArrCampaign = typeListCampaign.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    //     //     newArrCampaign.map(item => {
                    //     //         nfts_list.map(_item => {
                    //     //             if (item.typeID == _item.id) {
                    //     //                 item.infor = _item
                    //     //             }
                    //     //         })
                    //     //     })

                    //     //     // this.campaignList = newArrCampaign.sort((a, b) => Number(a.tokenId) - Number(b.tokenId));
                    //     //     this.campaignList = newArrCampaign
                    //     // })
                    //     // .catch(err => {
                    //     //     console.log(err)
                    //     // })

                    // })


                    //财神卡
                    let typeListWealth = []
                    res.deposits.map(item => {
                        let obj = {}
                        obj.typeID = item.token_id > 100 ? parseInt(item.token_id) % 100 : item.token_id
                        obj.tokenId = item.token_id
                        obj.time = item.time
                        obj.is_wga = item.is_wga
                        typeListWealth.push(obj)
                    })
                    let newArrWealth = typeListWealth.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArrWealth.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })
                    this.wealthList = newArrWealth
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //获取用户的挂单列表
        getPendingOrderList() {
            pendingOrderList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('挂单', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.nft_id > 100 ? item.nft_id % 100 : item.nft_id
                        obj.tokenId = item.nft_id
                        obj.amount = item.amount
                        typeList.push(obj)
                    })
                    let newArr = typeList.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArr.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })
                    this.pendingList = newArr
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //用户资产列表
        getPersonNfts() {
            ownerList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('res', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.tokenId % 100
                        obj.tokenId = item.tokenId
                        typeList.push(obj)
                    })
                    let newArr = typeList.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArr.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })
                    const resArr = new Map() //去重
                    // newArr = new Set([...newArr])
                    this.assetsList = newArr.filter((item) => !resArr.has(item.tokenId) && resArr.set(item.tokenId, 1))
                    console.log(this.assetsList)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        toAassetsDetails(_item) {
            console.log('item', _item)
            // return
            this.$router.push({
                path: '/assets/' + _item.tokenId
            })
        },
        toPendingOrderDetails(_item) {
            this.$router.push({
                path: '/pending-order/' + _item.tokenId
            })
        },
        toCampaignDetails(_item) {
            this.$router.push({
                path: '/campaign/' + _item.tokenId
            })
        },
        toWealthDetails(_item) {
            // this.$router.push({
            //     path: '/campaign/' + _item.tokenId
            // })
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.van-tabs__wrap {
    height: 80px;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>