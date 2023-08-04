<template>
    <div class="transition ease-in-out duration-300 fixed top-0 left-0 right-0 z-50"
        :class="!showTop ? '-translate-y-20' : ''">
        <div class="flex justify-between items-center h-20 px-4 backdrop-blur bg-black/70 w-full">
            <div class="w-14 bg-theme-primary rounded-full">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="flex justify-end items-center">
                <div class="top-operating">
                    <div class="icon iconfont icon-Search" style="font-size: 20px;" />
                </div>
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
                        <div class="mb-6">平台NFT</div>
                        <div class="mb-6">二級市場</div>
                        <div>推薦藏品</div>

                    </div>
                    <div>
                        <div class="mb-6">FAQ</div>
                        <div class="mb-6">Help</div>
                        <div class="mb-6">關於我們</div>
                        <div class="flex justify-start items-center mb-6">
                            <div class="icon iconfont icon-twitter-fill mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-facebook-fill mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-whatsapp mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-tumblr2 mr-4" style="font-size: 22px;"></div>
                            <div class="icon iconfont icon-Instagram" style="font-size: 22px;"></div>
                        </div>
                        <van-popover @select="setLanguage" v-model:show="showPopover" theme="dark" :actions="actions"
                            placement="top-start" @open="showLanguage = !showLanguage"
                            @close="showLanguage = !showLanguage">
                            <template #reference>
                                <!-- <van-button type="primary">深色风格</van-button> -->
                                <div class="flex justify-center items-center py-2 px-2 rounded bg-language-content">
                                    <div class="icon iconfont icon-language mr-2"></div>
                                    <div class="mr-2 text-sm">{{ currentLanguage }}</div>
                                    <div class="icon iconfont icon-top transition ease-in-out duration-300"
                                        :class="showLanguage ? 'rotate-180' : ''"></div>
                                </div>
                            </template>
                        </van-popover>

                    </div>
                </div>

                <div class="absolute left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div
                        class="buy-button text-primary-word font-medium text-lg py-4 rounded flex justify-center items-center">
                        連接錢包
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup } from 'vant'
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
            currentScrollY: 0
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        setLanguage(actions) {
            this.$i18n.locale = actions.value
            this.$store.commit('setLanguage', actions.value)
            localStorage.setItem('language', actions.value)
            console.log(this.$store.state)
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