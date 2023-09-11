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
                                        :price="filterAmount(_item.amount)" :name="_item.infor.name"
                                        :cardType="getCardType(_item.infor.card_type)" :nftID="_item.tokenId" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="正在出征" class="pt-4">
                        <div>
                            <div v-if="campaignList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in campaignList" :key="index"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <campaign-card type="pending" :nftRole="_item.nft_role" :time="filterTime(_item.time)"
                                        @receiveProceeds="handleReceiveCampaignProceeds(_index)"
                                        :imageUrl="_item.infor.imageUrl" :nftToken="_item.nft_token" :count="_item.count"
                                        :income="_item.income"
                                        :cammaignAttribute="this.getCammaignAttribute([_item.zhangJiao, _item.zhuGeLiang, _item.mengHuo, _item.yuanShu])"
                                        :name="_item.infor.name" />
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="财神卡" class="pt-4">
                        <div>
                            <div v-if="wealthList.length === 0">
                                <div class="text-icon-gray text-xl text-center">
                                    暂无数据
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="( _item, _index ) in wealthList" :key="index"
                                    class="rounded-lg mb-4 overflow-hidden break-inside-avoid shadow-md">
                                    <wealth-card @receiveProceeds="handleReceiveWealthProceeds(_index)" type="pending"
                                        :time="filterTime(_item.time)" :imageUrl="_item.infor.imageUrl"
                                        :name="_item.infor.name" />
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
import CampaignCard from '@/components/CampaignCard'
import WealthCard from '@/components/WealthCard'
import { ownerList, pendingOrderList } from '@/request/api_request'
import gameContractApi from '@/request/ether_request/game'

import nfts_list from '@/nft_datas/nfts_list'
import { filterTime, filterAmount } from '@/utils/filterValue'
import nftContractApi from '@/request/ether_request/nft'

import { config } from '@/const/config'
import helpContractApi from '@/request/ether_request/help'



import { Tab, Tabs, showToast } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs, PersonalAssets, AssetsCard, CampaignCard, WealthCard },
    data() {
        return {
            active: 0,
            tabList: [{ title: '所有资产' }, { title: '正在挂单' }],
            assetsList: [],
            pendingList: [],
            campaignList: [],
            wealthList: [],

            // assetsList: []
        }
    },
    mounted() {
        if (window.ethereum.selectedAddress) {
            this.getPersonNfts()
            this.getPendingOrderList()
            this.getUserInfo()
        }
        // console.log('ethereum.selectedAddress', ethereum.selectedAddress)
        // console.log(this.getCammaignAttribute([false, false, true, true]))
    },
    methods: {
        filterTime,
        filterAmount,
        //检查erc721授权状态
        async erc721ApppprovalState(contractAddress) {
            return await nftContractApi.isApprovedAll(window.ethereum.selectedAddress, contractAddress)
        },
        //erc721合约授权操作
        async erc721ContractApppproval(contractAddress) {
            const result = await nftContractApi.apppprovalForAll(contractAddress)
            return result
        },
        //获取当前财神卡能领取的金额
        async getCampaignReceiveAmount(nftIndex) {
            const result = await helpContractApi.wealthEarningsInfor(window.ethereum.selectedAddress, nftIndex)
            return result
        },
        //用户领取出征卡收益
        userReceiveCampaign(index) {
            console.log(index)
            gameContractApi.campaignEarnings(index)
                .then(res => {
                    console.log(res)
                    showToast('领取成功')
                    this.getUserInfo()
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()
                    console.log('err', err)
                })
        },
        //用户领取财神卡收益
        userReceiveWealth(index) {
            gameContractApi.wealthEarnings(index)
                .then(res => {
                    console.log(res)
                    showToast('领取成功')
                    this.getUserInfo()
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()
                    console.log('err', err)

                })
        },
        //点击领取出征卡收益
        async handleReceiveCampaignProceeds(index) {
            this.$loading.show()
            const erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
            if (erc721ApppprovalState !== true) {
                const erc721Result = await this.erc721ContractApppproval(config.game_addr)
                console.log('erc721Result', erc721Result)
                if (erc721Result.status == 1) {
                    this.userReceiveCampaign(index)
                } else {
                    this.$loading.hide()
                    showToast('授权失败')
                }
            } else {
                this.userReceiveCampaign(index)
            }

        },
        //点击领取财神卡收益
        async handleReceiveWealthProceeds(index) {
            this.$loading.show()

            const wealthAmount = await this.getCampaignReceiveAmount(index)
            if (wealthAmount == 0) {
                showToast('当前NFT可领取金额为0')
                this.$loading.hide()
                return
            }
            const erc721ApppprovalState = await this.erc721ApppprovalState(config.game_addr)
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
                this.userReceiveWealth(index)
            }


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
        //获取出征卡片的属性
        getCammaignAttribute(attrubutes) {
            let arr = []
            attrubutes.map(item => {
                arr.push(item)
            })
            if (arr.indexOf(true) == -1) return '暂无出征属性'
            arr[0] === true ? arr[0] = '张角' : arr[0] = false
            arr[1] === true ? arr[1] = '诸葛亮' : arr[1] = false
            arr[2] === true ? arr[2] = '孟获' : arr[2] = false
            arr[3] === true ? arr[3] = '袁术' : arr[3] = false
            let targetArr = arr.filter(item => {
                return item !== false
            })

            return targetArr.join("&")
        },
        //获取用户信息
        getUserInfo() {
            gameContractApi.userInfo(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('出征和财神卡', res.deposits)
                    //出征
                    let typeListCampaign = []
                    res.cards.map(item => {
                        let obj = {}
                        obj.typeID = item.nft_role > 100 ? parseInt(item.nft_role) % 100 : item.nft_role
                        obj.tokenId = item.nft_role
                        obj.nft_role = item.nft_role
                        obj.time = item.time
                        obj.nft_token = item.nft_token
                        obj.cammaignAttribute = item.zhangJiao
                        obj.count = item.count
                        typeListCampaign.push(obj)
                    })
                    let newArrCampaign = typeListCampaign.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArrCampaign.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })
                    this.campaignList = newArrCampaign

                    //财神卡
                    let typeListWealth = []
                    res.deposits.map(item => {
                        let obj = {}
                        obj.typeID = item.token_id > 100 ? parseInt(item.token_id) % 100 : item.token_id
                        obj.tokenId = item.token_id
                        obj.time = item.time
                        typeListWealth.push(obj)
                    })
                    let newArrWealth = typeListWealth.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArrWealth.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })

                    this.wealthList = newArrWealth
                    // console.log('财神卡', this.wealthList)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //获取用户的挂单列表
        getPendingOrderList() {
            pendingOrderList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('挂单', res)
                    let typeList = []
                    res.data.map(item => {
                        let obj = {}
                        obj.typeID = item.nft_id > 100 ? item.nft_id % 100 : item.nft_id
                        obj.tokenId = item.nft_id
                        obj.amount = item.amount
                        typeList.push(obj)
                    })
                    let newArr = typeList.filter((v) => nfts_list.some((val) => val.id == v.typeID))
                    newArr.map(item => {
                        nfts_list.map(_item => {
                            if (item.typeID == _item.id) {
                                item.infor = _item
                            }
                        })
                    })
                    this.pendingList = newArr
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //用户资产列表
        getPersonNfts() {
            ownerList(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('res', res)
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
                                item.infor = _item
                            }
                        })
                    })
                    this.assetsList = newArr
                    // console.log(this.assetsList)
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
        },
        toWealthDetails(_item) {
            // this.$router.push({
            //     path: '/campaign/' + _item.tokenId
            // })
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