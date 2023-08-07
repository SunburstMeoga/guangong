<template>
    <div>
        <div class="pt-16">
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
                <module-title titleWord="精選商鋪" />
            </div>
            <div class="mb-10 w-full overflow-hidden">
                <shops-card :shopsList="shopsList" />
            </div>
            <div class="w-full px-4 mb-10">
                <module-title titleWord="NFT市場" />
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
            shopsList: [
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/d25106083317f2965bcf0d2a09ad7fa6ec5f5975c81a4d-0qEojt_fw240g',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/d1e7d2a73f9483c9cd5aa05b7efb973d95155bcb7d889-0Fy4wB_fw240webp',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/873d7f5a793ce87a54159bb7fc7ddeb8c021d67dfc47-1zbnWH_fw240webp',
                    name: 'monstercat貓廠'
                },

                {
                    imageUrl: 'https://gd-hbimg.huaban.com/0517803d88a5abd8e493de8df94804e0a6243c3dc2a0a-VqKjE0_fw240webp',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/fe904adf4979fbc8da0d929aa6d2d02cab68183174de91-G6aKwG_fw240g',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/c050a1d8e37632ba1c282f4b9b8a6911ceccbaa41986fc-Dj1zWL_fw240g',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/81cb657ea3ac34f8537b301d7d89ca469d698552161e3-7RgIuG_fw240webp',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/0efc57d91532a82a8741115b393989617a36291743ef7-UR1xPR_fw240webp',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/2a0119bfd2a9196820397435983781dc96bc68a728d33-Hqj9KX_fw240webp',
                    name: 'monstercat貓廠'
                },
                {
                    imageUrl: 'https://gd-hbimg.huaban.com/bc9564388f2061a5b9a572472166fa7a9206f7321b9b1-GYTTdO_fw240webp',
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