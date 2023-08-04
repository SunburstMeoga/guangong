<template>
    <div>
        <div>
            <div class="pt-2">
                <div
                    class="ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-2">
                    <div class="w-80 h-80">
                        <van-swipe class="my-swipe" :autoplay="0" indicator-color="#E20F2A" :show-indicators="false"
                            @change="swipeChange">
                            <van-swipe-item v-for="(item, index) in 3" :key="index">
                                <div class="w-80 h-80">
                                    <img src="@/assets/guangong2.png" alt="">
                                </div>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
                <div class="flex justify-center items-center mb-10">
                    <div v-for="(item, index) in 3"
                        :class="[index === 0 ? 'ml-0' : '', currentSwipe === index ? 'bg-theme-primary' : 'bg-swipe-bull']"
                        :key="index" class="w-2 h-2 rounded-full ml-2" />
                </div>
                <div class="flex flex-col justify-start items-center pb-40">
                    <div class="w-11/12 text-card-content font-medium text-3xl mb-10">
                        關羽
                    </div>
                    <div class="w-11/12 flex justify-between items-center text-card-content">
                        <div class="flex justify-center item-center w-4/12 border-r border-card-introduce py-1.5">
                            <div class="icon iconfont icon-heart mr-2" style="font-size: 20px;"></div>
                            <div class="mt-px">5</div>
                        </div>
                        <div class="flex justify-center item-center w-4/12 border-r border-card-introduce py-1.5">
                            <div class="icon iconfont icon-view mr-2" style="font-size: 20px;"></div>
                            <div class="mt-px">1245</div>
                        </div>
                        <div class="flex justify-center item-center w-4/12 py-1.5">
                            <div class="icon iconfont icon-share mr-2" style="font-size: 20px;"></div>
                            <div class="mt-px">分享</div>
                        </div>

                    </div>
                    <div class="border-module">
                        <div class="text-icon-gray text-xs mb-1">
                            發行方
                        </div>
                        <div class="flex justify-start items-center mb-8">
                            <div class="rounded-full overflow-hidden w-6 h-6 mr-2">
                                <img src="https://res.ucollex.io/cdn-cgi/image/width=100/images/20220725/5tKs6wbE7CxCMbpkn5DQ.jpg"
                                    alt="">
                            </div>
                            <div class="text-card-content font-medium text-lg">
                                monstercat貓廠
                            </div>
                        </div>
                        <div class="text-icon-gray text-xs mb-1">
                            擁有者
                        </div>
                        <div class="flex justify-start items-center">
                            <div class="rounded overflow-hidden w-6 h-6 mr-2">
                                <img src="https://upload.ucollex.io/cdn-cgi/image/width=512/uploads/dash/ShyePRsApntO.jpg"
                                    alt="">
                            </div>
                            <div class="text-card-content font-medium text-lg">
                                LeBlanc James
                            </div>
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showStage = !showStage">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">階段</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showStage ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showStage">
                            武聖出山（每個道具+100U）
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showRequest = !showRequest">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl">合成要求</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showRequest ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showRequest">
                            美髯公+赤兔馬+青龍偃月刀
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showDetails = !showDetails">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">詳細資料</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showDetails ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showDetails">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">階段</div>
                                <div class="text-base text-card-content">武聖出山</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">發行量</div>
                                <div class="text-base text-card-content">100</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征令牌</div>
                                <div class="text-base text-card-content">關公令</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">令牌價（等值WGT）</div>
                                <div class="text-base text-card-content">150U</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">週期</div>
                                <div class="text-base text-card-content">1周</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征獎勵（等值WGT）</div>
                                <div class="text-base text-card-content">159U</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">月化利率</div>
                                <div class="text-base text-card-content">24%</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">損耗週期</div>
                                <div class="text-base text-card-content">135次</div>

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
                            <div class="rounded-full overflow-hidden w-10 h-10">
                                <img src="https://res.ucollex.io/cdn-cgi/image/width=100/images/20220725/5tKs6wbE7CxCMbpkn5DQ.jpg"
                                    alt="">
                            </div>
                            <div class="ml-2 flex flex-col justify-between">
                                <div class="text-white font-medium">由 世界關公寶WGT 发行</div>
                                <div class="text-icon-gray">Oct 28, 2022 at 12:34am</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div
                        class="buy-button text-primary-word font-medium text-lg py-4 rounded flex justify-center items-center">
                        購買 US$ 19.98
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
export default {
    components: { [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
    data() {
        return {
            currentSwipe: 0,
            showStage: true,
            showRequest: true,
            showDetails: true,
            showIssue: true
        }
    },
    mounted() {
        console.log(this.$route.params)
    },
    methods: {
        swipeChange(index) {
            console.log('change', index)
            this.currentSwipe = index
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
    @apply w-11/12 border-b border-card-introduce py-10 font-light;
}

.show-icon {
    @apply font-extrabold transition ease-in-out duration-200;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>