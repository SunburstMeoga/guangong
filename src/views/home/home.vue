<template>
    <div>
        <div class="pt-16" v-if="showSkeleton">
            <div class="mt-10 px-4">
                <div class="animate-pulse flex space-x-4 mb-20">
                    <div class="rounded-full bg-icon-undertone h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-10 bg-icon-undertone rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-10 bg-icon-undertone rounded col-span-2"></div>
                                <div class="h-10 bg-icon-undertone rounded col-span-1"></div>
                            </div>
                            <div class="h-10 bg-icon-undertone rounded"></div>
                        </div>
                    </div>
                </div>
                <div class="animate-pulse flex space-x-4">
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-10 bg-icon-undertone rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-10 bg-icon-undertone rounded col-span-2"></div>
                                <div class="h-10 bg-icon-undertone rounded col-span-1"></div>
                            </div>
                            <div class="h-10 bg-icon-undertone rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-16" v-else>
            <div class="market w-full relative mb-20">
                <van-swipe class="my-swipe mt-10" :show-indicators="false" ref="productSwipe">
                    <van-swipe-item v-for="(item, index) in productList" :key="index" @click="toGoodDetails">
                        <product-card :imageUrl="item.imageUrl" :name="item.name" />
                    </van-swipe-item>
                </van-swipe>
                <div class="w-full px-4 absolute flex justify-between items-center top-80 left-0 text-icon-gray">
                    <div class="icon iconfont icon-left" style="font-size: 30px;" @click="prevProduct()"></div>
                    <div class="icon iconfont icon-right" style="font-size: 30px;" @click="nextProduct()"></div>
                </div>
            </div>
            <div class="w-full px-4 mb-10">
                <module-title titleWord="热门商鋪" />
            </div>
            <div class="mb-10 w-full overflow-hidden">
                <shops-card :shopsList="shopsList" />
            </div>
            <div class="w-full px-4 mb-10">
                <module-title titleWord="NFT市場" hasMore />
            </div>
            <div class="w-full px-4">
                <div class="mb-4" v-for="(item, index) in marketList" :key="index" @click="toMarketDetails()">
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
import ShopsCard from '@/components/ShopsCard.vue'
export default {
    components: { ProductCard, ModuleTitle, MarketCard, ShopsCard, [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
    data() {
        return {
            showSkeleton: true,
            shopsList: [
                {
                    imageUrl: 'https://img1.baidu.com/it/u=772282021,1853132764&fm=253&fmt=auto&app=138&f=JPEG?w=554&h=375',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: require('../../assets/shops1.gif'),
                    name: 'monstercat貓廠'
                },

                {
                    imageUrl: 'https://img1.baidu.com/it/u=1949172529,1424394842&fm=253&fmt=auto&app=138&f=PNG?w=641&h=384',
                    name: 'monstercat貓廠'
                },

                {
                    imageUrl: 'https://img2.baidu.com/it/u=1141776985,3616095252&fm=253&fmt=auto&app=138&f=JPEG?w=627&h=358',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img2.baidu.com/it/u=893528947,4138052345&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img0.baidu.com/it/u=1609920616,2349602344&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img1.baidu.com/it/u=1079021637,1070525350&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img2.baidu.com/it/u=2251013280,3339003956&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img1.baidu.com/it/u=3550768872,398163585&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://img1.baidu.com/it/u=263307488,3874355510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    name: 'monstercat貓廠'
                }
            ],
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
    mounted() {
        setTimeout(() => {
            this.showSkeleton = false
        }, 2000)
    },
    methods: {
        toMarketDetails() {
            this.$router.push({
                path: '/market/12345567'
            })
        },
        toGoodDetails() {
            this.$router.push({
                path: '/good/12345567'
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