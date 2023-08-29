<template>
    <div>
        <div class="pt-24 text-white">
            <div class="relative w-full">
                <div class="module">
                    <module-title :titleWord="goodsType === 'mall' ? '一级市场' : '二级市场'" />
                </div>
                <div class="absolute left-0">
                    <img src="@/assets/shop-bg2.png" alt="">
                </div>

                <div class="mt-20 py-10">
                    <van-tabs v-model:active="active" shrink swipeable sticky title-active-color="#E20F2A"
                        background="#121212" color="#E20F2A" @click-tab="onClickTab">
                        <van-tab v-for="( item, index ) in typeList " :title="item" class="pt-4">
                            <div class="w-full mb-6">
                                <div class="w-11/12 mr-auto ml-auto flex justify-start items-center">
                                    <div class="mr-6">
                                        <van-popover v-model:show="toggleStage" :actions="actionsStage"
                                            v-if="goodsType === 'market'" :close-on-click-outside="closeOnClickAction"
                                            theme="dark" placement="bottom-start">
                                            <div class="py-2 px-2">
                                                <div v-for="(item, index) in actionsStage" class="mb-2" :key="index">
                                                    <div class="mb-1 text-base text-card-content">{{ item.text }}</div>
                                                    <div class="flex justify-start items-center">
                                                        <div class="text-xs p-2 rounded bg-more-content text-icon-gray"
                                                            v-for="(_item, _index) in item.chlid"
                                                            :class="[_index === 0 ? '' : 'ml-1', _item.checked ? 'clicked' : '']"
                                                            @click="uploadStage(_item)">
                                                            {{ _item.text }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex justify-end items-center mb-4">
                                                <div class="buy-button button-word" @click="handleConfirm">确定</div>
                                                <div class="campaign button-word ml-4 mr-2" @click="handleReset">重置</div>
                                            </div>
                                            <template #reference>
                                                <div
                                                    class="flex justify-center items-center py-2 px-2 rounded bg-language-content">
                                                    <div class="mr-2 text-sm" v-if="currentStage.length === 0">所有卡片</div>
                                                    <div class="mr-2 text-sm" v-else>
                                                        <span class="px-1" v-for="(item, index) in currentStage"
                                                            :key="index">{{ item.text }}</span>
                                                    </div>
                                                    <div class="icon iconfont icon-top transition ease-in-out duration-300"
                                                        style="font-size: 12px;" :class="toggleStage ? 'rotate-180' : ''">
                                                    </div>
                                                </div>
                                            </template>
                                        </van-popover>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 ml-auto mr-auto">
                                <div class="mb-6" v-for="(item, index ) in cardList " :key="index"
                                    @click="toMarketDetails(item)">
                                    <div v-if="goodsType === 'mall'">
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price" />
                                    </div>
                                    <div v-if="goodsType === 'market'">
                                        <market-card :imageUrl="item.imageUrl" :name="item.name" />
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import MarketCard from '@/components/MarketCard'
import MallCard from '@/components/MallCard.vue'
import nfts from '@/nft_datas/nfts'
import nfts_list from '@/nft_datas/nfts_list'


import { Tab, Tabs, Popover } from 'vant';

export default {
    components: { ModuleTitle, MarketCard, MallCard, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popover.name]: Popover },
    data() {
        return {
            typeList: ['NFT角色卡', '合成道具卡', '战法道具卡', '出征令牌'],
            goodsType: 'mall',
            toggleStage: false,
            toggleTime: false,
            togglePrice: false,
            currentStage: [],
            closeOnClickAction: false,
            priceSort: '升序',
            actionsStage: [
                { text: '武圣出山', chlid: [{ text: '美髯公', checked: false }, { text: '汉寿侯', checked: false }, { text: '武圣', checked: false }] },
                { text: '百战封神', chlid: [{ text: '桃园结义', checked: false }, { text: '水淹七军', checked: false }, { text: '五虎上将', checked: false }, { text: '威震华夏', checked: false }, { text: '千里单骑', checked: false }] },
                { text: '万世流芳', chlid: [{ text: '忠义仁勇', checked: false }, { text: '武财神', checked: false }] },
            ],
            actionsTime: [
                { text: '升序' },
                { text: '降序' },
            ],
            actionsPrice: [
                { text: '升序' },
                { text: '降序' },
            ],
            // marketList: [
            //     {
            //         imageUrl: require('../../assets/wuhushangjiang.png'),
            //         name: '關羽',
            //     },
            //     {
            //         imageUrl: require('../../assets/taoyuanjieyi.png'),
            //         name: '關羽',
            //     },
            //     {
            //         imageUrl: require('../../assets/shuiyanqijun.png'),
            //         name: '關羽',
            //     },
            //     {
            //         imageUrl: require('../../assets/shuiyanqijun.png'),
            //         name: '黃忠',
            //     },
            //     {
            //         imageUrl: require('../../assets/wuhushangjiang.png'),
            //         name: '黃忠',
            //     },
            // ],
            nfts: [],
            cardList: []
        }
    },
    mounted() {
        this.goodsType = this.$route.query.type
        this.nfts = nfts
        this.cardList = nfts_list
        this.cardList = nfts_list.filter(item => {
            return item.card_type === 'nft_role'
        })
    },
    methods: {
        onClickTab(item) {
            console.log(item.name)
            switch (item.name) {
                case 0: this.cardList = nfts_list.filter(item => {
                    return item.card_type === 'nft_role'
                });
                    break;
                //合成道具卡
                case 1: this.cardList = nfts_list.filter(item => {
                    return item.card_type === 'synthesis_props'
                });
                    break;
                // 战法道具卡
                case 2: this.cardList = nfts_list.filter(item => {
                    return item.card_type === 'tactics_props'
                });
                    break;
                // 出征令牌
                case 3: this.cardList = nfts_list.filter(item => {
                    return item.card_type === 'expedition_order'
                });
            }
        },
        toMarketDetails(item) {
            this.$router.push({
                path: '/good/' + item.id
            })
        },
        onSelectStage(action) {
            console.log(action)

        },
        onSelectPrice(action) {
            this.priceSort = action.text
        },
        handleConfirm() {
            let arr = []
            this.actionsStage.map(item => {
                item.chlid.map(_item => {
                    arr.push(_item)
                })
            })
            this.currentStage = arr.filter(item => {
                return item.checked === true
            })
            this.toggleStage = false
            console.log(this.currentStage)
        },
        handleReset() {
            this.actionsStage.map(item => {
                item.chlid.map(_item => {
                    _item.checked = false
                })
            })
            this.currentStage = []
        },
        uploadStage(_item) {
            _item.checked = !_item.checked
            console.log(_item)
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain
}

.module {
    @apply w-11/12 mr-auto ml-auto;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-2 px-4 rounded text-sm flex justify-center items-center text-primary-word;
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}

.clicked {
    background: black;
    @apply shadow-lg;
}
</style>