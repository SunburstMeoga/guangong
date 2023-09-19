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
                        <van-tab title="NFT角色卡">
                            <div class="w-11/12 ml-auto mr-auto mt-2">
                                <div class="mb-6" v-for="(item, index ) in nftCards " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price"
                                            :card_type="item.card_type" />
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="合成道具卡">
                            <div class="w-11/12 ml-auto mr-auto mt-2">
                                <div class="mb-6" v-for="(item, index ) in synthesisPropCards " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price"
                                            :card_type="item.card_type" />
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="战法道具卡">
                            <div class="w-11/12 ml-auto mr-auto mt-2">
                                <div class="mb-6" v-for="(item, index ) in racticsPropCards " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name"
                                            :price="Math.ceil(Number(item.price * WGTPoint).toFixed(4))"
                                            :card_type="item.card_type" />
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="出征令牌">
                            <div class="w-11/12 ml-auto mr-auto mt-2">
                                <div class="mb-6" v-for="(item, index ) in campaignTokens " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name"
                                            :price="Math.ceil(Number(item.price * WGTPoint).toFixed(4))"
                                            :card_type="item.card_type" />
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="财神卡">
                            <div class="w-11/12 ml-auto mr-auto mt-2">
                                <div class="mb-6" v-for="(item, index ) in wealthCards " :key="index"
                                    @click="toGoodDetails(item)">
                                    <div>
                                        <mall-card :imageUrl="item.imageUrl" :name="item.name" :price="item.price"
                                            :card_type="item.card_type" />
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
import gameContractApi from '@/request/ether_request/game'
import { Tab, Tabs, Popover, showToast } from 'vant';

export default {
    components: { ModuleTitle, MallCard, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popover.name]: Popover },
    data() {
        return {
            typeList: ['NFT角色卡', '合成道具卡', '战法道具卡', '出征令牌', '财神卡'],
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
            nftCards: [],
            synthesisPropCards: [],
            racticsPropCards: [],
            campaignTokens: [],
            wealthCards: [],
            WGTPoint: 0
        }
    },
    async mounted() {
        this.nftCards = nfts_list.filter(item => {
            return item.id === 1
        })
        this.$loading.show()

        try {
            let WGTPoint = await this.getWGTFromUSDT(100)
            this.WGTPoint = Number(WGTPoint) / 100
            console.log('WGTPoint', this.WGTPoint)
            this.$loading.hide()

        } catch {
            this.$loading.hide()

            showToast('NFT价格获取错误，请刷新页面')
        }
    },
    methods: {
        async getWGTFromUSDT(value) {
            let amount = value.toString()
            // gameContractApi.WGTFromUSDT(amount)
            const result = await gameContractApi.WGTFromUSDT(amount)
            console.log('换算完值', result)
            return result
        },
        onClickTab(item) {
            console.log(item.name)
            // this.cardList = []
            switch (item.name) {
                case 0: this.nftCards = nfts_list.filter(item => {
                    return item.id === 1
                });
                    break;
                //合成道具卡
                case 1: this.synthesisPropCards = nfts_list.filter(item => {
                    return item.card_type === 'synthesis_props'
                });
                    break;
                // 战法道具卡
                case 2: this.racticsPropCards = nfts_list.filter(item => {
                    return item.card_type === 'tactics_props'
                });
                    break;
                // 出征令牌
                case 3: this.campaignTokens = nfts_list.filter(item => {
                    return item.card_type === 'expedition_order'
                });
                // 财神卡
                case 4: this.wealthCards = nfts_list.filter(item => {
                    return item.card_type === 'fortune_card'
                });
            }
        },
        toGoodDetails(item) {
            if (!window.ethereum) {
                showToast('请使用钱包打开浏览器以获得更好的体验')
                return
            }
            if (!window.ethereum.selectedAddress) {
                showToast('请连接钱包')
                return
            }
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