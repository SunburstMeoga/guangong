<template>
    <div class="transition ease-in-out duration-300 fixed top-0 left-0 right-0 z-50"
        :class="!showTop ? '-translate-y-20' : ''">
        <div class="flex justify-between items-center h-20 px-4 backdrop-blur bg-black/70 w-full">
            <div class="w-14 bg-theme-primary rounded-full" @click="$router.push({ path: '/' })">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="flex justify-end items-center">
                <!-- <div class="top-operating">
                    <div class="icon iconfont icon-Search" style="font-size: 20px;" />
                </div> -->
                <div class="top-operating ml-4" @click="showRight = true">
                    <div class="icon iconfont icon-menu-hamburger" style="font-size: 22px;" />
                </div>
            </div>
        </div>
        <van-popup v-model:show="showRight" closeable close-icon-position="top-left" :close-on-popstate="true"
            position="right" :style="{ width: '100%', height: '100%' }">
            <div class="bg-cover-content w-full h-full relative">
                <div class="pt-10 text-white w-11/12 ml-auto mr-auto">
                    <div class="border-module">
                        <div class="mb-6" @click="viewAssets">{{ $t('menu.personal_center') }}</div>

                        <div class="mb-6" @click="toMyTeam">我的团队</div>
                        <div class="mb-6" @click="toRecommend">{{ $t('menu.recommend') }}</div>
                        <div class="mb-6" @click="viewGoods">{{ $t('menu.official_release') }}</div>
                        <div class="mb-6" @click="toWGTExchangeWGA">货币兑换</div>
                        <!-- <div class="mb-6" @click="viewMarket">{{ $t('menu.nft_market') }}</div> -->
                        <div class="mb-6 text-icon-gray" @click="toMap">关公商城 (暂未开放，敬请期待)</div>
                        <div class="text-icon-gray" @click="toMap">{{ $t('menu.guangong_map') }} (暂未开放，敬请期待)</div>

                    </div>
                    <div>
                        <div class="mb-6">FAQ</div>
                        <div class="mb-6">{{ $t('menu.help') }}</div>
                        <div class="mb-6">{{ $t('menu.about_us') }}</div>
                        <div class="mb-6">版本 1.2.0</div>
                        <div class="flex justify-start items-center mb-6">
                            <div class="icon iconfont icon-twitter-fill mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-facebook-fill mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-whatsapp mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-tumblr2 mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-Instagram" style="font-size: 22px;"></div>
                        </div>
                        <!-- <van-popover @select="setLanguage" v-model:show="showPopover" theme="dark" :actions="actions"
                            placement="top-start" @open="showLanguage = !showLanguage"
                            @close="showLanguage = !showLanguage">
                            <template #reference>
                                <div class="flex justify-center items-center py-2 px-2 rounded bg-language-content">
                                    <div class="icon iconfont icon-language mr-2"></div>
                                    <div class="mr-2 text-sm">{{ $t('language.current_language') }}</div>
                                    <div class="icon iconfont icon-top transition ease-in-out duration-300"
                                        :class="showLanguage ? 'rotate-180' : ''"></div>
                                </div>
                            </template>
                        </van-popover> -->
                    </div>
                </div>

                <div class="absolute left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button text-primary-word font-medium text-lg py-4 rounded flex justify-center items-center"
                        @click="handleConnect">
                        {{ hasWalletAddress ? '断开连接' : '連接錢包' }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ethers } from "ethers";
import { Popup, showToast } from 'vant'
export default {
    components: { [Popup.name]: Popup },
    data() {
        return {
            showTop: true,
            showRight: false,
            showPopover: false,
            showLanguage: false,
            actions: [
                { text: '简体中文', value: 'zh-cn' },
                { text: '繁體中文', value: 'zh-hk' },
                { text: 'English', value: 'en-us' },
            ],
            currentScrollY: 0,
            hasWalletAddress: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)

        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                this.hasWalletAddress = true
            } else {
                this.hasWalletAddress = false
            }
        } else {
            this.$confirm.show({
                title: "提示",
                content: "请用钱包打开浏览器，以获得更好的体验",
                showCancelButton: false,
                onConfirm: () => {
                    this.$router.push({
                        path: '/'
                    })
                },
            });
        }
    },
    methods: {
        //断开连接
        async loginOut() {
            this.hasWalletAddress = false
            showToast('已断开连接')
        },
        //点击链接钱包按钮
        async login() {
            console.log('Login')
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                // this.showRight = false
                this.$store.commit('updateUserInfor', { address: accounts[0] })
                this.hasWalletAddress = true
                showToast('已连接至钱包')

            } catch (error) {
                showToast('连接失败，请重新连接')
            }
        },
        async handleConnect() {
            if (this.hasWalletAddress === true) {
                this.loginOut()
            } else {
                this.login()
            }
        },
        toMyTeam() {
            if (!window.ethereum) {
                showToast('请使用钱包打开浏览器以获得更好的体验')
                return
            }
            if (!window.ethereum.selectedAddress) {
                showToast('请连接钱包')
                return
            }
            this.$router.push({
                path: '/team',
            })
            this.showRight = false
        },
        viewGoods() {
            this.$router.push({
                path: '/nfts/mall',
            })
            this.showRight = false
        },
        toMap() {
            showToast('该功能暂未开放')
            return
            this.$router.push({
                path: '/map',
            })
            this.showRight = false
        },
        viewMarket() {
            // showToast('该功能暂未开放')
            // return
            this.$router.push({
                path: '/nfts/market'

            })
            this.showRight = false
        },
        toRecommend() {
            if (!window.ethereum) {
                showToast('请使用钱包打开浏览器以获得更好的体验')
                return
            }
            if (!window.ethereum.selectedAddress) {
                showToast('请连接钱包')
                return
            }
            this.$router.push({
                path: '/recommend'
            })
            this.showRight = false
        },
        viewAssets() {
            if (!window.ethereum) {
                showToast('请使用钱包打开浏览器以获得更好的体验')
                return
            }
            if (!window.ethereum.selectedAddress) {
                showToast('请连接钱包')
                return
            }
            this.$router.push({
                path: '/personal'
            })
            this.showRight = false
        },
        toWGTExchangeWGA() {
            // showToast('该功能暂未开放')
            // return
            if (!window.ethereum) {
                showToast('请使用钱包打开浏览器以获得更好的体验')
                return
            }
            if (!window.ethereum.selectedAddress) {
                showToast('请连接钱包')
                return
            }
            this.$router.push({
                path: '/exchange'
            })
            this.showRight = false
        },
        setLanguage(actions) {
            this.$i18n.locale = actions.value
            localStorage.setItem('locale', this.$i18n.locale)
            console.log(this.$i18n.locale)
        },
        handleScroll() {
            if (scrollY >= 100) {
                this.showTop = false
            } else {
                this.showTop = true
            }
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    object-fit: contain;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.top-operating {
    @apply rounded-full w-10 h-10 flex justify-center items-center bg-icon-undertone text-white;
}

.border-module {
    @apply border-b border-card-introduce py-10 mb-10;
}
</style>