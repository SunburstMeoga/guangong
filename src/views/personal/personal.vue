<template>
    <div>
        <div class="flex flex-col justify-start items-center pt-20">
            <div class="w-full">
                <personal-assets />
            </div>
            <div class="w-11/12">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab title="我的NFT" class="pt-4">
                        <div class="" :class="assetsList.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="assetsList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in assetsList" :key="index" @click="toAassetsDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <assets-card :imageUrl="_item.infor.imageUrl" :price="_item.infor.price"
                                        :name="_item.infor.name" :cardType="getCardType(_item.infor.card_type)"
                                        :token="_item.tokenId" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="正在挂单" class="pt-4">
                        <div class="" :class="pendingList.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="pendingList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in  pendingList" :key="index"
                                    @click="toPendingOrderDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <assets-card type="pending" :imageUrl="_item.infor.imageUrl"
                                        :price="filterPrice(_item.amount)" :name="_item.infor.name"
                                        :cardType="getCardType(_item.infor.card_type)" :nftID="_item.tokenId" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="正在出征" class="pt-4">
                        <div class="" :class="pendingList.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="pendingList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in  pendingList" :key="index"
                                    @click="toCampaignDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <assets-card type="pending" :imageUrl="_item.infor.imageUrl"
                                        :price="filterPrice(_item.amount)" :name="_item.infor.name"
                                        :cardType="getCardType(_item.infor.card_type)" :nftID="_item.tokenId" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>

            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import PersonalAssets from '@/components/PersonalAssets'
import AssetsCard from '@/components/AssetsCard'
import { ownerList, pendingOrderList } from '@/request/api_request'
import nfts_list from '@/nft_datas/nfts_list'
// import { filterPrice } from '@/utils/filterValue'

import { Tab, Tabs, Empty } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs, PersonalAssets, AssetsCard },
    data() {
        return {
            active: 0,
            tabList: [{ title: '所有资产' }, { title: '正在挂单' }],
            assetsList: [],
            pendingList: []
            // assetsList: []
        }
    },
    mounted() {
        this.getPersonNfts()
        this.getPendingOrderList()
        console.log('ethereum.selectedAddress', ethereum.selectedAddress)
    },
    methods: {
        filterPrice(value) {
            return parseInt(value).toFixed(4)
        },
        //卡片类型
        getCardType(card_type) {
            if (card_type === 'nft_role') {
                return 'NFT角色卡'
            } else if (card_type === 'synthesis_props') {
                return '合成道具卡'
            } else if (card_type === 'tactics_props') {
                return '战法道具卡'
            } else if (card_type === 'expedition_order') {
                return '出征令牌'
            }
        },
        //获取用户的挂单列表
        getPendingOrderList() {
            pendingOrderList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('挂单列表', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.id
                        obj.tokenId = item.nft_id
                        obj.amount = item.amount
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
                    this.pendingList = newArr
                    console.log('pendingList', this.pendingList)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        getPersonNfts() {
            ownerList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('资产列表', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.tokenId % 100
                        obj.tokenId = item.tokenId
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
                    this.assetsList = newArr
                    // typeList.map(item => {
                    //     nfts_list.map(_item => {
                    //         if (_item.id == item.typeID) {
                    //             console.log(_item.id, item.tokenId)
                    //             _item.tokenId = item.tokenId
                    //             this.assetsList.push(_item)
                    //         }
                    //     })

                    // })
                    console.log('assetsList', this.assetsList)

                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        toAassetsDetails(_item) {
            console.log('item', _item)
            // return
            this.$router.push({
                path: '/assets/' + _item.tokenId
            })
        },
        toPendingOrderDetails(_item) {
            this.$router.push({
                path: '/pending-order/' + _item.tokenId
            })
        },
        toCampaignDetails(_item) {
            this.$router.push({
                path: '/campaign/' + _item.tokenId
            })
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

.van-tabs__wrap {
    height: 80px;
}
</style>