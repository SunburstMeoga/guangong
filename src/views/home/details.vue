<template>
    <div>
        <div>
            <div class="pt-24">
                <div
                    class="ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-2">
                    <div class="w-80 h-80">
                        <van-swipe class="my-swipe" :autoplay="0" indicator-color="#E20F2A" :show-indicators="false"
                            @change="swipeChange">
                            <van-swipe-item>
                                <div class="w-80 h-80">
                                    <img :src="nftInfor.imageUrl" alt="">
                                </div>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center mb-10">
                    <div class="w-11/12 text-3xl border-module text-card-content font-medium">
                        {{ nftInfor.name }}
                    </div>
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
                                <div class="text-base text-card-content">{{ nftInfor.loss_period }}</div>

                            </div>
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showIssue = !showIssue">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">發行方</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showIssue ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8 flex justify-start items-center h-14" v-show="showIssue">
                            <div class="rounded-full overflow-hidden w-10 h-10 bg-theme-primary">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="ml-2 flex flex-col justify-between">
                                <div class="text-white font-medium">由 世界關公寶WGT 发行</div>
                                <div class="text-icon-gray">Oct 28, 2022 at 12:34am</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button text-primary-word text-lg button-word" @click="handlePay">
                        購買 {{ nftInfor.price }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem, showToast } from 'vant';
import nfts_list from '@/nft_datas/nfts_list'
import { config } from '@/const/config'
import { accountBalance } from '@/request/ether_request'
import { buy } from '@/request/ether_request/game'
import { preAddress } from '@/request/ether_request/popularized'
import { isAllowance, approve } from '@/request/ether_request/wgt'
import { dealNFT } from '@/request/ether_request/market'
import { nftDetails } from '@/request/api_request'
import { ZeroAddress } from "ethers"
import { filterAmount } from '@/utils/filterValue';


export default {
    components: { [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
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
            nftAmount: ''
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
        swipeChange(index) {
            console.log('change', index)
            this.currentSwipe = index
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
                    this.matchNFTData(res.data.id, res.data.amount)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //合约授权
        async contractApprove() {
            const result = await approve(config.game_addr)
            return result
        },
        //检查合约授权状态
        async checkAllowanceState() {
            return await isAllowance(window.ethereum.selectedAddress, config.game_addr)
        },
        //点击购买按钮
        async handlePay() {
            this.$loading.show()
            const preAddressArr = await preAddress(window.ethereum.selectedAddress)
            console.log('preAddress', preAddressArr)
            if (preAddressArr[0] === ZeroAddress) {
                this.$loading.hide()
                showToast('当前地址暂无上级，请前往社区寻找上级推荐人')
                return
            }
            const hasAllowance = await this.checkAllowanceState(window.ethereum.selectedAddress, config.game_addr)
            console.log('hasAllowance', hasAllowance)
            if (hasAllowance == 0) {
                const approveResult = await this.contractApprove()
                console.log('approveResult', approveResult)
                if (approveResult.status == 1) {
                    if (this.goodType === 'good') {
                        this.payFromMall()
                    } else if (this.goodType === 'market') {
                        this.payFromMarket()
                    }

                } else {
                    this.$loading.hide()
                    showToast('授权失败，请重新授权')
                }
            } else {
                if (this.goodType === 'good') {
                    this.payFromMall()
                } else if (this.goodType === 'market') {
                    this.payFromMarket()
                }
            }
        },
        payFromMall() {
            console.log(this.nftInfor.id)
            // return
            buy(this.nftInfor.id)
                .then((res) => {
                    this.$loading.hide()
                    showToast('购买成功')
                    console.log(res)
                })
                .catch((err) => {
                    this.$loading.hide()
                    showToast('购买失败，请重新购买')
                    // this.$router.push({
                    //     path: '/personal'
                    // })
                    console.log(err)
                })
        },
        payFromMarket() {
            dealNFT(this.tokenId, this.nftAmount)
                .then((res) => {
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