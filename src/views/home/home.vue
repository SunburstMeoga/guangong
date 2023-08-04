<template>
    <div>
        <div class="pt-16">
            <div class="market w-full relative mb-20">
                <van-swipe class="my-swipe mt-10" :show-indicators="false" ref="productSwipe">
                    <van-swipe-item v-for="(item, index) in productList" :key="index">
                        <product-card :imageUrl="item.imageUrl" :name="item.name" />
                    </van-swipe-item>
                </van-swipe>
                <div class="w-full px-4 absolute flex justify-between items-center top-80 left-0 text-icon-gray">
                    <div class="icon iconfont icon-left" style="font-size: 30px;" @click="prevProduct()"></div>
                    <div class="icon iconfont icon-right" style="font-size: 30px;" @click="nextProduct()"></div>
                </div>
            </div>
            <div class="w-full px-4 mb-10">
                <module-title titleWord="精選商鋪" />
            </div>
            <div>
                <van-swipe class="my-swipe mt-10" :show-indicators="false" ref="productSwipe">
                    <van-swipe-item v-for="(item, index) in productList" :key="index">

                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="w-full px-4 mb-10">
                <module-title titleWord="NFT市場" />
            </div>
            <div class="w-full px-4">
                <div class="mb-4" v-for="(item, index) in marketList" :key="index" @click="toDetails()">
                    <market-card :imageUrl="item.imageUrl" :name="item.name" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import ProductCard from '@/components/ProductCard'
import ModuleTitle from '@/components/ModuleTitle.vue'
import MarketCard from '@/components/MarketCard'
export default {
    components: { ProductCard, ModuleTitle, MarketCard, [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
    data() {
        return {
            productList: [
                {
                    imageUrl: require('../../assets/guangong1.png'),
                    name: '關羽，字雲長',
                },
                {
                    imageUrl: require('../../assets/zhangfei.png'),
                    name: '張飛，字翼德',
                },
                {
                    imageUrl: require('../../assets/zhaoyun.png'),
                    name: '趙雲，字子龍',
                },
                {
                    imageUrl: require('../../assets/machao.png'),
                    name: '馬超，字孟起',
                },
                {
                    imageUrl: require('../../assets/huangzhong.png'),
                    name: '黃忠，字漢升',
                },
            ],
            marketList: [
                {
                    imageUrl: require('../../assets/guanyu1.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/guanyu2.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/guanyu3.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/huangzhong.png'),
                    name: '黃忠',
                },
                {
                    imageUrl: require('../../assets/huangzhong1.png'),
                    name: '黃忠',
                },
            ]
        }
    },
    methods: {
        toDetails() {
            this.$router.push({
                path: '/market/12345567'
            })
        },
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
    background: radial-gradient(circle, rgba(84, 4, 15, 1) 10%, rgba(18, 18, 18, 1) 83%);
}
</style>