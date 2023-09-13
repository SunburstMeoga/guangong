<template>
    <div>
        <div>
            <div class="py-8 top-0 sticky flex justify-center z-10 bg-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">我的团队</div>
                </div>
            </div>
            <div>

            </div>
            <div class="pt-4 w-full flex flex-col justify-start items-center text-white" v-if="!hasNoChild">
                <div class="text-white w-11/12 mr-auto ml-auto flex justify-between items-center py-2">
                    <div class="font-medium text-xl">我的下级</div>
                </div>
                <div v-for="(item, index) in childAddressList" :key="index"
                    class="mb-3 w-11/12 bg-bottom-content rounded p-2">
                    <div class="flex justify-between items-center">
                        <div>下级等级</div>
                        <div class="text-red-600">{{ getStarWord(item.star) }}</div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>下级地址</div>
                        <div>{{ filterAddress(item.address) }}</div>
                    </div>
                </div>
            </div>

            <div class="pt-4 w-full flex flex-col justify-start items-center text-white" v-if="!hasNoChild">
                <div class="text-white w-11/12 mr-auto ml-auto flex justify-between items-center py-2">
                    <div class="font-medium text-xl">属下业绩</div>
                </div>
                <div class="mb-3 w-11/12 bg-bottom-content rounded p-2">
                    <div class="py-2 w-11/12  rounded">
                        业绩总和： <span class="text-red-600 font-semibold ">{{ earningInfor }} USDT</span>
                    </div>
                </div>
            </div>

            <div v-if="hasNoChild" class="mb-3 w-11/12 mr-auto ml-auto text-center text-white mt-20 rounded p-2">
                当前地址暂无下级
            </div>
        </div>
    </div>
</template>

<script>
import gameContractApi from '@/request/ether_request/game'
import popularContractApi from '@/request/ether_request/popularized'
import { userIncome } from '@/request/api_request'
import { showToast } from 'vant'
import { filterAddress } from '@/utils/filterValue'

export default {
    data() {
        return {
            childAddressList: [],
            earningInfor: '',
            hasNoChild: false
        }
    },
    mounted() {
        this.getAddressInfor(window.ethereum.selectedAddress)
    },
    methods: {
        filterAddress,
        //获取星级
        getStarWord(star) {
            if (star == 0) {
                return '暂无星级'
            } else if (star == 5) {
                return '一星';
            } else if (star == 10) {
                return '二星';
            } else if (star == 15) {
                return '三星';
            } else if (star == 20) {
                return '四星';
            } else if (star == 25) {
                return '五星';
            } else if (star == 30) {
                return '六星';
            }
            // switch (star) {
            //     case 0: return '暂无星级';
            //     case 5: return '一星';
            //     case 10: return '二星';
            //     case 15: return '三星';
            //     case 20: return '四星';
            //     case 25: return '五星';
            //     case 30: return '六星';

            // }
        },
        //下级地址信息
        async getAddressInfor(walletAddress) {
            this.$loading.show()
            let childArr = await this.getChildAddress(walletAddress)
            // let addrInforItem = {}
            console.log(walletAddress, childArr)
            if (childArr.length == 0) {
                this.hasNoChild = true
                showToast('当前地址暂无下级收益')
                return
            }
            let childOne;
            let childTwo;
            let startOne;
            let startTwo;
            let earningOne;
            let earningTwo;
            let earningInfor;
            let childAddressList;
            if (childArr.length === 1) {
                childOne = childArr[0]
                startOne = await this.getUserStar(childOne)
                earningInfor = await this.getAddrEarning(childOne)
                childAddressList = childAddressList = [
                    { address: childOne, star: startOne }
                ]
                this.earningInfor = earningInfor
                this.childAddressList = childAddressList

                return
            }
            childOne = childArr[0]
            childTwo = childArr[1]
            startOne = await this.getUserStar(childOne)
            startTwo = await this.getUserStar(childTwo)
            earningOne = await this.getAddrEarning(childOne)
            earningTwo = await this.getAddrEarning(childTwo)
            earningInfor = earningOne + earningTwo

            childAddressList = [
                { address: childOne, star: startOne },
                { address: childTwo, star: startTwo }
            ]
            this.earningInfor = earningInfor
            this.childAddressList = childAddressList

            this.$loading.hide()

            console.log(this.childAddressList)
            console.log(this.earningInfor)
        },
        //获取地址的收益卡收益
        async getAddrEarning(walletAddress) {
            const result = await userIncome(walletAddress)
            let earnings = result.data.income_card
            console.log(result, earnings)
            return earnings
        },
        //获取当前地址的下级地址
        async getChildAddress(walletAddress) {
            const result = await popularContractApi.relationshipAddress(walletAddress)
            let childAddress = result.child
            return childAddress
        },

        //获取用户星级
        async getUserStar(walletAddress) {
            const result = await gameContractApi.userStar(walletAddress)
            console.log('星级', result)
            return result
        },
        cancelPay() {
            window.history.back();
        },
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