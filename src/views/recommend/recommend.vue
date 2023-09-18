<template>
    <div>
        <div>
            <div class="pt-8 pb-2">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                    <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">{{ title }}</div>
                </div>
            </div>
            <!-- <div v-show="!isLink" class="flex flex-col text-icon-gray justify-center items-center">
                <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button text-primary-word text-lg button-word" @click="linkWallet">
                        链接钱包
                    </div>
                    <br />
                </div>
            </div> -->

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
        <!-- <div v-if="isNewUser">
            新用户
        </div> -->
        <div v-else>
            <div v-if="isSign" class="flex flex-col text-icon-gray justify-center items-center">
                <div class="w-11/12 text-left mb-2">上级地址</div>
                <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-10">
                    <div class="text-sm">{{ p_address }}</div>
                </div>
                <div class="w-full py-4 px-4 ">
                    <div class="buy-button text-primary-word text-lg button-word" @click="sign">
                        签名
                    </div>
                </div>
            </div>
            <div v-if="!isRecommended && !isSign">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab title="建立关系" class="pt-4">
                        <HomeIn :recommendInfor="recommendInfor" :toBeBoundList="toBeBoundList" :shareUrl="shareUrl"
                            :canShare="canShare" @handleCode="handleCode" />
                    </van-tab>
                    <van-tab title="我的下级" class="pt-4">
                        <HomeOut :myLowerInfo="myLowerInfo" />
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <van-popup v-model:show="showCode">
            <div class="p-4  bg-white">
                <qrcode-vue :value="shareUrl" size="300"></qrcode-vue>
                <!-- <div class="buy-button text-primary-word rounded text-sm button-word mt-10" @click="saveCode">
                    保存至手机
                </div> -->
            </div>
        </van-popup>
        <!-- <HomeIn v-if="inHome" />
        <HomeOut v-else /> -->
    </div>
</template>

<script>
import { Tab, Tabs, showSuccessToast, showFailToast, showDialog, showToast, Popup } from 'vant';
import { ethers, ZeroAddress, isAddress } from "ethers"
import { config } from '@/const/config'
import axios from 'axios'
import HomeIn from './inHome.vue'
import HomeOut from './outHome.vue'
import popularContractApi from '@/request/ether_request/popularized'
import gameContractApi from '@/request/ether_request/game'
import { toBeBound, boundList } from '@/request/api_request'
import QrcodeVue from 'qrcode.vue'

