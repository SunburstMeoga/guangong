<template>
    <div>
        <div>
            <div class="pt-8 pb-2">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                    <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">推荐关系</div>
                </div>
            </div>
            <div v-show="!isLink" class="flex flex-col text-icon-gray justify-center items-center">
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button text-primary-word text-lg button-word" @click="linkWallet">
                        链接钱包
                    </div>
                    <br />
                </div>
            </div>

        </div>
        <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
            color="#E20F2A">
            <van-tab title="上级" class="pt-4">
                <HomeIn />
            </van-tab>
            <van-tab title="我的推荐" class="pt-4">
                <HomeOut />
            </van-tab>
        </van-tabs>
        <!-- <HomeIn v-if="inHome" />
        <HomeOut v-else /> -->
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { ethers, ZeroAddress } from "ethers"
import { config } from '@/const/config'

import HomeIn from './inHome.vue'
import HomeOut from './outHome.vue'

export default {
    components: { HomeIn, HomeOut, [Tab.name]: Tab, [Tabs.name]: Tabs },
    data() {
        return {
            inHome: false,
            isLink: false,
            typeList: [{ text: '我的推荐' }, { text: '上级' }]
        }
    },
    async created() {
        console.log(ethereum.selectedAddress)
        if (ethereum.selectedAddress == null) {
            this.linkWallet()
        } else {
            this.isLink = true
            this.load()
        }
    },

    methods: {
        cancelPay() {
            window.history.back();
        },
        async linkWallet() {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            this.$store.commit('setAddress', newAccounts[0])
            this.isLink = true
            this.load()
        },
        async load() {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const GAME = new ethers.Contract(config.game_addr, config.game_abi, provider)
            const ret = await GAME.spreads(ethereum.selectedAddress)
            this.$store.commit('setParentAddress', ret.parent)
            if (ret.parent == ZeroAddress) {
                this.inHome = false
            } else {
                this.inHome = true
            }
            console.log('inHome:', this.inHome)
        }
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}
</style>
<style>
.van-cell-group,
.van-cell-group--inset {
    margin: 0;
    padding: 0
}
</style>