<template>
    <div>
        <div>
            <div class="pt-24">
                <div
                    class="relative ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-4">
                    <div class="w-80 h-80">
                        <img :src="nftInfor.imageUrl" alt="">
                    </div>
                    <div
                        class="absolute top-0 left-0 rounded-br-xl inline-block px-2 py-1 bg-success-undertone text-sm text-success-word">
                        {{ getCardType(nftInfor.card_type) }}
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center mb-10">
                    <div class="w-11/12 text-3xl border-module text-card-content font-medium">
                        {{ nftInfor.name }}
                    </div>
                    <!-- nft角色卡信息 -->
                    <div class="border-module w-11/12 text-card-content font-light"
                        v-if="nftInfor.card_type === 'nft_role'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">詳細資料</div>
                        </div>
                        <div class="mt-8" v-show="showDetails">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">階段</div>
                                <div class="text-base text-card-content">{{ nftInfor.stage }}</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">發行量</div>
                                <div class="text-base text-card-content">不限量</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征令牌</div>
                                <div class="text-base text-card-content">{{ nftInfor.outbound_tokens }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">令牌價（等值WGT）</div>
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
                        v-if="nftInfor.card_type === 'tactics_props'">
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
                                <div class="mb-2 text-xs text-icon-gray">发行量</div>
                                <div class="text-base text-card-content">{{ nftInfor.number_of_issues }}</div>
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
                            <div class="text-base ">可用于以下NFT卡片出征</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <!-- <div class="mb-2 text-xs text-icon-gray">可用于以下NFT卡片出征</div> -->
                                <div class="text-2xl  text-card-content">{{ nftInfor.can_be_used.join("，") }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- 财神卡介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'fortune_card'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">{{ nftInfor.name }}财神卡详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">阶段</div>
                                <div class="text-base text-card-content">{{ nftInfor.level }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">角色价值 等值 WGT）U</div>
                                <div class="text-base text-card-content">{{ nftInfor.circulation }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">财神奖励 等值 WGT）U</div>
                                <div class="text-base text-card-content">{{ nftInfor.award }}</div>
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
                                <div class="text-icon-gray">发行于 2023.09.08</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button flex justify-center items-baseline text-primary-word text-lg button-word"
                        @click="handlePay">
                        <span>
                            购买 {{ nftInfor.price }}U
                        </span>
                        <!-- <span class="text-sm font-light pl-2">
                            (WGT余额:{{ getFilterAmount($store.state.wgtBalance) }})
                        </span> -->
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
                    :class="currentPayWay === index ? 'buy-button text-white' : ''">
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
import { nftDetails, buyMarketNFTApi } from '@/request/api_request'
import { filterAmount } from '@/utils/filterValue';
import helpContractApi from '@/request/ether_request/help'
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
            payWayList: []
        }
    },
    mounted() {
        console.log('this.$route', this.$route)
        this.goodType = this.$route.name
        if (this.$route.name === 'good') {
            this.matchNFTData(parseInt(this.$route.params.id))
        } else if (this.$route.name === 'market') {
            this.tokenId = this.$route.params.tokenId
            this.getNFTDetails()
        }
    },
    methods: {
        accountBalance, filterAmount,
        clickPayWay(item, index) {
            if (item.isInsufficientBalance) {
                showToast(`${item.name}余额不足`)
                return
            }
            this.currentPayWay = index
        },
        getFilterAmount(amount) {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            const reslut = WEB3.utils.fromWei(amount, 'ether')
            return reslut
        },
        //卡类型
        getCardType(value) {
            switch (value) {
                case 'nft_role': return 'NFT角色卡'
                case 'tactics_props': return '战法道具卡'
                case 'expedition_order': return '出征令牌'
                case 'synthesis_props': return '合成道具卡'
                case 'fortune_card': return '财神卡'
            }
        },
        async wgtIsInsufficientBalance(usdt) {
            console.log(helpContractApi)
            const result = await helpContractApi.WGTFromUSDT(usdt)
            return this.$store.state.wgtBalance < result
        },
        async wgaIsInsufficientBalance(usdt) {
            console.log(helpContractApi)
            const result = await helpContractApi.WGAFromUSDT(usdt)
            return this.$store.state.wgtBalance < result
        },
        swipeChange(index) {
            console.log('change', index)
            this.currentSwipe = index
        },
        //购买财神卡
        userBuyFortuneCard() {
            console.log(this.canBuyWealthCard())
            if (!this.canBuyWealthCard()) {
                showToast(`当前等级不可购买${this.nftInfor.name}`)
                this.$loading.hide()
                return
            }
            gameContractApi.buyFortuneCard(this.nftInfor.id)
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
        matchNFTData(matchValue, amount) {
            const nftItem = nfts_list.filter(item => {
                return matchValue === item.id
            })
            this.nftInfor = nftItem[0]
            if (this.$route.name === 'market') {
                this.nftInfor.price = this.filterAmount(amount)
            }
            console.log('nftItem', nftItem)
        },
        //挂单的nft详情
        getNFTDetails() {
            nftDetails(this.tokenId)
                .then(res => {
                    console.log('资产详情', res)
                    this.nftAmount = res.data.amount
                    this.matchNFTData(res.data.nft_id > 100 ? res.data.nft_id % 100 : res.data.nft_id, res.data.amount)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //WGT合约授权
        async WGTContractApprove(contractAddress) {
            const result = await wgtContractApi.approve(contractAddress)
            return result
        },
        //WGA合约授权
        async WGAContractApprove(contractAddress) {
            const result = await wgaContractApi.approve(contractAddress)
            return result
        },
        //检查WGT合约授权状态
        async checkWGTAllowanceState(walletAddress, contractAddress) {
            return await wgtContractApi.isAllowance(walletAddress, contractAddress)
        },
        //检查WGA合约授权状态
        async checkWGAAllowanceState(walletAddress, contractAddress) {
            return await wgaContractApi.isAllowance(walletAddress, contractAddress)
        },
        //判断当前购买的卡片是否为财神卡
        isWealthCard(nftType) {
            let arr = [10, 11, 12, 13, 14, 15, 161, 7, 18, 19, 20, 21, 22]
            return arr.indexOf(nftType)
        },
        //判断当前用户等级能否购买该类型财神卡
        canBuyWealthCard() {
            const contributionValue = this.$store.state.userInfor.personal
            if (contributionValue === 0 && contributionValue < 10000) {
                if (this.nftInfor.id === 10 || this.nftInfor.id === 11 || this.nftInfor.id === 12) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 10000 && contributionValue < 50000) {
                if (this.nftInfor.id === 13) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 50000 && contributionValue < 100000) {
                if (this.nftInfor.id === 14) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 100000 && contributionValue < 300000) {
                if (this.nftInfor.id === 15) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 300000 && contributionValue < 500000) {
                if (this.nftInfor.id === 16) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 500000 && contributionValue < 1000000) {
                if (this.nftInfor.id === 17) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 1000000 && contributionValue < 3000000) {
                if (this.nftInfor.id === 18) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 3000000 && contributionValue < 70000000) {
                if (this.nftInfor.id === 19 || this.nftInfor.id === 20 || this.nftInfor.id === 21) {
                    return true
                } else {
                    return false
                }
            } else if (contributionValue >= 70000000) {
                if (this.nftInfor.id === 22) {
                    return true
                } else {
                    return false
                }
            }
        },

        //获取wgt余额
        async getWGTBalance(walletAddress) {
            console.log(wgtContractApi)
            const result = await wgtContractApi.wgtAssets(walletAddress)
            // this.payWayList[0] = { name: 'WGT支付', amount: result }
            return result
        },

        //获取wga余额
        async getWGABalance(walletAddress) {
            const result = await wgaContractApi.wgaAssets(walletAddress)
            // this.payWayList[0] = { name: 'WGA支付', amount: result }
            return result
        },

        //唤起支付方式弹窗
        async showPayWayPopup() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.$loading.show()
            const wgtIsInsufficientBalance = await this.wgtIsInsufficientBalance(this.goodType === 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))
            const wgaIsInsufficientBalance = await this.wgaIsInsufficientBalance(this.goodType === 'good' ? this.nftInfor.price : Math.ceil(Number(this.nftInfor.price)))
            const wgtBalance = await this.getWGTBalance(window.ethereum.selectedAddress)
            const wgaBalance = await this.getWGABalance(window.ethereum.selectedAddress)
            if (wgtIsInsufficientBalance && !wgaIsInsufficientBalance) {
                this.currentPayWay = 1
            } else if (wgtIsInsufficientBalance && wgaIsInsufficientBalance) {
                this.$loading.hide()
                showToast('购买NFT所需的WGT或WGA不足')
                return
            }
            this.payWayList[0] = { name: 'WGT支付', amount: this.getFilterAmount(wgtBalance), isWgt: true, isInsufficientBalance: wgtIsInsufficientBalance }
            this.payWayList[1] = { name: 'WGA支付', amount: this.getFilterAmount(wgaBalance), isWgt: false, isInsufficientBalance: wgaIsInsufficientBalance }
            this.$loading.hide()
            this.showPayWay = true
        },

        //点击支付弹窗确认支付按钮
        async handleConfirmPay() {
            console.log(Number(this.nftInfor.price).toFixed(0))
            console.log('财神卡？', this.isWealthCard(this.nftInfor.id)) //当前购买的卡片是否为财神卡
            this.showPayWay = false
            this.$loading.show()
            let currentPayWayAllowanState; //当前支付方式合约授权状态
            // const hasWGTAllowance = await this.checkWGTAllowanceState(window.ethereum.selectedAddress, this.goodType === 'good' ? config.game_addr : config.market_addr)
            // const hasWGAAllowance = await this.checkWGAAllowanceState(window.ethereum.selectedAddress, this.goodType === 'good' ? config.game_addr : config.market_addr)
            if (this.currentPayWay === 0) {
                currentPayWayAllowanState = await this.checkWGTAllowanceState(window.ethereum.selectedAddress, this.goodType === 'good' ? config.game_addr : config.market_addr)
            } else {
                currentPayWayAllowanState = await this.checkWGAAllowanceState(window.ethereum.selectedAddress, this.goodType === 'good' ? config.game_addr : config.market_addr)
            }

            if (currentPayWayAllowanState == 0) {
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        if (this.currentPayWay === 0) {
                            this.WGTContractApprove(this.goodType === 'good' ? config.game_addr : config.market_addr)
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
                        } else {
                            this.WGAContractApprove(this.goodType === 'good' ? config.game_addr : config.market_addr)
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
                        }
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            }

            if (this.isWealthCard(this.nftInfor.id) === -1) {
                if (this.goodType === 'good') {
                    this.payFromMall()
                } else if (this.goodType === 'market') {
                    this.payFromMarket()
                }
            } else {
                this.userBuyFortuneCard()
            }
        },

        //点击购买按钮并唤起支付方式弹窗
        async handlePay() {
            this.showPayWayPopup()
        },
        payFromMall() {
            console.log(this.nftInfor.id)
            // return
            gameContractApi.buy(this.nftInfor.id, this.payWayList[this.currentPayWay].isWgt)
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
        payFromMarket() {
            console.log(this.tokenId, Math.ceil(Number(this.nftAmount)))
            // return
            marketContractApi.dealNFT(this.tokenId, (Math.ceil(Number(this.nftAmount))).toString())
                .then((res) => {
                    this.updataMarketNFTApi()
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