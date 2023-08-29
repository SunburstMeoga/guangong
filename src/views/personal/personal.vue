<template>
    <div>
        <div class="flex flex-col justify-start items-center pt-20">
            <div class="w-full">
                <personal-assets />
            </div>
            <div class="w-11/12">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab v-for="(item, index) in  nftTypeList " :title="item.title" class="pt-4">
                        <div class="" :class="item.list.length !== 0 ? 'columns-2 gap-x-3' : ''">
                            <div v-if="item.list.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in  item.list " :key="index" @click="toAassetsDetails(_item)"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">

                                    <assets-card :imageUrl="_item.imageUrl" :price="_item.price" :name="_item.name"
                                        :token="_item.tokenId" />
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
import { ownerList } from '@/request/api_request'
import { config } from '@/const/config'
import nfts_list from '@/nft_datas/nfts_list'

import { Tab, Tabs, Empty } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs, PersonalAssets, AssetsCard },
    data() {
        return {
            nftTypeList: [{ title: 'NFT角色卡', number: 12, list: [] },
            { title: '合成道具卡', number: 6, list: [] },
            { title: '战法道具卡', number: 9, list: [] },
            { title: '出征令牌', number: 9, list: [] }],
            assetsList: []
        }
    },
    mounted() {
        this.getPersonNfts()
        console.log('ethereum.selectedAddress', ethereum.selectedAddress)
    },
    methods: {
        async getPersonNfts() {

            ownerList(ethereum.selectedAddress || '0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB')
                .then(res => {
                    console.log('资产列表', res)
                    let modIdList = []
                    let tokenIds = []
                    res.data.map(item => {
                        let obj = {}
                        // console.log('tokenid', item.tokenId)
                        obj.targetId = item.tokenId % 100
                        obj.tokenId = item.tokenId
                        tokenIds.push(obj.targetId)
                        modIdList.push(obj)
                    })
                    let assetsList = []
                    tokenIds = [...new Set(tokenIds)] //去重
                    console.log('modIdList', modIdList)
                    modIdList.map(item => {
                        nfts_list.map(_item => {
                            if (item.targetId === _item.id) {
                                let obj = {}
                                obj = _item
                                obj.tokenId = item.tokenId
                                // _item.tokenId = item.tokenId
                                assetsList.push(obj)
                                console.log(obj)
                            }
                        })
                    })
                    // console.log('assetsList', assetsList)
                    // return
                    assetsList.map(item => {
                        if (item.card_type === 'nft_role') {
                            this.nftTypeList[0].list.push(item)
                        } else if (item.card_type === 'synthesis_props') {
                            this.nftTypeList[1].list.push(item)
                        } else if (item.card_type === 'tactics_props') {
                            this.nftTypeList[2].list.push(item)
                        } else if (item.card_type === 'expedition_order') {
                            this.nftTypeList[3].list.push(item)
                        }
                    })
                    console.log('assetsList', assetsList)

                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        toAassetsDetails(_item) {
            console.log('item', _item)
            // return
            this.$router.push({
                path: '/assets/' + _item.id,
                query: {
                    tokenId: _item.tokenId
                }
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