export default {
    components: { HomeIn, HomeOut, [Tab.name]: Tab, [Tabs.name]: Tabs, [showDialog.name]: showDialog, [Popup.name]: Popup, QrcodeVue },
    data() {
        return {
            inHome: false,
            isLink: false,
            typeList: [{ text: '建立关系' }, { text: '我的下级' }],
            title: '推荐关系',
            isSign: false,
            p_address: '',
            isRecommended: false, //当前用户是被被推广过
            recommendInfor: {
                currentAddress: '',
                recommendInfor: 0,
                preAddress: ''
            },
            showSkeleton: true,
            toBeBoundList: [],
            boundList: [],
            myLowerInfo: {
                currentAddress: '',
                preAddress: ''
            },
            shareUrl: '',
            canShare: false,
            showCode: false
        }
    },

    async mounted() {
        // this.getRelationshipAddress()
        // return
        let relationshipAddressInfor;
        if (this.$route.query.p && this.$route.query.p !== ZeroAddress) { //是否进入被邀请人页面
            if (this.$route.query.p.toUpperCase() == window.ethereum.selectedAddress.toUpperCase()) {
                this.$confirm.show({
                    title: "提示",
                    content: "同一地址不能成为上下级关系",
                    showCancelButton: false,
                    onConfirm: () => {
                        this.$router.push({
                            path: '/'
                        })
                    },
                });
            }
            this.p_address = this.$route.query.p
            relationshipAddressInfor = await this.getRelationshipAddress(this.$route.query.p)
            if (relationshipAddressInfor.child.length >= 36) {
                this.showConfirmPopup("该地址已达到邀请上线，无法签名")
            }
            relationshipAddressInfor = await this.getRelationshipAddress(window.ethereum.selectedAddress)
            if (relationshipAddressInfor.parent !== ZeroAddress) {
                this.showConfirmPopup("您已拥有上级用户，不可签名其它地址")
            }
            this.isSign = true //通过别人的邀请链接进来的
            return
        }
        this.isSign = false
        relationshipAddressInfor = await this.getRelationshipAddress(window.ethereum.selectedAddress)
        console.log(relationshipAddressInfor.parent, relationshipAddressInfor.child)
        // relationshipAddressInfor.parent == ZeroAddress ? this.isRecommended = false : this.isRecommended = true
        this.recommendInfor.currentAddress = window.ethereum.selectedAddress
        this.myLowerInfo.currentAddress = window.ethereum.selectedAddress
        relationshipAddressInfor.parent !== ZeroAddress ? this.myLowerInfo.preAddress = relationshipAddressInfor.parent : this.myLowerInfo.preAddress = '无上级推荐地址'
        this.recommendInfor.childNum = relationshipAddressInfor.child.length
        relationshipAddressInfor.parent !== ZeroAddress ? this.recommendInfor.preAddress = relationshipAddressInfor.parent : this.recommendInfor.preAddress = '无上级推荐地址'

        this.showSkeleton = false
        const hasEarningCards = await this.getUserCardsAndWealth(window.ethereum.selectedAddress)
        if (hasEarningCards) {
            this.shareUrl = `${window.location.href}?p=${window.ethereum.selectedAddress}`
            this.canShare = true
        } else {
            this.shareUrl = '暂无卡片正在收益，无法作为上级邀请其它用户'
            this.canShare = false
        }
    },

    methods: {
        //保存到手机
        saveCode() {

        },
        //二维码弹窗
        handleCode() {
            if (!this.canShare) {
                showToast(this.shareUrl)
                return
            }
            this.showCode = true
        },
        //查询当前用户是否有正在出征的卡或者财神卡
        async getUserCardsAndWealth(walletAddress) {
            const result = await gameContractApi.userInfo(walletAddress)
            const cards = result.cards
            const deposits = result.deposits
            if (deposits.length == 0 && cards.length == 0) {
                return false
            }
            return true
        },
        //被邀请过的用户通过别人的邀请链接进来起提示弹窗
        showConfirmPopup(content) {
            this.$confirm.show({
                title: "提示",
                content: content,
                showCancelButton: false,
                onConfirm: () => {
                    this.$router.push({
                        path: '/'
                    })
                },
            });
        },
        //获取邀请人待绑定的被邀请人地址列表
        async getToBeBoundList(wallettAddress) {
            const result = await toBeBound(wallettAddress)
            const list = result.data
            return list;
        },
        //获取邀请人已绑定的被邀请人地址列表
        async getBoundList(wallettAddress) {
            const result = await boundList(wallettAddress)
            const list = result.data
            return list;
        },
        //查找某个地址的推荐关系
        async getRelationshipAddress(walletAddress) {
            // this.$loading.show()
            const relationshipAddressInfor = await popularContractApi.relationshipAddress(walletAddress)
            // this.$loading.hide()
            this.showSkeleton = false
            return relationshipAddressInfor
            // popularContractApi.relationshipAddress(window.ethereum.selectedAddress)
            //     .then(res => {
            //         console.log('当前用户上下级地址', res)
            //         console.log('上级地址', res.parent)
            //         console.log('下级地址', res.child)
            //         res.parent == ZeroAddress ? this.isRecommended = false : this.isRecommended = true
            //         this.$loading.hide()
            //     })
            //     .catch(err => {
            //         this.$loading.hide()

            //         console.log('err', err)
            //     })
        },
        async sign() {
            this.$loading.show()
            if (!isAddress(this.p_address)) {
                showFailToast('上级地址错误')
                return
            }
            const msgParams = {
                domain: {
                    chainId: config.chainId,
                    name: 'GWT NFT Game',
                    verifyingContract: config.popularized_addr,
                    version: '1'
                },
                message: { addr_p: this.p_address, addr_c: ethereum.selectedAddress, index: 0 },
                primaryType: 'popularize',
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    popularize: [
                        { name: 'addr_p', type: 'address' },
                        { name: 'addr_c', type: 'address' },
                        { name: 'index', type: 'uint256' },
                    ],
                },
            }

            const sign_data = await ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [ethereum.selectedAddress, JSON.stringify(msgParams)],
            })
            const obj = {
                p_addr: this.p_address,
                sign: sign_data
            }
            const ret = await axios.post(`${config.api}friends/${ethereum.selectedAddress}`, obj)
            console.log(ret.data)
            this.$loading.hide()
            showSuccessToast('签名成功')
        },
        cancelPay() {
            if (this.$route.query.p) {
                this.$router.push({
                    path: '/'
                })
                return
            }
            window.history.back();
        },
        async linkWallet() {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            this.$store.commit('setAddress', newAccounts[0])
            this.isLink = true
            this.load()
        },
        async load() {
            // const provider = new ethers.BrowserProvider(window.ethereum)
            // const GAME = new ethers.Contract(config.popularized_addr, config.game_abi, provider)
            const ret = await popularContractApi.relationshipAddress(ethereum.selectedAddress)
            this.$store.commit('setParentAddress', ret.parent)
            if (ret.parent == ZeroAddress) {
                this.inHome = false
            } else {
                this.inHome = true
            }
            console.log('inHome:', this.inHome)
        }
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}
</style>
<style>
.van-cell-group,
.van-cell-group--inset {
    margin: 0;
    padding: 0
}
</style>