<template>
    <div>
        <div class="w-full pt-24 mb-10" @click="viewGoods">
            <div class="w-11/12 ml-auto mr-auto">
                <module-title :titleWord="'官方发售'" />
            </div>
        </div>

        <div class="" v-if="showSkeleton">
            <div class="mt-2 px-4">
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
        <div class="" v-else>
            <div class="market w-full relative mb-20">
                <van-swipe class="my-swipe mt-4" :autoplay="3000" :show-indicators="false" ref="productSwipe">
                    <van-swipe-item v-for="(item, index) in productList" :key="index" @click="toGoodDetails(item)">
                        <product-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price"
                            :cardTag="item.card_type === 'nft_role' ? item.stage : item.tag" />
                    </van-swipe-item>
                </van-swipe>
                <div class="w-full px-4 absolute flex justify-between items-center top-60 left-0 text-icon-gray">
                    <div class="icon iconfont icon-left" style="font-size: 30px;" @click="prevProduct()"></div>
                    <div class="icon iconfont icon-right" style="font-size: 30px;" @click="nextProduct()"></div>
                </div>
                <div class="flex justify-center items-center mt-6 text-sm text-more-word">
                    <div class="mr-1" @click="viewGoods">查看官方发售NFT</div>
                    <div class="flex justify-center items-center">
                        <div class="icon iconfont icon-right" style="font-size: 14px;"></div>
                    </div>
                </div>
            </div>
            <!-- <div class="w-full px-4 mb-10">
                <module-title titleWord="热门商鋪" />
            </div>
            <div class="mb-10 w-full overflow-hidden">
                <shops-card :shopsList="shopsList" />
            </div> -->
            <div class="w-full px-4 mb-10" @click="viewMarket">
                <module-title titleWord="NFT市場" hasMore />
            </div>
            <div class="w-full px-4">
                <div class="mb-4" v-for="(item, index) in marketListData" :key="index" @click="toMarketDetails(item)">
                    <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner"
                        :amount="filterAmount(item.amount)" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem, showToast } from 'vant';
import nfts_list from '@/nft_datas/nfts_list'
import ProductCard from '@/components/ProductCard'
import ModuleTitle from '@/components/ModuleTitle.vue'
import MarketCard from '@/components/MarketCard'
import ShopsCard from '@/components/ShopsCard.vue'
import { hotList, marketList } from '@/request/api_request'
import { filterAddress, filterAmount } from '@/utils/filterValue'
import helpContractApi from '@/request/ether_request/help'

export default {
    components: { ProductCard, ModuleTitle, MarketCard, ShopsCard, [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem },
    data() {
        return {
            showSkeleton: true,
            ret: [],
            productList: [],
            marketListData: []
        }
    },
    mounted() {
        // console.log(nfts_list)
        this.getHotList()
        this.getMarketList()
    },
    methods: {
        filterAddress, filterAmount,
        async getWGTFromUSDT(value) {
            let amount = value.toString()
            helpContractApi.WGTFromUSDT(amount)
            const result = await helpContractApi.WGTFromUSDT(amount)
            console.log('换算完值', result)
            return result
        },
        getMarketList() {
            marketList()
                .then(res => {
                    console.log('二手', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.nft_id > 100 ? item.nft_id % 100 : item.nft_id
                        obj.tokenId = item.nft_id
                        obj.amount = item.amount
                        obj.owner = item.owner
                        typeList.push(obj)
                    })
                    let newArr = typeList.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArr.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                console.log(item)
                                item.infor = _item
                            }
                        })
                    })
                    this.marketListData = newArr
                    console.log('marketListData', this.marketListData)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        async getHotList() {
            hotList()
                .then(res => {
                    console.log('热卖', res)
                    res.data.map(item => {
                        nfts_list.map(_item => {
                            if (_item.id === item.t) {
                                this.productList.push(_item)
                            }
                        })
                    })
                    // console.log(this.productList)
                    this.showSkeleton = false
                })
                .catch(err => {
                    console.log(err)
                    this.showSkeleton = false
                })
        },
        viewGoods() {
            this.$router.push({
                path: '/nfts/mall',
            })
        },
        viewMarket() {
            this.$router.push({
                path: '/nfts/market'

            })
        },
        toMarketDetails(item) {
            if (window.ethereum && !window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.$router.push({
                path: '/market/' + item.tokenId
            })
        },
        toGoodDetails(item) {
            console.log('window.ethereum.selectedAddress', window)
            if (window.ethereum && !window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.$router.push({
                path: '/good/' + item.id
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