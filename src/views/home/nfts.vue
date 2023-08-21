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
                        background="#121212" color="#E20F2A">
                        <van-tab v-for="( item, index ) in   typeList " :title="item" class="pt-4">
                            <div class="w-full mb-6">
                                <div class="w-11/12 mr-auto ml-auto flex justify-start items-center">
                                    <div class="mr-6">
                                        <van-popover v-model:show="toggleStage" :actions="actionsStage"
                                            :close-on-click-action="closeOnClickAction" @select="onSelectStage" theme="dark"
                                            placement="bottom-start">
                                            <div class="py-2 px-2">
                                                <div v-for="(item, index) in actionsStage" class="mb-2" :key="index">
                                                    <div class="mb-1 text-base text-card-content">{{ item.text }}</div>
                                                    <div class="flex justify-start items-center">
                                                        <div class="text-xs p-2 rounded bg-more-content text-icon-gray"
                                                            :class="[_index === 0 ? '' : 'ml-1', _item.checked ? 'bg-black' : '']"
                                                            v-for="(_item, _index) in item.chlid"
                                                            @click="uploadStage(_item)">
                                                            {{ _item.text }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <template #reference>
                                                <div
                                                    class="flex justify-center items-center py-2 px-2 rounded bg-language-content">
                                                    <div class="mr-2 text-sm">{{ currentStage.join(',') }}</div>
                                                    <div class="icon iconfont icon-top transition ease-in-out duration-300"
                                                        style="font-size: 12px;" :class="toggleStage ? 'rotate-180' : ''">
                                                    </div>
                                                </div>
                                            </template>
                                        </van-popover>
                                    </div>
                                    <div>
                                        <van-popover v-model:show="togglePrice" :actions="actionsPrice"
                                            @select="onSelectPrice" theme="dark" placement="bottom-start">
                                            <template #reference>
                                                <div
                                                    class="flex justify-center items-center py-2 px-2 rounded bg-language-content">
                                                    <div class="mr-2 text-sm">价格：{{ priceSort }}</div>
                                                    <div class="icon iconfont icon-top transition ease-in-out duration-300"
                                                        style="font-size: 12px;" :class="togglePrice ? 'rotate-180' : ''">
                                                    </div>
                                                </div>
                                            </template>
                                        </van-popover>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 ml-auto mr-auto">
                                <div class="mb-6" v-for="( item, index ) in  marketList " :key="index"
                                    @click="toMarketDetails()">
                                    <div v-if="goodsType === 'mall'">
                                        <!-- <div class="columns-2 gap-x-3">
                                            <mall-card :imageUrl="item.imageUrl" />
                                        </div> -->
                                        <mall-card :imageUrl="item.imageUrl" />

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


import { Tab, Tabs, Popover } from 'vant';

export default {
    components: { ModuleTitle, MarketCard, MallCard, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popover.name]: Popover },
    data() {
        return {
            typeList: ['NFT角色卡', '合成道具卡', '战法道具卡'],
            goodsType: 'mall',
            toggleStage: false,
            toggleTime: false,
            togglePrice: false,
            currentStage: ['筛选'],
            closeOnClickAction: false,
            priceSort: '升序',
            actionsStage: [
                { text: '武圣出山', chlid: [{ text: '美髯公', checked: false }, { text: '汉寿侯', checked: false }, { text: '美髯武圣公', checked: false }] },
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
            marketList: [
                {
                    imageUrl: require('../../assets/wuhushangjiang.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/taoyuanjieyi.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/shuiyanqijun.png'),
                    name: '關羽',
                },
                {
                    imageUrl: require('../../assets/shuiyanqijun.png'),
                    name: '黃忠',
                },
                {
                    imageUrl: require('../../assets/wuhushangjiang.png'),
                    name: '黃忠',
                },
            ]
        }
    },
    mounted() {
        this.goodsType = this.$route.query.type
        console.log('goodsType', this.goodsType)
    },
    methods: {
        onSelectStage(action) {
            console.log(action)

        },
        onSelectPrice(action) {
            this.priceSort = action.text
        },
        uploadStage(_item) {
            _item.checked = !_item.checked
            console.log(_item)
            if (_item.checked) {
                this.currentStage.push(_item.text)
            }
        }
    }
}
</script>

<style scopeed>
img {
    width: 100%;
    height: 100%;
    object-fit: contain
}

.module {
    @apply w-11/12 mr-auto ml-auto;
}
</style>