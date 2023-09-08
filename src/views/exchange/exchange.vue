<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">WGA兑换WGT</div>
            </div>
        </div>
        <div class="text-white">


            <div
                class="text-card-content bg-cover-content flex w-11/12 mr-auto ml-auto pb-6 flex-col justify-start items-center">
                <div class="leading-6 font-helvetica-neue-bold text-base py-6">兑换</div>

                <div class="w-11/12 text-sm mb-1">
                    WGA余额
                </div>
                <div
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="text" disabled v-model="wgaAmount"
                        placeholder="99.000">
                </div>
                <div class="w-11/12 text-sm mb-1">
                    WGT余额
                </div>
                <div
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="text" disabled v-model="wgtAmount">
                </div>
                <div class="w-11/12 text-sm mb-1 flex justify-between items-baseline">
                    <div>
                        兑换金额
                    </div>
                    <div class="underline text-xs" @click="allExchange">
                        全部
                    </div>
                </div>
                <div
                    class="mb-12 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="text" v-model="exchangeAmount"
                        placeholder="请输入兑换金额">
                </div>
                <div class="w-11/12 buy-button bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded"
                    @click="handleExchange">
                    确认兑换
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { isAllowance, approve, wgtAssets, wgaAssets } from '@/request/ether_request/wgt'
import { exchange } from '@/request/ether_request/market'
import { showToast } from 'vant'
import { config } from '@/const/config'
import Web3 from "web3";
export default {
    data() {
        return {
            wgtAmount: null,
            wgaAmount: null,
            exchangeAmount: null
        }
    },
    mounted() {
        this.getUserTotalAssets()
    },
    methods: {
        async getUserTotalAssets() {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            const wgt = await wgtAssets(window.ethereum.selectedAddress)
            const wga = await wgaAssets(window.ethereum.selectedAddress)
            this.wgtAmount = WEB3.utils.fromWei(wgt, 'ether')
            this.wgaAmount = WEB3.utils.fromWei(wga, 'ether')
            console.log(WEB3.utils.fromWei(wgt + wga, 'ether'))
        },
        //点击全部按钮
        allExchange() {
            this.exchangeAmount = this.wgaAmount
        },
        toExchange() {
            // const WEB3 = new Web3(window.ethereum);
            // console.log('this.exchangeAmount', this.exchangeAmount)
            // const exchangeAmount = WEB3.utils.toWei(this.exchangeAmount, 'ether')
            // console.log(exchangeAmount)
            exchange(this.exchangeAmount)
                .then(res => {
                    console.log('res', res)
                    showToast('兑换成功')
                    this.$loading.hide()
                })
                .catch(err => {
                    console.log('err', err)
                    showToast('兑换失败')
                    this.$loading.hide()
                })
        },
        async handleExchange() {
            if (!this.exchangeAmount) {
                showToast('请输入兑换金额')
                return
            }
            this.$loading.show()
            const hasAllowance = await this.checkAllowanceState()
            if (hasAllowance == 0) {
                const approveResult = await this.contractApprove()
                console.log('approveResult', approveResult)
                if (approveResult.status === 1) {
                    this.toExchange()
                } else {
                    showToast('授权失败，请重新授权')
                }
            } else {
                this.toExchange()
            }
        },
        //合约授权
        async contractApprove() {
            const result = await approve(config.market_addr)
            return result
        },
        //检查合约授权状态
        async checkAllowanceState() {
            return await isAllowance(ethereum.selectedAddress, config.market_addr)
        },
        cancelPay() {
            window.history.back();
        }
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>