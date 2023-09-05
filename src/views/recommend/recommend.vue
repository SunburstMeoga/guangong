<template>
    <div>
        <div>
            <div class="pt-8 pb-2">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                    <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">{{ title }}</div>
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
        <div v-if="isNewUser">
            新用户
        </div>
        <div v-else>
            <div v-if="!isSign">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab title="建立关系" class="pt-4">
                        <HomeIn />
                    </van-tab>
                    <van-tab title="我的下级" class="pt-4">
                        <HomeOut />
                    </van-tab>
                </van-tabs>
            </div>
            <div class="flex flex-col text-icon-gray justify-center items-center" v-else>
                <div class="w-11/12 text-left mb-2">上级地址</div>
                <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-10">
                    <div class="text-sm">{{ p_address }}</div>
                </div>
                <div class="w-full py-4 px-4 ">
                    <div class="buy-button text-primary-word text-lg button-word" @click="sign">
                        签名
                    </div>
                </div>
            </div>
        </div>

        <!-- <HomeIn v-if="inHome" />
        <HomeOut v-else /> -->
    </div>
</template>

<script>
import { Tab, Tabs, showSuccessToast, showFailToast, showDialog } from 'vant';
import { ethers, ZeroAddress, isAddress } from "ethers"
import { config } from '@/const/config'
import axios from 'axios'
import HomeIn from './inHome.vue'
import HomeOut from './outHome.vue'
import { preAddress } from '@/request/ether_request/popularized'

export default {
    components: { HomeIn, HomeOut, [Tab.name]: Tab, [Tabs.name]: Tabs },
    data() {
        return {
            inHome: false,
            isLink: false,
            typeList: [{ text: '建立关系' }, { text: '我的下级' }],
            title: '推荐关系',
            isSign: false,
            p_address: '',
            isNewUser: true
        }
    },
    async created() {
        this.getPreAddress()
        if (this.$route.query.p && this.$route.query.p !== ZeroAddress) {
            this.title = '签名'
            this.isSign = true
            this.p_address = this.$route.query.p
        } else {
            this.title = '推荐关系'
            this.isSign = false
        }
        console.log(ethereum.selectedAddress)
        if (ethereum.selectedAddress == null) {
            this.linkWallet()
        } else {
            this.isLink = true
            this.load()
        }
    },

    methods: {
        getPreAddress() {
            this.$loading.show()
            preAddress(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('当前用户上级地址', res)
                    this.$loading.hide()
                    if (res[0] === ZeroAddress) {
                        this.isNewUser = true
                        showDialog({
                            message: '当前地址暂无上级，请前往社区寻找上级推荐人',
                            theme: 'round-button',
                        }).then(() => {
                            // on close
                            window.history.back();
                        });
                    } else {
                        this.isNewUser = false
                    }
                })
                .catch(err => {
                    this.$loading.hide()

                    console.log('err', err)
                })
        },
        async sign() {
            this.$loading.show()
            if (!isAddress(this.p_address)) {
                showFailToast('上级地址错误')
                return
            }
            const msgParams = {
                domain: {
                    chainId: config.chainId,
                    name: 'GWT NFT Game',
                    verifyingContract: config.game_addr,
                    version: '1'
                },
                message: { addr_p: this.p_address, addr_c: ethereum.selectedAddress, index: 0 },
                primaryType: 'popularize',
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    popularize: [
                        { name: 'addr_p', type: 'address' },
                        { name: 'addr_c', type: 'address' },
                        { name: 'index', type: 'uint256' },
                    ],
                },
            }

            const sign_data = await ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [ethereum.selectedAddress, JSON.stringify(msgParams)],
            })
            const obj = {
                p_addr: this.p_address,
                sign: sign_data
            }
            const ret = await axios.post(`${config.api}friends/${ethereum.selectedAddress}`, obj)
            console.log(ret.data)
            this.$loading.hide()
            showSuccessToast('签名成功')
        },
        copyAddress() {
            navigator.clipboard.writeText('sfasdfasdf').then(() => {
                showSuccessToast('复制成功')

            }, () => {
                Toast.fail(this.$t('toast.copyFail'))

            });
        },
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