<template>
    <div>
        <div>
            <div class="py-8 top-0 sticky flex justify-center z-10 bg-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">{{ pageTitle }}</div>
                </div>
            </div>
            <div class="pt-4 pb-12">
                <div
                    class="relative ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-4">
                    <div class="w-80 h-80">
                        <img :src="nftInfor.imageUrl" alt="">
                    </div>
                    <div
                        class="absolute top-0 left-0 rounded-br-xl inline-block px-2 py-1 bg-success-undertone text-sm text-success-word">
                        {{ getCardType(nftInfor.card_type) }}
                    </div>
                </div>

                <div class="flex flex-col justify-start items-center mb-10">
                    <div class="w-11/12 text-card-content font-medium text-3xl mb-4">
                        <div>
                            {{ nftInfor.name }}
                        </div>
                        <div class="text-icon-gray text-base mt-2">
                            No. {{ tokenId }}
                        </div>
                        <div class="text-icon-gray text-base mt-2" v-if="assetState === 'pending-order'">
                            挂单价格：{{ filterAmount(opendingOrderNFTDetails.amount) }}
                        </div>
                    </div>
                    <div class="w-11/12 flex justify-between items-center border-module" v-if="assetState === 'assets'">
                        <div class="buy-button button-word w-full text-lg" @click="handlePendingOrder">
                            挂单
                        </div>
                    </div>
                    <div class="w-11/12 flex justify-between items-center border-module"
                        v-if="assetState === 'pending-order'">
                        <div class="buy-button button-word w-full text-lg" @click="handleCancelPendingOrder">
                            撤销挂单
                        </div>
                    </div>
                    <!-- 角色卡介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'nft_role'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">詳細資料</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">階段</div>
                                <div class="text-base text-card-content">{{ nftInfor.stage }}</div>
                            </div>

                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征令牌</div>
                                <div class="text-base text-card-content">{{ nftInfor.outbound_tokens }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">令牌價（等值WGT）</div>
                                <div class="text-base text-card-content">{{ nftInfor.token_value }}</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">週期</div>
                                <div class="text-base text-card-content">{{ nftInfor.cycle }}</div>

                            </div>

                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">月化利率</div>
                                <div class="text-base text-card-content">{{ nftInfor.monthly_interest_rate }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">損耗週期</div>
                                <div class="text-base text-card-content">{{ nftInfor.loss_period }} 次</div>

                            </div>
                        </div>
                    </div>
                    <!-- 战法道具卡介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'tactics_props'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">{{ nftInfor.name }}道具卡详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">技能</div>
                                <div class="text-base text-card-content">{{ nftInfor.prop_features }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">限制</div>
                                <div class="text-base text-card-content">{{ nftInfor.target }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">发行量</div>
                                <div class="text-base text-card-content">{{ nftInfor.number_of_issues }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">注意事项</div>
                                <div class="text-base  text-theme-primary font-semibold">{{ nftInfor.tips }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 出征令牌介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'expedition_order'">
                        <div class="flex justify-between items-center">
                            <div class="text-base ">可用于以下NFT卡片出征</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <!-- <div class="mb-2 text-xs text-icon-gray">可用于以下NFT卡片出征</div> -->
                                <div class="text-2xl  text-card-content">{{ nftInfor.can_be_used.join("，") }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 财神卡介绍 -->
                    <div class="border-module w-11/12 text-card-content" v-if="nftInfor.card_type == 'fortune_card'">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">{{ nftInfor.name }}财神卡详情</div>
                        </div>
                        <div class="mt-8">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">阶段</div>
                                <div class="text-base text-card-content">{{ nftInfor.level }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">角色价值 等值 WGT）U</div>
                                <div class="text-base text-card-content">{{ nftInfor.circulation }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">财神奖励 等值 WGT）U</div>
                                <div class="text-base text-card-content">{{ nftInfor.award }}</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">周期（天）</div>
                                <div class="text-base text-card-content">{{ nftInfor.cycle }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="border-module w-11/12 text-card-content" @click="showIssue = !showIssue">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">發行方</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showIssue ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8 flex justify-start items-center h-14" v-show="showIssue">
                            <div class="rounded-full overflow-hidden w-10 h-10 bg-theme-primary">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="ml-2 flex flex-col justify-between">
                                <div class="text-white font-medium">由 世界關公寶WGT 发行</div>
                                <div class="text-icon-gray">Oct 28, 2022 at 12:34am</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fixed flex justify-between items-center left-0 bottom-0 w-full py-4 px-4 bg-bottom-content"
                    v-if="assetState === 'assets' && nftInfor.card_type == 'nft_role'">
                    <div class="buy-button w-6/12 text-primary-word text-lg button-word" @click="getUserAcountFromNFTType"
                        v-if="nftInfor.outbound_tokens_id !== 87">
                        升级
                    </div>
                    <div class="bg-more-content campaign  flex-1 ml-2 text-primary-word text-lg button-word"
                        @click="handleCampaign">
                        出征
                    </div>
                </div>
                <div class="fixed flex justify-between items-center left-0 bottom-0 w-full py-4 px-4 bg-bottom-content"
                    v-if="assetState === 'assets' && nftInfor.card_type == 'tactics_props'">
                    <div class="bg-more-content campaign w-full ml-2 text-primary-word text-lg button-word"
                        @click="handlePropsCard">
                        使用道具卡
                    </div>
                </div>
            </div>
        </div>
        <!-- 合成弹窗 -->
        <van-popup v-model:show="showSynthesis">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">合成</div>
                <div class="w-40 h-40 flex justify-center rounded-xl overflow-hidden items-center bg-black mb-3">
                    <div class="w-32 h-32">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="text-xl mb-2">所需合成材料</div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">美髯公 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">赤兔马 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">青龙偃月刀 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div>
                <div class="w-11/12 mt-4 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                    @click="showSynthesis = false">
                    确认合成
                </div>
                <div class="w-11/12 mt-4 text-tips-word bg-bottom-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                    @click="showSynthesis = false">
                    取消
                </div>
            </div>
        </van-popup>
        <!-- 挂单弹窗 -->
        <van-popup v-model:show="showPendingOrder">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">NFT挂单</div>
                <div class="w-11/12 text-sm mb-1">
                    挂单金额（USDT）
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <input class="w-full h-full bg-bottom-content" type="number" v-model="pendingOrderAmount"
                        placeholder="请输入挂单金额">
                </div>
                <div class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                    @click="handleConfirmPendingOrder">
                    确认挂单
                </div>
                <div class="w-11/12 mt-4 text-tips-word bg-bottom-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                    @click="showPendingOrder = false">
                    取消
                </div>
            </div>
        </van-popup>
        <!-- 取消挂单弹窗 -->
        <van-popup v-model:show="showCancelPendingOrder">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">是否确认撤销该NFT挂单</div>
                <div class="w-11/12 text-sm mb-1">
                    NFT Token
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    No.{{ opendingOrderNFTDetails.nft_id }}
                </div>
                <div class="w-11/12 text-sm mb-1">
                    NFT挂单金额
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    {{ filterAmount(opendingOrderNFTDetails.amount) }}
                </div>
                <div class="w-11/12 text-sm mb-1">
                    NFT挂单时间
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    {{ filterTime(opendingOrderNFTDetails.utc) }}
                </div>
                <div class="flex w-11/12 justify-between items-center">

                    <div class="w-5/12  text-tips-word bg-bottom-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showCancelPendingOrder = false">
                        否
                    </div>
                    <div class="w-5/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="handleConfirmCancelPendingOrder">
                        是
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 出征令弹窗 -->
        <van-popup v-model:show="showOutToken">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择{{ nftInfor.outbound_tokens }}</div>
                <div @click="clickOutToken(index)" v-for="(item, index) in outTokenList" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentOutToken === index ? 'buy-button text-white' : ''">
                    {{ nftInfor.outbound_tokens }} No.{{ item.tokenId }}
                </div>
                <div class="flex w-11/12 justify-between items-center mt-6">

                    <div class="w-4/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showOutToken = false">
                        取消
                    </div>
                    <div class="w-7/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="confirmCampaign">
                        确认使用并出征
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 战法道具卡弹窗 -->
        <van-popup v-model:show="showPropsCard">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">"{{ nftInfor.name }}"战法道具卡</div>

                <div class="w-11/12 text-sm mb-1">
                    道具卡技能
                </div>
                <div
                    class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    {{ nftInfor.prop_features }}
                </div>
                <div class="w-11/12 text-sm mb-1">
                    {{ nftInfor.id === 60 ? '只能对自己使用' : '作用对象地址' }}
                </div>
                <div v-if="nftInfor.id === 60"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                    <div class="flex-1">
                        <!-- <input class="w-full h-full bg-bottom-content text-xs break-all" type="text"
                            v-model="propsEffectaAddress" placeholder="道具卡作用对象地址" :disabled="nftInfor.id === 60" /> -->
                        {{ propsEffectaAddress }}
                    </div>
                    <div class="bg-language-content flex justify-evenly items-center p-1 text-essentials-white text-xs rounded"
                        @click="getUserAddress" v-if="showGetUserAddress"
                        v-show="nftInfor.id === 59 || nftInfor.id === 63 || nftInfor.id === 61">
                        填入我的地址
                    </div>
                </div>
                <div v-else class="w-11/12">
                    <div
                        class="mb-4 break-all text-tips-word w-full  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <div>
                            <input class="w-full h-full bg-bottom-content text-sm break-all" type="text"
                                v-model="propsEffectaAddress" placeholder="请输入作用地址或选择" />
                        </div>
                    </div>
                    <div
                        class="mb-4 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <div @click="handleChoiceAddress">
                            选择作用地址
                        </div>
                    </div>
                    <div v-if="nftInfor.id == 59"
                        class="mb-4 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <div @click="handleChoiceAddressNFT">
                            选择作用地址下的NFT角色卡
                        </div>
                    </div>
                    <div v-if="nftInfor.id == 59"
                        class="mb-4 break-all text-tips-word w-full  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <div>
                            当前选择角色卡编号：{{ propEffectNftRole }}
                        </div>
                    </div>
                </div>

                <div class="flex w-11/12 justify-between items-center mt-6">
                    <div class="w-5/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showPropsCard = false">
                        取消
                    </div>
                    <div class="w-5/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="handlePropCard(nftInfor.id)">
                        使用
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 选择地址弹窗 -->
        <van-popup v-model:show="showAddressSelect" round position="bottom" :close-on-click-overlay="false">
            <van-picker title="请选择地址" :columns="lowerAddressList" confirm-button-text @confirm="confirmAddress"
                @cancel="showAddressSelect = false, showPropsCard = true" />
        </van-popup>

        <!-- 当前选择的地址下正在出征nft弹窗 -->
        <van-popup v-model:show="showCardFromAddress" round position="bottom" :close-on-click-overlay="false">
            <van-picker title="请选择NFT" :columns="expeditionCards" confirm-button-text @confirm="handleConfirmEffectCard"
                @cancel="showCardFromAddress = false, showPropsCard = true" />
        </van-popup>
    </div>
</template>

<script>
import { Popup, showToast, Picker } from 'vant';
import { config } from '@/const/config'
import nfts_list from '@/nft_datas/nfts_list'
import gameContractApi from '@/request/ether_request/game'
import wgtContractApi from '@/request/ether_request/wgt'
import nftContractApi from '@/request/ether_request/nft'
import marketContractApi from '@/request/ether_request/market'
import { pendingOrderApi, cancelOrderApi, nftDetails, outboundTokens, acountFromNFTType } from '@/request/api_request'
import { filterAmount, filterTime } from '@/utils/filterValue'
import popularContractApi from '@/request/ether_request/popularized'

export default {
    components: { [Popup.name]: Popup, [Picker.name]: Picker },
    data() {
        return {
            showSynthesis: false,
            showNextStage: true,
            showStage: true,
            showRequest: true,
            showDetails: true,
            showIssue: true,
            nftInfor: {},
            tokenId: '',
            showPendingOrder: false,
            pendingOrderAmount: null,
            assetState: '',
            pageTitle: '',
            showCancelPendingOrder: false,
            showPropsCard: false,
            showOutToken: false,
            currentOutToken: 0,
            outTokenList: [],
            propsEffectaAddress: '',
            opendingOrderNFTDetails: {},
            showGetUserAddress: true,
            propsCardList: [
                { name: '华佗', nftType: 59, isChecked: false, acount: 7 },
                { name: '张角', nftType: 60, isChecked: false, acount: 2 },
                { name: '诸葛亮', nftType: 61, isChecked: false, acount: 4 },
                { name: '孟获', nftType: 62, isChecked: false, acount: 1 },
                { name: '袁术', nftType: 63, isChecked: false, acount: 3 }
            ],
            currentProps: [],
            lowerAddressList: [],
            showAddressSelect: false,
            propEffectNftIndex: null,
            propEffectNftRole: '',
            expeditionCards: [],
            loadingExpeditionCards: false,
            showCardFromAddress: false,
            needArr: []
        }
    },
    mounted() {
        this.assetState = this.$route.name
        if (this.$route.params.tokenId) {
            this.tokenId = this.$route.params.tokenId
        }
        if (this.assetState === 'assets') {
            this.pageTitle = '资产详情'
            const nftItem = nfts_list.filter(item => {
                return item.id === (parseInt(this.$route.params.tokenId)) % 100
            })
            this.nftInfor = nftItem[0]
        } else if (this.assetState === 'pending-order') {
            this.pageTitle = '正在挂单'
            this.getNFTDetails()
        } else if (this.assetState === 'campaign') {
            this.pageTitle = '正在出征'
            // this.getNFTDetails()
        }

        //
        if (this.nftInfor.id === 60) {
            this.propsEffectaAddress = window.ethereum.selectedAddress
        }
        if (this.nftInfor.id !== 62) {
            this.lowerAddressList = [{ text: window.ethereum.selectedAddress, value: 0 }]
        }
        // this.getLowerAddress()
        console.log('nftItem', this.nftInfor)
        console.log(this.tokenId)
    },
    methods: {
        filterAmount, filterTime,

        handleChoiceAddressNFT() {
            console.log(this.expeditionCards)
            if (this.expeditionCards.length == 0) {
                showToast('当前地址暂无出征卡片')
                return
            }
            this.showCardFromAddress = true
        },
        //点击选中的作用nft
        handleConfirmEffectCard(value) {
            console.log(value)
            this.propEffectNftIndex = this.expeditionCards[value.selectedIndexes].value
            this.propEffectNftRole = this.expeditionCards[value.selectedIndexes].text
            this.showCardFromAddress = false
        },
        //获取某个地址下正在出征的nft
        getExpeditionCards(walletAddress) {
            this.expeditionCards = []
            gameContractApi.userInfo(walletAddress)
                .then(res => {
                    console.log('res', res.cards)
                    res.cards.map((item, index) => {
                        let obj = {}
                        obj.text = 'No.' + item.nft_role
                        obj.value = index
                        this.expeditionCards.push(obj)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 获取道具卡施法地址正在出征的卡片
        async getPropEffectNftIndex(walletAddress) {
            return await gameContractApi.userInfo(walletAddress)
        },
        //点击选择地址唤起选择地址弹窗
        handleChoiceAddress() {
            if (this.lowerAddressList.length == 0) {
                showToast('当前暂无下级地址')
                return
            }
            this.showAddressSelect = true
        },
        //获取当前地址的下级地址
        getLowerAddress() {
            popularContractApi.relationshipAddress(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('推荐关系地址', res.child)
                    res.child.map(item => {
                        let obj = {}
                        obj.text = item
                        obj.value = item
                        this.lowerAddressList.push(obj)
                    })
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //卡类型
        getCardType(value) {
            switch (value) {
                case 'nft_role': return 'NFT角色卡'
                case 'tactics_props': return '战法道具卡'
                case 'expedition_order': return '出征令牌'
                case 'synthesis_props': return '合成道具卡'
                case 'fortune_card': return '财神卡'
            }
        },
        //地址弹窗数据发生变化
        async changeAddress(value) {
            console.log('change', value)
            return
            this.loadingExpeditionCards = true
            const expeditionCards = await this.getExpeditionCards(this.propsEffectaAddress)
        },
        //确认地址选择器选中的地址
        async confirmAddress(value) {
            console.log('value', value)
            console.log(this.lowerAddressList[value.selectedIndexes].text, this.propEffectNftIndex)
            this.propsEffectaAddress = this.lowerAddressList[value.selectedIndexes].text
            this.getExpeditionCards(this.propsEffectaAddress)

            this.showAddressSelect = false
            this.showPropsCard = true
        },
        //获取用户地址并填入
        getUserAddress() {
            this.propsEffectaAddress = window.ethereum.selectedAddress
        },
        //点击道具卡选项
        clickPropsCard(item, index) {
            this.currentProps = index
            if (item.acount === 0) {
                showToast(`${item.name}道具卡剩余0张`)
                return
            }
            item.isChecked = !item.isChecked
            this.currentProps = this.propsCardList.filter(item => {
                return item.isChecked
            })
            console.log(this.currentProps)
        },

        //点击出征令选项
        clickOutToken(index) {
            this.currentOutToken = index
        },

        //点击战法道具卡弹窗确认按钮
        async handlePropCard(nftType) {
            if (!this.propsEffectaAddress) {
                showToast(`请填写"${this.nftInfor.name}"道具卡作用地址`)
                return
            }
            this.$loading.show()

            // const testIndex = await this.getPropEffectNftIndex(this.propsEffectaAddress)
            // console.log('testIndex', testIndex)
            // return

            let erc721ApppprovalState;
            try {
                erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            console.log('erc721ApppprovalState', erc721ApppprovalState)
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        this.erc721ContractApppproval(config.game_addr)
                            .then(res => {
                                console.log(res)
                                this.$confirm.hide()
                                this.$loading.hide()
                                showToast('授权成功')
                            })
                            .catch(err => {
                                this.$confirm.hide()
                                this.$loading.hide()

                                showToast('授权失败')
                            })
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            } else {
                this.getUsePropCard(this.nftInfor.id)
            }
        },

        //当前使用的战法道具卡
        getUsePropCard(nftType) {

            switch (nftType) {
                case 59: this.usePropsFromHuaTuo()
                    break;
                case 60: this.usePropsFromZhangJiao(this.tokenId)
                    break;
                case 61: this.usePropsFromZhuGeLiang(this.propsEffectaAddress, this.tokenId)
                    break;
                case 62: this.usePropsFromMengHuo(this.propsEffectaAddress, this.tokenId)
                    break;
                case 63: this.usePropsFromYuanShu(this.propsEffectaAddress, this.tokenId)
                    break;
            }
        },
        //使用华佗道具卡
        async usePropsFromHuaTuo() {
            if (this.propEffectNftIndex === null) {
                console.log(this.propEffectNftIndex)
                this.$loading.hide()
                showToast('请选择作用地址的角色卡')
                return
            }
            console.log('华佗道具卡', this.propsEffectaAddress, this.propEffectNftIndex, this.nftInfor.id)
            gameContractApi.huatuoProps(this.propsEffectaAddress, this.propEffectNftIndex, this.tokenId)
                .then(res => {
                    showToast(`${this.nftInfor.name}道具卡使用成功`)
                    this.$loading.hide()
                    window.history.back()
                })
                .catch(err => {
                    showToast(`${this.nftInfor.name}道具卡使用失败`)
                    console.log(err)
                })
        },

        //使用张角道具卡
        async usePropsFromZhangJiao(nftType) {
            console.log('张角道具卡', nftType)
            gameContractApi.zhangjiaoProps(nftType)
                .then(res => {
                    showToast(`${this.nftInfor.name}道具卡使用成功`)
                    this.$loading.hide()
                    window.history.back()
                })
                .catch(err => {
                    showToast(`${this.nftInfor.name}道具卡使用失败`)
                    this.$loading.hide()

                    console.log(err)
                })
        },

        //使用诸葛亮道具卡
        async usePropsFromZhuGeLiang(walletAddress, nftId) {
            console.log('诸葛亮道具卡')
            gameContractApi.zhugeliangProps(walletAddress, nftId)
                .then(res => {
                    showToast(`${this.nftInfor.name}道具卡使用成功`)
                    this.$loading.hide()
                    window.history.back()
                })
                .catch(err => {
                    showToast(`${this.nftInfor.name}道具卡使用失败`)
                    this.$loading.hide()

                    console.log(err)
                })
        },

        //使用孟获道具卡
        async usePropsFromMengHuo(walletAddress, nftId) {
            console.log('孟获道具卡')
            console.log(this.propsEffectaAddress.toUpperCase(), (window.ethereum.selectedAddress).toUpperCase())
            if (this.propsEffectaAddress.toUpperCase() == (window.ethereum.selectedAddress).toUpperCase()) {
                showToast(`"${this.nftInfor.name}"只能对他人使用`)
                this.$loading.hide()
                return
            }
            gameContractApi.menghuoProps(walletAddress, nftId)
                .then(res => {
                    showToast(`${this.nftInfor.name}道具卡使用成功`)
                    this.$loading.hide()
                    window.history.back()
                })
                .catch(err => {
                    showToast(`${this.nftInfor.name}道具卡使用失败`)
                    this.$loading.hide()

                    console.log(err)
                })
        },

        //使用袁术道具卡
        async usePropsFromYuanShu(walletAddress, nftId) {
            console.log('袁术道具卡')
            if (this.propsEffectaAddress.toUpperCase() !== (window.ethereum.selectedAddress).toUpperCase()) {
                showToast(`"${this.nftInfor.name}"只能对自己使用`)
                return
            }
            gameContractApi.yuanshuProps(walletAddress, nftId)
                .then(res => {
                    showToast(`${this.nftInfor.name}道具卡使用成功`)
                    this.$loading.hide()
                    window.history.back()
                })
                .catch(err => {
                    showToast(`${this.nftInfor.name}道具卡使用失败`)
                    this.$loading.hide()

                    console.log(err)
                })

        },

        //点击取消挂单按钮唤起弹窗
        handleCancelPendingOrder() {
            this.showCancelPendingOrder = true
        },
        //点击取消挂单弹窗确认按钮
        handleConfirmCancelPendingOrder() {
            this.cancelPendingOrder()
        },
        cancelPay() {
            window.history.back();
        },
        //撤销挂单操作
        cancelPendingOrder() {
            console.log(this.opendingOrderNFTDetails.nft_id)
            // return
            this.showCancelPendingOrder = false
            this.$loading.show()
            marketContractApi.redemptionNFT(this.opendingOrderNFTDetails.nft_id)
                .then(res => {
                    console.log('撤销挂单', res)
                    this.updataCancelOrderApi()
                    this.$loading.hide()

                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                    showToast('取消失败')
                })
        },
        //获取资产详情
        getNFTDetails() {
            console.log('this.tokenId', this.tokenId)
            nftDetails(this.tokenId)
                .then(res => {
                    console.log('资产详情', res)
                    this.opendingOrderNFTDetails = res.data
                    const nftItem = nfts_list.filter(item => {
                        const nftType = res.data.nft_id > 100 ? res.data.nft_id % 100 : res.data.nft_id
                        return item.id === nftType
                    })
                    this.nftInfor = nftItem[0]
                    console.log(this.nftInfor)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //挂单
        userPendingOrder() {
            console.log(this.tokenId, this.pendingOrderAmount)
            // return
            marketContractApi.pendingOrder(this.tokenId, (this.pendingOrderAmount).toString())
                .then(res => {
                    console.log('挂单成功', res)
                    this.updataPendingOrder()
                    this.$loading.hide()

                    window.history.back()
                })
                .catch(err => {
                    console.log(err)
                    showToast('挂单失败，请重新挂单')
                    this.$loading.hide()
                })
        },
        //挂单弹窗 确认挂单按钮
        async handleConfirmPendingOrder() {
            if (!this.pendingOrderAmount) {
                showToast('请输入挂单金额')
                return
            }
            this.$loading.show()
            // const erc20ApppprovalState = await this.erc20ApppprovalState()
            let erc721ApppprovalState;
            try {
                erc721ApppprovalState = await this.erc721ApppprovalState(config.market_addr)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            console.log('erc721ApppprovalState', erc721ApppprovalState)
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.showPendingOrder = false
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        this.erc721ContractApppproval(config.market_addr)
                            .then(res => {
                                console.log(res)
                                this.$confirm.hide()
                                this.$loading.hide()
                                showToast('授权成功')
                            })
                            .catch(err => {
                                this.$confirm.hide()
                                this.$loading.hide()

                                showToast('授权失败')
                            })
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            } else {
                this.userPendingOrder()
            }
        },
        //取消挂单数据上传到数据接口
        updataCancelOrderApi() {
            cancelOrderApi(this.tokenId)
                .then(res => {
                    console.log('res', res)
                    this.$loading.hide()
                    window.history.back()
                    showToast('已取消挂单')
                    this.showPendingOrder = false
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                })
        },
        //挂单数据上传到接口
        updataPendingOrder() {
            pendingOrderApi(this.tokenId, {
                owner: window.ethereum.selectedAddress,
                amount: this.pendingOrderAmount
            })
                .then(res => {
                    console.log('res', res)
                    this.$loading.hide()
                    this.showPendingOrder = false
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                })
        },
        //点击挂单按钮,弹起挂单弹窗
        async handlePendingOrder() {
            this.showPendingOrder = true
        },
        //erc20合约授权操作
        async erc20ContractApppproval() {
            const result = await wgtContractApi.approve(config.market_addr)
            return result
        },
        //erc721合约授权操作
        async erc721ContractApppproval(contractAddress) {
            const result = await nftContractApi.apppprovalForAll(contractAddress)
            return result
        },
        //检查erc20授权状态
        async erc20ApppprovalState() {
            return await wgtContractApi.isAllowance(window.ethereum.selectedAddress, contractAddress)
        },
        //检查erc721授权状态
        async erc721ApppprovalState(contractAddress) {
            return await nftContractApi.isApprovedAll(window.ethereum.selectedAddress, contractAddress)
        },
        //获取当前用户拥有的某个类型的nft
        getUserAcountFromNFTType() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            console.log(this.nftInfor.upgrade_requirements)
            let syntheticMaterials = []
            this.$loading.show()
            this.nftInfor.next_need_nfts.map(item => {
                acountFromNFTType(window.ethereum.selectedAddress, item)
                    .then(res => {
                        this.needArr.push(res.data)
                        if (res.data.length === 0) {
                            this.$loading.hide()
                            showToast(`合成需要：${this.nftInfor.upgrade_requirements}`)
                            return
                        }
                        console.log('needArr', this.needArr)
                        // syntheticMaterials = []
                        if (this.needArr.length == this.nftInfor.next_need_nfts.length) {
                            this.needArr.map((_item, _index) => {
                                syntheticMaterials[_index] = _item[0].tokenId
                            })
                            this.updataNFT(syntheticMaterials)
                            console.log(syntheticMaterials)
                        }
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            })
        },
        //合成nft
        async updataNFT(syntheticMaterials) {
            let erc721ApppprovalState
            try {
                erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.showOutToken = false
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        this.erc721ContractApppproval(config.game_addr)
                            .then(res => {
                                console.log(res)
                                this.$confirm.hide()
                                this.$loading.hide()
                                showToast('授权成功')
                            })
                            .catch(err => {
                                this.$confirm.hide()
                                this.$loading.hide()

                                showToast('授权失败')
                            })
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            }
            console.log(syntheticMaterials, this.nftInfor.next_nft_id)
            // return
            gameContractApi.synthesisNFT(syntheticMaterials, this.nftInfor.next_nft_id)
                .then((res) => {
                    console.log('合成成功', res)
                    this.$loading.hide()
                    showToast('合成成功')
                    window.history.back();
                })
                .catch(err => {
                    showToast('合成成功')

                    console.log('合成失败', err)
                    this.$loading.hide()
                })
        },

        //点击使用道具卡按钮
        handlePropsCard() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.showPropsCard = true
        },

        //获取当前出征的角色卡需要的出征令牌存货
        async campaignNeededOutboundTokens() {
            const result = await outboundTokens(window.ethereum.selectedAddress, this.nftInfor.outbound_tokens_id)
            if (result.data.length !== 0) {
                this.outTokenList = result.data
                return this.outTokenList
            }
            return result.data.length
        },

        //出征
        async userCampaign() {
            console.log(parseInt(this.tokenId), this.outTokenList[this.currentOutToken].tokenId)
            gameContractApi.setOff(parseInt(this.tokenId), this.outTokenList[this.currentOutToken].tokenId)
                .then((res) => {
                    console.log('出征成功', res)
                    this.$loading.hide()
                    window.history.back();
                })
                .catch(err => {
                    console.log('出征失败', err)
                    this.$loading.hide()
                })
        },

        //点击出征令牌弹窗的确认按钮
        async confirmCampaign() {
            this.$loading.show()
            // const erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            let erc721ApppprovalState;
            try {
                erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            } catch {
                this.$loading.hide()
                showToast('错误，请重试')
                return
            }
            console.log('erc721ApppprovalState', erc721ApppprovalState)
            if (erc721ApppprovalState !== true) {
                this.$loading.hide()
                this.showOutToken = false
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        this.erc721ContractApppproval(config.game_addr)
                            .then(res => {
                                console.log(res)
                                this.$confirm.hide()
                                this.$loading.hide()
                                showToast('授权成功')
                            })
                            .catch(err => {
                                this.$confirm.hide()
                                this.$loading.hide()

                                showToast('授权失败')
                            })
                    },
                    onCancel: () => {
                        this.$confirm.hide()
                    }
                });
                return
            } else {
                this.userCampaign()
            }
        },

        //点击底部出征按钮
        async handleCampaign() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先连接钱包')
                return
            }
            this.$loading.show()
            const tokensAcount = await this.campaignNeededOutboundTokens()
            if (tokensAcount == 0) {
                this.$loading.hide()
                showToast(`请先购买${this.nftInfor.outbound_tokens}`)
                return
            }
            this.$loading.hide()

            this.showOutToken = true
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

.border-module {
    @apply w-11/12 border-b border-card-introduce py-10 font-light;
}

.show-icon {
    @apply font-extrabold transition ease-in-out duration-200;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>