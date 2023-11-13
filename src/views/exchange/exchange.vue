<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">新旧版本货币兑换</div>
            </div>
        </div>
        <div class="text-white">


            <div
                class="text-card-content bg-cover-content flex w-11/12 mr-auto ml-auto pb-6 flex-col justify-start items-center pt-6">
                <!-- <div class="leading-6 font-helvetica-neue-bold text-base py-6">兑换</div> -->
                <div class="w-11/12 flex justify-center items-center mb-8">
                    <div class="px-5 py-2 rounded" v-for="(item, index) in currencyList" :key="index"
                        :class="currentCurrency == index ? 'bg-bottom-content' : ''" @click="currentCurrency = index">
                        {{ item.title }}
                    </div>
                </div>
                <div v-show="currentCurrency == 0" class="w-full flex flex-col items-center">
                    <div class="w-11/12 text-sm mb-1">
                        旧版本WGT余额
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" disabled v-model="preWGTAmount">
                    </div>
                    <div class="w-11/12 text-sm mb-1 flex justify-between items-baseline">
                        <div>
                            兑换WGT-A金额
                        </div>
                        <div class="underline text-xs" @click="allExchange">
                            全部
                        </div>
                    </div>
                    <div
                        class="mb-12 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="exchangeWGTAmount"
                            placeholder="请输入兑换金额">
                    </div>
                </div>

                <div v-show="currentCurrency == 1" class="w-full flex flex-col items-center">
                    <div class="w-11/12 text-sm mb-1">
                        旧版本WGA余额
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" disabled v-model="preWGAAmount"
                            placeholder="99.000">
                    </div>

                    <div class="w-11/12 text-sm mb-1 flex justify-between items-baseline">
                        <div>
                            兑换WGT-A金额
                        </div>
                        <div class="underline text-xs" @click="allExchange">
                            全部
                        </div>
                    </div>
                    <div
                        class="mb-12 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="exchangeWGAAmount"
                            placeholder="请输入兑换金额">
                    </div>
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
import wgtContractApi from '@/request/ether_request/wgt'
import wgaContractApi from '@/request/ether_request/wga'
import marketContractApi from '@/request/ether_request/market'
import gameContractApi from '@/request/ether_request/game'

import { showToast } from 'vant'
import { config } from '@/const/config'
import Web3 from "web3";
export default {
    data() {
        return {
            wgtAmount: null,
            wgaAmount: null,
            preWGTAmount: null,
            preWGAAmount: null,
            exchangeWGTAmount: null,
            exchangeWGAAmount: null,

            currencyList: [{ title: 'WGT兑换' }, { title: 'WGA兑换' }],
            currentCurrency: 0
        }
    },
    mounted() {
        this.getUserTotalAssets()
    },
    methods: {
        async getUserTotalAssets() {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            // const wgt = await wgtContractApi.wgtAssets(window.ethereum.selectedAddress)
            // const wga = await wgaContractApi.wgaAssets(window.ethereum.selectedAddress)
            const pre_wgt = await wgtContractApi.preWGTBalance(window.ethereum.selectedAddress)
            const pre_wga = await wgaContractApi.preWGABalance(window.ethereum.selectedAddress)

            // this.wgtAmount = WEB3.utils.fromWei(wgt, 'ether')
            // this.wgaAmount = WEB3.utils.fromWei(wga, 'ether')
            this.preWGTAmount = WEB3.utils.fromWei(pre_wgt, 'ether')
            this.preWGAAmount = WEB3.utils.fromWei(pre_wga, 'ether')
            this.preWGTAmount = Number(this.preWGTAmount).toFixed(4)
            this.preWGAAmount = Number(this.preWGAAmount).toFixed(4)

            // console.log(WEB3.utils.fromWei(wgt + wga, 'ether'))
            console.log(pre_wgt, pre_wga, this.preWGTAmount, this.preWGAAmount)
        },
        //点击全部按钮
        allExchange() {
            this.currentCurrency == 0 ? this.exchangeWGTAmount = this.preWGTAmount : this.exchangeWGAAmount = this.preWGAAmount
        },
        toExchange() {
            // const WEB3 = new Web3(window.ethereum);
            // console.log('this.exchangeAmount', this.exchangeAmount)
            // const exchangeAmount = WEB3.utils.toWei(this.exchangeAmount, 'ether')
            // console.log(exchangeAmount)
            // marketContractApi.exchange(this.exchangeAmount)
            //     .then(res => {
            //         console.log('res', res)
            //         showToast('兑换成功')
            //         this.$loading.hide()
            //         this.getUserTotalAssets()
            //     })
            //     .catch(err => {
            //         console.log('err', err)
            //         showToast('兑换失败')
            //         this.$loading.hide()
            //     })
            if (this.currentCurrency == 0) {
                this.preWGTToWGA()
            } else {

                this.preWGAToWGA()
            }
        },
        preWGTToWGA() {
            gameContractApi.wgt2wga(this.exchangeWGTAmount)
                .then(res => {
                    console.log('res', res)
                    showToast('兑换成功')
                    this.$loading.hide()
                    this.getUserTotalAssets()
                })
                .catch(err => {
                    console.log('err', err)
                    showToast('兑换失败')
                    this.$loading.hide()
                })
        },
        preWGAToWGA() {
            gameContractApi.wga2wga(this.exchangeWGAAmount)
                .then(res => {
                    console.log('res', res)
                    showToast('兑换成功')
                    this.$loading.hide()
                    this.getUserTotalAssets()
                })
                .catch(err => {
                    console.log('err', err)
                    showToast('兑换失败')
                    this.$loading.hide()
                })
        },
        async handleExchange() {
            if (this.currentCurrency == 0) {
                if (!this.exchangeWGTAmount) {
                    showToast('请输入兑换金额')
                    return
                }
            } else {
                if (!this.exchangeWGAAmount) {
                    showToast('请输入兑换金额')
                    return
                }
            }

            this.$loading.show()
            const hasAllowance = await this.checkAllowanceState()
            console.log(hasAllowance)
            if (hasAllowance == 0) {
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "未授权，请完成授权",
                    showCancelButton: false,
                    onConfirm: () => {
                        this.contractApprove()
                    },
                })
            } else {
                this.toExchange()
            }
        },
        //旧版wgt对game授权
        preWGTApproveGAME() {
            wgtContractApi.approveGame(config.game_addr)
                .then(res => {
                    showToast('授权成功', res);
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('授权失败', err);
                    this.$loading.hide()
                })
        },
        //旧版wga对game授权
        preWGAApproveGAME() {
            wgaContractApi.approveGame(config.game_addr).then(res => {
                showToast('授权成功', res);
                this.$loading.hide()
            })
                .catch(err => {
                    showToast('授权失败', err);
                    this.$loading.hide()
                })
        },
        //合约授权
        async contractApprove() {
            this.$loading.show()
            if (this.currentCurrency == 0) {
                this.preWGTApproveGAME()
            } else if (this.currentCurrency == 1) {
                this.preWGAApproveGAME()
            }
        },
        //检查wga/wgt合约授权状态
        async checkAllowanceState() {
            return this.currentCurrency == 0 ? await wgtContractApi.isAllowanceGame(window.ethereum.selectedAddress, config.game_addr) : await wgaContractApi.isAllowanceGame(window.ethereum.selectedAddress, config.game_addr)
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