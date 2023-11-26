<template>
    <div>
        <div>
            <div class="py-8 top-0 sticky flex justify-center z-10 bg-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">{{ nftInfor.name }}</div>
                </div>
            </div>
            <div class="pt-4">
                <div
                    class="relative ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-4">
                    <div class="w-80 h-80">
                        <img :src="nftInfor.imageUrl" alt="">
                    </div>
                    <div
                        class="absolute top-0 left-0 rounded-br-xl inline-block px-2 py-1 bg-success-undertone text-sm text-success-word">
                        {{ getCardTypeWord(nftInfor.card_type) }}
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center mb-10">
                    <div class="w-11/12 text-3xl mb-2 border-module text-card-content font-medium">
                        {{ nftInfor.name }}
                        <!-- <div class="pt-2 w-11/12 text-xs text-theme-primary">当前1U ≈ {{ $store.state.WGTPoint }} WGT</div> -->
                    </div>


                    <!-- nft角色卡信息 -->
                    <div class="border-module w-11/12 text-card-content font-light" v-if="nftInfor.card_type == 'nft_role'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">詳細資料</div>
                        </div>
                        <div class="mt-8" v-show="showDetails">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">階段</div>
                                <div class="text-base text-card-content">{{ nftInfor.stage }}</div>

                            </div>
                            <!-- <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">發行量</div>
                                <div class="text-base text-card-content">不限量</div>

                            </div> -->
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征令牌</div>
                                <div class="text-base text-card-content">{{ nftInfor.outbound_tokens }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">令牌價</div>
                                <div class="text-base text-card-content">{{ nftInfor.token_value }}</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">週期</div>
                                <div class="text-base text-card-content">{{ nftInfor.cycle }}</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">月化利率</div>
                                <div class="text-base text-card-content">{{ nftInfor.monthly_interest_rate }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">損耗週期</div>
                                <div class="text-base text-card-content">{{ nftInfor.loss_period }} 次</div>

                            </div>
                        </div>
                    </div>
                    <!-- 战法道具卡信息 -->
                    <div class="border-module w-11/12 text-card-content font-light"
                        v-if="nftInfor.card_type == 'tactics_props'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">{{ nftInfor.name }}道具卡详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">技能</div>
                                <div class="text-base text-card-content">{{ nftInfor.prop_features }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">限制</div>
                                <div class="text-base text-card-content">{{ nftInfor.target }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">WGT价格</div>
                                <div class="text-base text-card-content">{{ Math.ceil(Number((goodType == 'good' ?
                                    nftInfor.price : nftAmount) *
                                    ($store.state.WGTPoint * 1.03)).toFixed(4)) }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">价值</div>
                                <div class="text-base text-card-content">{{ nftInfor.price }} U</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">注意事项</div>
                                <div class="text-base text-theme-primary font-semibold">{{ nftInfor.tips }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 出征令牌介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'expedition_order'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl">出征令牌详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">可用于以下NFT卡片出征</div>
                                <div class="text-base text-card-content">{{ nftInfor.can_be_used.join("，") }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">WGT价格</div>
                                <div class="text-base text-card-content">{{ Math.ceil(Number((goodType == 'good' ?
                                    nftInfor.price : nftAmount) *
                                    ($store.state.WGTPoint * 1.03)).toFixed(4)) }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray" v-if="goodType == 'market'">挂单价</div>
                                <div class="text-base text-card-content" v-if="goodType == 'market'">{{
                                    Math.ceil(Number(nftAmount).toFixed(4)) }} U</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">价值</div>
                                <div class="text-base text-card-content">{{ nftInfor.price }} U</div>
                            </div>
                        </div>
                    </div>

                    <!-- 财神卡介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'fortune_card'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">{{ nftInfor.name }}详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">阶段</div>
                                <div class="text-base text-card-content">{{ nftInfor.level }}</div>
                            </div>
                            <!-- <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">角色价值</div>
                                <div class="text-base text-card-content">{{ nftInfor.circulation }}</div>
                            </div> -->
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">财神奖励</div>
                                <div class="text-base text-card-content">{{ nftInfor.award }} U</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">周期（天）</div>
                                <div class="text-base text-card-content">{{ nftInfor.cycle }}</div>
                            </div>
                        </div>
                    </div>


                    <div class="border-module w-11/12 text-card-content mb-20">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">發行方</div>
                            <!-- <div class="icon iconfont icon-right  show-icon" :class="showIssue ? '-rotate-90' : ''">
                            </div> -->
                        </div>
                        <div class="mt-8 flex justify-start items-center h-14" v-show="showIssue">
                            <div class="rounded-full overflow-hidden w-10 h-10 bg-theme-primary">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="ml-2 flex flex-col justify-between">
                                <div class="text-white font-medium">由 世界關公寶WGT 发行</div>
                                <div class="text-icon-gray">发行于 2023.11.30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 购买官方发售的商品按钮 -->
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content" v-if="goodType == 'good'">
                    <div class="buy-button flex justify-center items-baseline text-primary-word text-lg button-word"
                        @click="handlePay">
                        <span v-show="!isFetchingPoint">
                            <span class="pr-2">购买 </span> {{ nftCurrencyPrice(nftInfor.card_type, nftInfor.price) }} {{
                                nftCurrencyWord(nftInfor.card_type) }}
                            <span v-if="nftInfor.card_type == 'fortune_card'">或 {{ Math.ceil(Number(nftInfor.price *
                                ($store.state.WGTPoint * 1.03
                                )).toFixed(4)) }} WGT</span>
                        </span>
                        <span v-show="isFetchingPoint" class="flex justify-center items-center">
                            <span class="w-6">
                                <img src="../../assets/loading.gif" />
                            </span>
                            <span class="pl-4">正在获取WGT价格...</span>
                        </span>
                        <!-- <span class="text-sm font-light pl-2">
                            (WGT余额:{{ getFilterAmount($store.state.wgtBalance) }})
                        </span> -->
                    </div>
                </div>
                <!-- 购买nft市场的商品按钮 -->
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content" v-else>
                    <div class="buy-button flex justify-center items-baseline text-primary-word text-lg button-word"
                        @click="handlePay">
                        <span>
                            <span class="pr-1">购买</span> {{ Math.ceil(Number((nftAmount) *
                                ($store.state.WGTPoint * 1.03)).toFixed(4)) }} WGT
                        </span>

                        <span class="text-xs pl-2">
                            (当前1U ≈ {{ $store.state.WGTPoint }} WGT)
                        </span>
                    </div>
                </div>

            </div>
        </div>
        <!-- 支付方式弹窗 -->
        <van-popup v-model:show="showPayWay" position="bottom">
            <div class="text-card-content bg-cover-content flex w-full pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择支付方式</div>
                <div @click="clickPayWay(item, index)" v-for="(item, index) in payWayList" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-between items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentPayWay == index ? 'buy-button text-white' : ''">
                    <span>{{ item.name }}</span>
                    <span>余额：{{ item.amount }}</span>
                </div>
                <div class="flex w-11/12 justify-between items-center mt-6">

                    <div class="w-4/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showPayWay = false">
                        取消
                    </div>
                    <div class="w-7/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded"
                        @click="handleConfirmPay">
                        确认支付
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Swipe, SwipeItem, showToast, Popup } from 'vant';
import nfts_list from '@/nft_datas/nfts_list'
import { config } from '@/const/config'
import { accountBalance } from '@/request/ether_request'
import gameContractApi from '@/request/ether_request/game'
import wgtContractApi from '@/request/ether_request/wgt'
import wgaContractApi from '@/request/ether_request/wga'
import marketContractApi from '@/request/ether_request/market'
import nftContractApi from '@/request/ether_request/nft'
import { nftDetails, buyMarketNFTApi } from '@/request/api_request'
import { filterAmount } from '@/utils/filterValue';
import usdtContractApi from '@/request/ether_request/usdt'

import Web3 from "web3";


export default {
    components: { [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem, [Popup.name]: Popup },
    data() {
        return {
            currentSwipe: 0,
            showStage: true,
            showRequest: true,
            showDetails: true,
            showIssue: true,
            nftInfor: {},
            tokenId: 0,
            goodType: '',
            nftAmount: '',
            showPayWay: false,
            currentPayWay: 0,
            payWayList: [],
            WGTPoint: 0,
            isFetchingPoint: false
        }
    },
    async mounted() {
        this.goodType = this.$route.name
        if (this.$route.name == 'good') {
            console.log('good')
            console.log(this.$route.params.id)
            this.matchNFTData(parseInt(this.$route.params.id))
        } else if (this.$route.name == 'market') {
            console.log('market')

            this.tokenId = this.$route.params.tokenId
            this.getNFTDetails()
        }
    },
    methods: {
        accountBalance, filterAmount,
        nftCurrencyPrice(type, price) {

            if (type == 'tactics_props' || type == 'expedition_order') {
                return Math.ceil(Number(price * (this.$store.state.WGTPoint * 1.03)).toFixed(4))
            } else if (type == 'fortune_card') {
                return Number(price) * 20
            } else {
                return price
            }
        },
        nftCurrencyWord(type) {

            if (type == 'nft_role' || type == 'synthesis_props') {
                return 'U'
            } else if (type == 'fortune_card') {
                return 'WGT-A'
            } else {
                return 'WGT'
            }

        },
        clickPayWay(item, index) {
            if (item.isInsufficientBalance) {
                this.$loading.hide()
                showToast(`${item.name}余额不足`)
                return
            }
            this.currentPayWay = index
        },
        cancelPay() {
            window.history.back();
        },
        getFilterAmount(amount) {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            const reslut = WEB3.utils.fromWei(amount, 'ether')
            return reslut
        },
        //卡类型
        getCardTypeWord(value) {
            switch (value) {
                case 'nft_role': return 'NFT角色卡'
                case 'tactics_props': return '战法道具卡'
                case 'expedition_order': return '出征令牌'
                case 'synthesis_props': return '合成道具卡'
                case 'fortune_card': return '财神卡'
            }
        },
        //wgt是否余额不足
        async wgtIsInsufficientBalance(usdt) {
            console.log(gameContractApi)
            const WEB3 = new Web3(window.ethereum);
            let result = await gameContractApi.WGTFromUSDT(usdt)
            result = Number(WEB3.utils.toWei(result, 'ether'))
            console.log(this.$store.state.wgtBalance, result)
            return this.$store.state.wgtBalance < result
        },
        //wga是否余额不足
        async wgaIsInsufficientBalance(usdt) {
            // console.log(gameContractApi)
            const WEB3 = new Web3(window.ethereum);
            let result = await gameContractApi.WGAFromUSDT(usdt)
            result = Number(WEB3.utils.toWei(result, 'ether'))
            console.log(this.$store.state.wgaBalance, result)

            return this.$store.state.wgaBalance < result
        },

        //  //usdt是否余额不足
        //  async wgaIsInsufficientBalance(amount) {
        //     console.log(helpContractApi)
        //     const result = await usdtContractApi.WGAFromUSDT(amount)
        //     // console.log(this.$store.state.wgaBalance)
        //     return this.$store.state.wgaBalance < result
        // },

        swipeChange(index) {
            console.log('change', index)
            this.currentSwipe = index
        },
        //购买财神卡
        userBuyFortuneCard() {
            console.log(this.nftInfor.id, this.payWayList[this.currentPayWay].isWgt)

            gameContractApi.buyFortuneCard(this.nftInfor.id, this.payWayList[this.currentPayWay].isWgt)
                .then(res => {
                    this.$loading.hide()
                    showToast('购买成功')
                    console.log(res)
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                    showToast('购买失败，请重新购买')
                    console.log(err)
                })
        },
        //本地匹配nft数据
        async matchNFTData(matchValue, amount) {
            const nftItem = nfts_list.filter(item => {
                return matchValue == item.id
            })
            this.nftInfor = nftItem[0]
            console.log('nftItem', nftItem)
        },
        //挂单的nft详情
        getNFTDetails() {
            nftDetails(this.tokenId)
                .then(res => {
                    console.log('二手NFT详情', res)
                    this.nftAmount = res.data.amount
                    this.matchNFTData(res.data.nft_id > 100 ? res.data.nft_id % 100 : res.data.nft_id, (Number(res.data.amount).toFixed()).toString())
                })
                .catch(err => {
                    console.log('err', err)
                })
        },

        //检查USDT合约授权状态
        async checkUSDTAllowanceState(walletAddress, contractAddress) {
            try {
                return await usdtContractApi.isAllowance(walletAddress, contractAddress)
            } catch {
                this.$loading.hide()
                showToast('检查授权状态失败，请重试');
                return
            }
        },
        //检查WGT合约授权状态
        async checkWGTAllowanceState(walletAddress, contractAddress) {
            try {
                return await wgtContractApi.isAllowance(walletAddress, contractAddress)
            } catch {
                this.$loading.hide()
                showToast('检查授权状态失败，请重试');
                return
            }

        },
        //检查WGA合约授权状态
        async checkWGAAllowanceState(walletAddress, contractAddress) {
            try {
                return await wgaContractApi.isAllowance(walletAddress, contractAddress)
            } catch {
                this.$loading.hide()
                showToast('检查授权状态失败，请重试');
                return
            }

        },
        // USDT合约授权
        async USDTContractApprove(contractAddress) {
            this.$loading.show()
            usdtContractApi.approve(contractAddress)
                .then(res => {
                    showToast('授权成功', res);
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('授权失败', err);
                    this.$loading.hide()
                })
        },
        //WGT合约授权
        async WGTContractApprove(contractAddress) {
            this.$loading.show()
            wgtContractApi.approve(contractAddress)
                .then(res => {
                    showToast('授权成功', res);
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('授权失败', err);
                    this.$loading.hide()
                })

        },
        //WGA合约授权
        async WGAContractApprove(contractAddress) {
            this.$loading.show()

            wgaContractApi.approve(contractAddress)
                .then(res => {
                    showToast('授权成功', res);
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('授权失败', err);
                    this.$loading.hide()
                })
        },

        //判断当前购买的卡片是否为财神卡
        isWealthCard(nftType) {
            let arr = [10, 11, 12, 13, 14, 15, 161, 7, 18, 19, 20, 21, 22]
            return arr.indexOf(nftType)
        },
        //判断当前用户等级能否购买该类型财神卡
        async canBuyWealthCard() {

            let result = await gameContractApi.userInfo(window.ethereum.selectedAddress)
            const contributionValue = Number(result.selfUsdt)
            console.log(contributionValue, this.nftInfor.id)
            if (this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                return true
            } else if (contributionValue >= 10000 && contributionValue < 50000) {
                if (this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 50000 && contributionValue < 100000) {
                if (this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 100000 && contributionValue < 300000) {
                if (this.nftInfor.id == 15 || this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 300000 && contributionValue < 500000) {
                if (this.nftInfor.id == 16 || this.nftInfor.id == 15 || this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 500000 && contributionValue < 1000000) {
                if (this.nftInfor.id == 17 || this.nftInfor.id == 16 || this.nftInfor.id == 15 || this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 1000000 && contributionValue < 3000000) {
                if (this.nftInfor.id == 18 || this.nftInfor.id == 17 || this.nftInfor.id == 16 || this.nftInfor.id == 15 || this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 3000000 && contributionValue < 70000000) {
                if (this.nftInfor.id == 19 || this.nftInfor.id == 20 || this.nftInfor.id == 21 || this.nftInfor.id == 18 || this.nftInfor.id == 17 || this.nftInfor.id == 16 || this.nftInfor.id == 15 || this.nftInfor.id == 14 || this.nftInfor.id == 13 || this.nftInfor.id == 10 || this.nftInfor.id == 11 || this.nftInfor.id == 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 70000000) {
                return true
            }
        },

        //获取wgt余额
        async getWGTBalance(walletAddress) {
            console.log(wgtContractApi)
            const result = await wgtContractApi.wgtAssets(walletAddress)
            return result
        },

        //获取wga余额
        async getWGABalance(walletAddress) {
            const result = await wgaContractApi.wgaAssets(walletAddress)
            return result
        },

        //获取USDT余额
        async getUSDTBalance(walletAddress) {
            const result = await usdtContractApi.usdtAssets(walletAddress)
            return result

        },

        //24h内已经购买过2张的财神卡
        async hasTwoWealthCard() {
            let timeStamp = Date.now() / 1000
            let result = await gameContractApi.userInfo(window.ethereum.selectedAddress)
            // console.log('财神卡数量', result.deposits[0].utc)
            let within24Hours = result.deposits.filter(item => { //购买时间距离现在在24h内的财神卡
                return timeStamp - Number(item.time) < 60 * 60 * 24
            })
            console.log('more24H', within24Hours)

            return within24Hours.length
        },

        //用WGT付款
        async payFromWGT() {
            this.$loading.show()
            console.log(this.nftInfor.price)
            // return
            try {
                let wgtIsInsufficientBalance;
                try {
                    wgtIsInsufficientBalance = await this.wgtIsInsufficientBalance(this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))
                    if (wgtIsInsufficientBalance) {
                        this.$loading.hide()
                        showToast('WGT余额不足')
                        return
                    }
                } catch {
                    this.$loading.hide()

                    showToast('获取余额失败，请重试')
                    return
                }
                let allowanceState = await this.checkWGTAllowanceState(window.ethereum.selectedAddress, this.goodType == 'good' ? config.game_addr : config.market_addr)
                console.log('allowanceState', allowanceState)
                const WEB3 = new Web3(window.ethereum);
                allowanceState = WEB3.utils.fromWei(allowanceState, 'ether')
                allowanceState = Number(allowanceState)
                console.log('allowanceState', allowanceState, allowanceState < (this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price))))
                if (allowanceState == 0) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "未授权，请完成授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                    return
                } else if (allowanceState < (this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "授权金额不足，请重新授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                    return
                } else {
                    console.log('授权了', allowanceState)
                    this.buyFromMall()
                }
            } catch (error) {
                this.$loading.hide()
                console.log(error)

                showToast('错误，请重试')
                return
            }
        },

        //用USDT付款
        async payFromUSDT() {
            this.$loading.show()
            const WEB3 = new Web3(window.ethereum);

            try {
                let usdtBalance;
                try {
                    usdtBalance = await this.getUSDTBalance(window.ethereum.selectedAddress)
                    console.log('usdtBalance', usdtBalance)

                } catch {
                    this.$loading.hide()

                    showToast('获取余额失败，请重试')
                    return
                }
                let nftAmount = this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price))//商品价格
                usdtBalance = WEB3.utils.fromWei(usdtBalance, 'ether')
                nftAmount = Number(nftAmount)
                usdtBalance = Number(usdtBalance)

                console.log(usdtBalance, nftAmount, usdtBalance < nftAmount)
                if (usdtBalance < nftAmount) {
                    this.$loading.hide()
                    showToast('USDT余额不足')
                    return
                }
                let allowanceState = await this.checkUSDTAllowanceState(window.ethereum.selectedAddress, this.goodType == 'good' ? config.game_addr : config.market_addr)
                console.log('allowanceState', allowanceState)
                allowanceState = WEB3.utils.fromWei(allowanceState, 'ether')
                allowanceState = Number(allowanceState)
                console.log('allowanceState', allowanceState, allowanceState < (this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price))))
                if (allowanceState == 0) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "未授权，请完成授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.USDTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                    return
                } else if (allowanceState < (this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "授权金额不足，请重新授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.USDTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                } else {
                    console.log('授权了', allowanceState)
                    this.buyFromMall()
                }
            } catch (error) {
                this.$loading.hide()
                console.log(error)
                showToast('错误，请重试')
                return
            }

        },

        //购买财神卡需要唤起支付方式弹窗询问用户购买方式 wgt or wga
        async showPayWayPopup() {
            if (!window.ethereum.selectedAddress) {
                this.$loading.hide()
                showToast('请先连接钱包')
                return
            }
            this.$loading.show()
            let wgtIsInsufficientBalance
            let wgaIsInsufficientBalance
            let wgtBalance
            let wgaBalance
            try {
                // 判断是否余额不足
                wgtIsInsufficientBalance = await this.wgtIsInsufficientBalance(this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))
                wgaIsInsufficientBalance = await this.wgaIsInsufficientBalance(this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))
            } catch (error) {
                this.$loading.hide()
                console.log(error)
                showToast('错误，请重试')
                return
            }
            try {
                // wgt和wga余额
                wgtBalance = await this.getWGTBalance(window.ethereum.selectedAddress)
                wgaBalance = await this.getWGABalance(window.ethereum.selectedAddress)
            } catch (error) {
                this.$loading.hide()
                console.log(error)
                showToast('错误，请重试')
                return

            }
            if (wgtIsInsufficientBalance && !wgaIsInsufficientBalance) {
                this.currentPayWay = 1
            } else if (wgtIsInsufficientBalance && wgaIsInsufficientBalance) {
                this.currentPayWay = null
                this.$loading.hide()
                showToast('购买NFT所需的WGT或WGT-A不足')
                return
            }
            this.payWayList[0] = { name: 'WGT支付', amount: Number(this.getFilterAmount(wgtBalance)).toFixed(4), isWgt: 0, isInsufficientBalance: wgtIsInsufficientBalance }
            this.payWayList[1] = { name: 'WGT-A支付', amount: Number(this.getFilterAmount(wgaBalance)).toFixed(4), isWgt: 1, isInsufficientBalance: wgaIsInsufficientBalance }
            this.$loading.hide()
            this.showPayWay = true
        },

        //点击支付弹窗按钮购买财神卡
        async handleConfirmPay() {
            console.log(Number(this.nftInfor.price).toFixed(0))
            console.log('财神卡？', this.isWealthCard(this.nftInfor.id)) //当前购买的卡片是否为财神卡
            this.showPayWay = false
            this.$loading.show()
            const WEB3 = new Web3(window.ethereum);
            let currentPayWayAllowanState; //当前支付方式合约授权状态
            try {
                if (this.currentPayWay == 0) {
                    console.log('wgt支付')
                    currentPayWayAllowanState = await this.checkWGTAllowanceState(window.ethereum.selectedAddress, this.goodType == 'good' ? config.game_addr : config.market_addr)
                } else {
                    currentPayWayAllowanState = await this.checkWGAAllowanceState(window.ethereum.selectedAddress, this.goodType == 'good' ? config.game_addr : config.market_addr)
                    console.log('wga支付')
                }

                currentPayWayAllowanState = WEB3.utils.fromWei(currentPayWayAllowanState, 'ether')
                currentPayWayAllowanState = Number(currentPayWayAllowanState)
                console.log('授权状态: ', this.currentPayWay, currentPayWayAllowanState)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            //未授权
            if (currentPayWayAllowanState == 0) {
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        if (this.currentPayWay == 0) {
                            this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        } else {
                            this.WGAContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        }
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            } else if (currentPayWayAllowanState < (this.goodType == 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))) { //授权金额不足
                this.$loading.hide()
                if (this.currentPayWay == 0) {
                    this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                } else {
                    this.WGAContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                }
                return
            }
            this.userBuyFortuneCard()
        },

        //判断当前WGT价格是否有变化
        async haveChangeOfWGT() {
            if (this.isFetchingPoint) {
                showToast('正在计算WGT价格，请稍候')
                return
            }
            try {
                this.isFetchingPoint = true
                let WGTPoint = await gameContractApi.WGTFromUSDT(100)
                WGTPoint = Number(WGTPoint) / 100
                console.log('WGTPoint', WGTPoint)
                if (this.$store.state.WGTPoint !== WGTPoint) {
                    this.$store.commit('updataWGTPoint', WGTPoint)
                    showToast('WGT价格发生变化，请重新购买')
                    this.isFetchingPoint = false
                    console.log('this.$store.state.WGTPoint', this.$store.state.WGTPoint)
                    return true
                } else {
                    this.isFetchingPoint = false
                    return false
                }
            } catch {
                showToast('获取价格失败')
                this.isFetchingPoint = false
                return
            }
        },

        //点击购买按钮进行购买
        async handlePay() {
            this.$loading.show()
            console.log(this.nftInfor)
            //购买二手nft
            if (this.goodType == 'market') {
                const WEB3 = new Web3(window.ethereum);
                console.log('购买二手nft')
                let marketNftPrice = Math.ceil(Number((this.nftAmount) * (this.$store.state.WGTPoint * 1.03)).toFixed(4))
                marketNftPrice = WEB3.utils.toWei(marketNftPrice, 'ether')
                if (this.$store.state.wgtBalance < marketNftPrice) {
                    showToast('WGT余额不足')
                    this.$loading.hide()
                    return
                }

                let allowanceState = await this.checkWGTAllowanceState(window.ethereum.selectedAddress, this.goodType == 'good' ? config.game_addr : config.market_addr)
                console.log('allowanceState', allowanceState)

                console.log(WEB3.utils.fromWei(this.$store.state.wgtBalance, 'ether'), marketNftPrice, this.$store.state.wgtBalance < marketNftPrice)
                allowanceState = WEB3.utils.fromWei(allowanceState, 'ether')
                allowanceState = Number(allowanceState)
                console.log('allowanceState', allowanceState, allowanceState < Number(this.nftAmount))
                if (allowanceState == 0) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "未授权，请完成授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                    return
                } else if (allowanceState < Number(this.$store.state.wgtBalance)) {
                    this.$loading.hide()
                    this.$confirm.show({
                        title: "提示",
                        content: "授权金额不足，请重新授权",
                        showCancelButton: false,
                        onConfirm: () => {
                            this.WGTContractApprove(this.goodType == 'good' ? config.game_addr : config.market_addr)
                        },
                    })
                    return
                }

                this.buyFromMarket()
                return
            }

            //购买一手nft
            // if (this.nftInfor.circulation == 0) {
            //     this.$loading.hide()
            //     showToast('该NFT暂未开放购买')
            //     return
            // }
            //如果购买卡片币种是WGT，则需要获取当前WGT和U的最新换算价格
            if (this.nftInfor.card_type == 'fortune_card' || this.nftInfor.card_type == 'expedition_order' || this.nftInfor.card_type == 'tactics_props') {
                if (await this.haveChangeOfWGT()) {
                    return
                }
            }
            //财神卡用wgt或者wga 唤起支付类型弹窗
            if (this.nftInfor.card_type == 'fortune_card') {
                try {
                    let wealthAcount = await this.hasTwoWealthCard()//24小时内购买过2张财神卡则不可在购买
                    console.log('财神卡数量', wealthAcount)
                    if (wealthAcount >= 2) {
                        this.$loading.hide()
                        showToast('过去24小时内已经购买过2张财神卡，不可继续购买')
                        return
                    }
                } catch (e) {
                    this.$loading.hide()
                    console.log(e)
                    showToast('错误，请重试')
                    return
                }
                try {
                    let canBuyWealthCard = await this.canBuyWealthCard()//24小时内购买过2张财神卡则不可在购买

                    if (!canBuyWealthCard) {
                        this.$loading.hide()
                        showToast('当前等级不可购买财神卡')
                        return
                    }
                } catch (e) {
                    this.$loading.hide()
                    console.log(e)
                    showToast('错误，请重试')
                    return
                }

                this.showPayWayPopup()
                return
            }
            // 直接使用购买卡片类型所需的币种进行购买
            // 合成道具卡、角色卡只能用USDT购买 
            // 战法道具卡、出征令牌只能wgt
            if (this.nftInfor.card_type == 'nft_role' || this.nftInfor.card_type == 'synthesis_props') {
                this.payFromUSDT()
            } else {
                this.payFromWGT()
            }
        },
        //判断当前nft是否还有存量 true有存量，false无存量
        async nftHaveStockpiles(typeId) {
            console.log(await nftContractApi.nftTotalSet(typeId), await nftContractApi.nftTotalCount(typeId), await nftContractApi.nftDaySet(typeId), await nftContractApi.nftDayCount(typeId))
            return ((await nftContractApi.nftTotalSet(typeId) > await nftContractApi.nftTotalCount(typeId)) && await nftContractApi.nftDaySet(typeId) > (await nftContractApi.nftDayCount(typeId)))
        },
        //购买一手nft函数
        async buyFromMall() {
            console.log(this.nftInfor.id)
            // let result = await gameContractApi.userInfo(window.ethereum.selectedAddress)
            // console.log(await nftContractApi.nftDaySet(this.nftInfor.id), gameContractApi.WGAFromUSDT
            // )
            // this.$loading.hide()
            // return
            //判断当前nft是否有库存
            this.$loading.show()
            try {
                let nftHaveStockpiles = await this.nftHaveStockpiles(this.nftInfor.id)
                console.log(nftHaveStockpiles)
                if (!nftHaveStockpiles) {
                    this.$loading.hide()
                    showToast(`${this.nftInfor.name}已售罄`)
                    return
                }
            } catch (err) {
                this.$loading.hide()
                console.log(err)
                showToast(`获取${this.nftInfor.name}库存失败，请重试。`)
                return
            }
            gameContractApi.buy(this.nftInfor.id)
                .then((res) => {
                    this.$loading.hide()
                    showToast('购买成功')
                    console.log(res)

                })
                .catch((err) => {
                    this.$loading.hide()
                    showToast('购买失败，请重新购买')

                    console.log(err)
                })
        },
        //购买二手nft函数
        buyFromMarket() {
            console.log(this.tokenId, Math.ceil(Number(this.nftAmount) * this.$store.state.WGTPoint))
            // return
            marketContractApi.dealNFT(this.tokenId, (Math.ceil(Number(this.nftAmount) * this.$store.state.WGTPoint)).toString())
                .then((res) => {
                    console.log(res)
                    this.updataMarketNFTApi()
                    this.$loading.hide()
                })
                .catch((err) => {
                    this.$loading.hide()
                    showToast('购买失败，请重新购买')
                    console.log(err)
                })
        },
        updataMarketNFTApi() {
            buyMarketNFTApi(this.tokenId)
                .then(res => {
                    this.$loading.hide()
                    showToast('购买成功')
                    console.log(res)
                    this.$router.push({
                        path: '/personal'
                    })
                })
                .catch((err) => {
                    this.$loading.hide()
                    showToast('购买失败，请重新购买')
                    console.log(err)
                })
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

.border-module {
    @apply w-11/12 border-b border-card-introduce py-10;
}

.show-icon {
    @apply font-extrabold transition ease-in-out duration-200;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}
</style>