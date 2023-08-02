<template>
    <div class="transition ease-in-out delay-150 duration-300 h-24">
        <div
            class="flex justify-between items-center py-4 px-4 backdrop-blur bg-black/70 w-full fixed top-0 left-0 right-0 z-50">
            <div class="w-16 bg-theme-primary rounded-full">
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
            <div class="bg-cover-content w-full h-full">
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
                        <!-- div -->

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
            showRight: true
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {

            console.log(scrollY)
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    object-fit: contain;
}

.top-operating {
    @apply rounded-full w-10 h-10 flex justify-center items-center bg-icon-undertone text-white;
}

.border-module {
    @apply border-b border-card-introduce py-10 mb-10;
}
</style>