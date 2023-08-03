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
                        關羽，是一位英雄人物。
                    </div>
                    <div class="w-11/12 flex justify-between items-center text-card-content">
                        <div class="flex justify-center item-center w-4/12 border-r border-card-introduce py-1.5">
                            <div class="icon iconfont icon-heart mr-2" style="font-size: 20px;"></div>
                            <div>5</div>
                        </div>
                        <div class="flex justify-center item-center w-4/12 border-r border-card-introduce py-1.5">
                            <div class="icon iconfont icon-view mr-2" style="font-size: 20px;"></div>
                            <div>1245</div>
                        </div>
                        <div class="flex justify-center item-center w-4/12 py-1.5">
                            <div class="icon iconfont icon-share mr-2" style="font-size: 20px;"></div>
                            <div>分享</div>
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
                    <div class="border-module w-11/12 text-card-content flex justify-between items-center"
                        @click="showIntroduce = !showIntroduce">
                        <div class="text-2xl font-semibold">簡介</div>
                        <div class="icon iconfont icon-right font-extrabold transition ease-in-out duration-300"
                            :class="showIntroduce ? '-rotate-90' : ''"></div>
                    </div>
                    <div class="border-module w-11/12 text-card-content flex justify-between items-center">
                        <div class="text-2xl font-semibold">詳細資料</div>
                        <div class="icon iconfont icon-right font-extrabold"></div>
                    </div>
                    <div class="border-module w-11/12 text-card-content flex justify-between items-center">
                        <div class="text-2xl font-semibold">發行方</div>
                        <div class="icon iconfont icon-right font-extrabold"></div>
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
            showIntroduce: false
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
    @apply w-11/12 border-b border-card-introduce py-10;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>