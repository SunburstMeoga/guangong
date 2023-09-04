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
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">兑换</div>

                <div class="w-11/12 text-sm mb-1">
                    WGA余额
                </div>
                <div
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="text" v-model="name" placeholder="99.000">
                </div>
                <div class="w-11/12 text-sm mb-1">
                    兑换金额
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="text" v-model="map_address" placeholder="请输入兑换金额">
                </div>
                <div class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded"
                    @click="handleExchange">
                    确认兑换
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { isAllowance, approve, exchange } from '@/request/ether_request'
import { showToast } from 'vant'
import { config } from '@/const/config'
export default {
    data() {
        return {
            wgaAmount: null
        }
    },
    methods: {
        toExchange() {
            exchange(this.wgaAmount)
                .then(res => {
                    console.log('兑换成功', res)
                })
                .catch(err => {
                    console.log('err', er)
                })
        },
        async handleExchange() {
            if (!wgaAmount) {
                showToast('请输入WGA金额')
                return
            }
            const hasAllowance = await this.checkAllowanceState()
            if (hasAllowance == 0) {
                const approveResult = await this.contractApprove()
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
            const result = await approve(config.wga_addr)
            return result
        },
        //检查合约授权状态
        async checkAllowanceState() {
            return await isAllowance(ethereum.selectedAddress, config.wga_addr)
        },
        cancelPay() {
            window.history.back();
        }
    }
}
</script>

<style></style>