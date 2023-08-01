<template>
    <div>
        <div>
            <top-bar />
        </div>
        <div class="pt-20">
            <div class="market w-full pt-10 relative">
                <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" ref="productSwipe">
                    <van-swipe-item v-for="(item, index) in productList" :key="index">
                        <div class="px-4">
                            <div
                                class="rounded-xl inline-block px-2 py-px bg-success-undertone text-sm text-success-word mb-6">
                                可合成
                            </div>
                            <div class="title text-4xl font-bold text-white leading-12 mb-6">
                                關公，字雲長，是一位英雄人物。
                            </div>
                            <div class="flex justify-center items-center mb-10">
                                <div class="w-11/12">
                                    <img :src="item" alt="">
                                </div>
                            </div>
                            <div class="px-4 py-4 rounded-lg backdrop-blur bg-module-card"
                                style="background-color: rgb(0 0 0 / 0.4);">
                                <!-- <div class="px-4 py-4 rounded-lg backdrop-blur bg-module-card"
                                style="background-color: rgb(18 18 18 / 0.6);"> -->
                                <div class="flex justify-center items-center mb-6">
                                    <div class="flex justify-start items-center w-11/12">
                                        <div class="pr-10">
                                            <div class="text-card-title text-sm font-light mb-2">数量</div>
                                            <div class="text-card-content text-2xl font-semibold">12,000</div>
                                        </div>
                                        <div>
                                            <div class="text-card-title text-sm font-light mb-2">价格</div>
                                            <div class="text-card-content text-2xl font-semibold">US$ 20.00</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <div
                                        class="buy-button w-11/12 rounded py-4 flex justify-center items-center text-primary-word font-medium text-lg">
                                        购买
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <div class="w-full px-4 absolute flex justify-between items-center top-80 left-0 text-icon-gray">
                    <div class="icon iconfont icon-left" style="font-size: 30px;" @click="prevProduct()"></div>
                    <div class="icon iconfont icon-right" style="font-size: 30px;" @click="nextProduct()"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import { Swipe, SwipeItem } from 'vant';
export default {
    components: { TopBar, [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
    data() {
        return {
            productList: [
                require('../../assets/guangong1.png'),
                require('../../assets/guangong2.png'),
                require('../../assets/guangong3.png'),
                require('../../assets/guangong4.png'),
                require('../../assets/guangong5.png'),

            ]
        }
    },
    methods: {
        prevProduct() {
            console.log(this.$refs)
            this.$refs.productSwipe.prev()
        },
        nextProduct() {
            console.log(this.$refs)

            this.$refs.productSwipe.next()

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

.market {
    background: radial-gradient(circle, rgba(133, 28, 41, 1) 0%, rgba(18, 18, 18, 1) 84%, rgba(18, 18, 18, 1) 100%);
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>