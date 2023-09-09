<template>
    <div>
        <div class="pt-24 text-white">
            <div class="relative w-full">
                <div class="module">
                    <module-title titleWord="官方发售" />
                </div>
                <div class="absolute left-0">
                    <img src="@/assets/shop-bg2.png" alt="">
                </div>

                <div class="mt-20 py-10">
                    <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                        color="#E20F2A" @click-tab="onClickTab">
                        <van-tab v-for="( item, index ) in typeList " :title="item" class="pt-4">

                            <div class="w-11/12 ml-auto mr-auto">
                                <div class="mb-6" v-for="(item, index ) in cardList " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price" />
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
import MallCard from '@/components/MallCard.vue'
import nfts_list from '@/nft_datas/nfts_list'
import { Tab, Tabs, Popover } from 'vant';

export default {
    components: { ModuleTitle, MallCard, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popover.name]: Popover },
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

            actionsTime: [
                { text: '升序' },
                { text: '降序' },
            ],
            actionsPrice: [
                { text: '升序' },
                { text: '降序' },
            ],
            nfts: [],
            cardList: []
        }
    },
    mounted() {
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
        toGoodDetails(item) {
            this.$router.push({
                path: '/good/' + item.id
            })
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