<template>
    <!-- 团队收益，个人收益，资产总值，NFT总数，wgt余额，usdt余额，pgt余额。 -->
    <div class="w-full text-icon-gray pb-3 border-b border-card-introduce bg-personal-bg bg-cover bg-no-repeat p-4">
        <!-- <div class="absolute top-0 left-0">
            <img src="@/assets/personal-bg2.png" alt="">
        </div> -->
        <div class="flex justify-between items-center mb-4">
            <div>
                <span>{{ addressFilter(address) }}</span>
            </div>
            <!-- <div class="buy-button px-3 py-1 text-sm text-primary-word rounded" @click="copyAddress">复制地址</div> -->
        </div>
        <div class="mb-2 flex justify-start items-baseline font-bold">
            <div class="">总资产： </div>
            <!-- 下面有行灰色的值。分别显示wgt和wga的余额 -->
            <div class="text-theme-primary ">
                <div class="">{{ wgtBalance }} WGT + {{ wgaBalance }} WGT-A </div>
                <div class="text-xs">≈{{ totalAssets }} U</div>
            </div>

        </div>
        <!-- <div class="mb-2 flex justify-start items-baseline">
            <div class="">总资产构成： </div>
            <div class="text-theme-primary flex justify-start items-baseline">
                <div class="font-bold text-sm">{{ wgtBalance }}WGT + {{ wgaBalance }}WGA</div>
            </div>

        </div> -->
        <div class="mb-2">
            <div class="flex justify-start items-center font-bold">
                <span>总收益：</span>
                <!-- <span class="font-bold text-theme-primary">{{  earningsInfo.usdt + earningsInfo.selfUsdt }} WGT </span> -->
                <span class="text-theme-primary"> {{ $store.state.userInfor.income_sum }} U
                </span>
            </div>
        </div>

        <div class="mb-2">
            <div class="flex justify-start items-center font-bold">
                <span>团队星级：</span>
                <!-- <span class="font-bold text-theme-primary">{{  earningsInfo.usdt + earningsInfo.selfUsdt }} WGT </span> -->
                <span class="text-theme-primary"> {{ $store.state.userStar }}
                </span>
            </div>
        </div>
        <div class="mb-2">
            <div class="flex justify-start items-center font-bold">
                <span>个人贡献值级别：</span>
                <span class="text-theme-primary flex justify-start items-baseline">
                    <span class="">{{ contributionLevel($store.state.userInfor.personal) }} </span> <span
                        class="text-xs pl-1">(贡献值：{{ $store.state.userInfor.personal }})</span>
                </span>
            </div>
        </div>
        <div class="mb-2">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center font-bold">
                    <span>个人收益池金额：</span>
                    <span class="text-theme-primary">{{ Number(earningsInfo.poolTeam).toFixed(4) }}
                        U</span>
                </div>
            </div>
        </div>
        <!-- <div class="mb-4 pb-4 border-b border-card-border">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                    <span>奖金池总金额：</span>
                    <span class="font-bold">{{ poolInfor.a }} WGT</span>
                </div>
            </div>
        </div> -->
        <div class="mb-2">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-baseline">
                    <span class="font-bold">准备释放金额：</span>
                    <span class="font-bold text-theme-primary">{{ Number(poolInfor.b *
                        $store.state.WGTPoint).toFixed(4) }}
                        WGT</span>
                    <span class="text-xs font-bold text-theme-primary"> ≈ {{ Number(poolInfor.b).toFixed(4) }} U</span>

                    <!-- <span class="campaign px-3 py-1 text-sm text-white ml-4 rounded" @click="handlePoolEarnings">领取收益</span> -->
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-baseline">
                    <span class="font-bold">已释放总金额：</span>
                    <span class="font-bold text-theme-primary">{{
                        $store.state.userInfor.pool_out }} WGT</span>
                    <!-- <span class="text-xs font-bold text-theme-primary"> ≈ {{
                        $store.state.userInfor.pool_out }} U</span> -->

                    <!-- <span class="campaign px-3 py-1 text-sm text-white ml-4 rounded" @click="handlePoolEarnings">领取收益</span> -->
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center font-normal text-xs">
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1">
                    <!-- 不知道是哪个字段 -->
                    <div>角色卡收益</div>
                    <div class="">{{ $store.state.userInfor.income_card }} U</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1">
                    <div>财神卡收益</div>
                    <div>{{ $store.state.userInfor.income_deposit }} U</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1"
                    @click="viewEarnings('individual')">
                    <div>个人收益</div>
                    <div>{{ $store.state.userInfor.income_personal }} U</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 py-1" @click="viewEarnings('team')">
                    <div>团队收益</div>
                    <div>{{ $store.state.userInfor.income_team }} U</div>
                </div>
            </div>
        </div>
        <van-popup v-model:show="showIncomeMethod" position="bottom">
            <div class="text-card-content bg-cover-content flex w-full pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">请选择{{ cardType == 0 ? '出征卡' : '财神卡' }}收益领取方式
                </div>
                <div @click="clickIncomeMethod(item, index)" v-for="(item, index) in incomeMethods" :key="index"
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-between items-center py-3.5 px-2 text-essentials-white text-sm rounded"
                    :class="currentIncome == index ? 'buy-button text-white' : ''">
                    <span>{{ item.title }}</span>

                </div>
                <div class="flex w-11/12 justify-between items-center mt-6">

                    <div class="w-5/12  border border-language-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="showIncomeMethod = false">
                        取消
                    </div>
                    <div class="w-5/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded"
                        @click="handleConfirmGetIncome">
                        领取
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { RollingText, showSuccessToast, showToast } from 'vant';
// import { userInfo, receivePoolEarnings } from '@/request/ether_request/game'
import gameContractApi from '@/request/ether_request/game'
import { ZeroAddress } from "ethers"

import { userIncome } from '@/request/api_request'
import wgtContractApi from '@/request/ether_request/wgt'
import wgaContractApi from '@/request/ether_request/wga'
import helpContractApi from '@/request/ether_request/help'
import nftContractApi from '@/request/ether_request/nft'
import popularContractApi from '@/request/ether_request/popularized'
import { config } from '@/const/config'

import Web3 from "web3";

export default {
    components: { [RollingText.name]: RollingText },
    data() {
        return {
            address: window.ethereum.selectedAddress,
            earningsInfo: {},
            userLevel: 0,
            totalAssets: '0',
            poolInfor: { a: 0, b: 0 },
            wgtBalance: '0',
            wgaBalance: '0',
            timer: null,
            showIncomeMethod: false,
            incomeMethods: [{ title: '领取到WGT余额', isWGA: false }, { title: '领取到WGA-T余额', isWGA: true }],
            currentIncome: 0,
        }
    },
    mounted() {
        this.$loading.show()

        this.timer = setTimeout(() => {
            if (window.ethereum && window.ethereum.selectedAddress) {
                this.address = window.ethereum.selectedAddress
                this.getUserInfo()
                this.getUserIncome()
                this.getUserTotalAssets()
                this.getPoolInfor()
                this.$loading.hide()
            } else {
                this.$loading.hide()
            }
        }, 2000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        getFilterAmount(amount) {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            let reslut
            if (Number(amount) !== 0) {
                reslut = WEB3.utils.fromWei(amount, 'ether')
            } else {
                reslut = 0
            }
            console.log(amount, reslut)

            return reslut
        },
        //erc721合约授权操作
        async erc721ContractApppproval(contractAddress) {
            const result = await nftContractApi.apppprovalForAll(contractAddress)
            return result
        },
        //检查erc721授权状态
        async erc721ApppprovalState(contractAddress) {
            return await nftContractApi.isApprovedAll(window.ethereum.selectedAddress, contractAddress)
        },
        async isBeenPromoted(walletAddress) {
            let result = await popularContractApi.relationshipAddress(walletAddress)
            console.log(result)
            let havePreAddr
            if (result.parent !== ZeroAddress) {
                havePreAddr = true
            } else {
                havePreAddr = false
            }
            return havePreAddr

        },
        //选择收益方式
        clickIncomeMethod(item, index) {
            this.currentIncome = index
        },
        //查询收益方式
        async viewIncomeMethod() {
            let result = await gameContractApi.incomeMethod()
            return result
            // .then(res => {
            //     this.isWGAIncome = res
            // })
            // .catch(err => {
            //     console.log('err', err)
            // })
        },
        handlePoolEarnings() {
            this.userReceivePoolEarnings()
        },
        //领取总奖池收益
        async userReceivePoolEarnings() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先登录')
                return
            }
            this.$loading.show()
            if (this.poolInfor.b == 0) {
                showToast('无可领取余额')
                this.$loading.hide()
                return
            }
            let gameApproveFromNFT = await this.erc721ApppprovalState(config.game_addr) //nft是否已对game进行授权
            if (gameApproveFromNFT !== true) { //未授权，引导用户授权
                this.$loading.hide()
                this.$confirm.show({
                    title: "提示",
                    content: "当前用户未进行erc721授权，请先完成授权",
                    onConfirm: () => {
                        this.$loading.show()
                        nftContractApi.apppprovalForAll(config.game_addr)
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


            let havePreAddr = await this.isBeenPromoted(window.ethereum.selectedAddress)
            if (!havePreAddr) {
                this.$loading.hide()
                showToast('当前地址无上级地址，不可领取')
                return
            }
            console.log('是否授权', gameApproveFromNFT)
            console.log('是否有上级地址', havePreAddr)
            // const WEB3 = new Web3(window.ethereum);
            // const earning = BigInt(WEB3.utils.toWei(this.poolInfor.b, 'ether'))
            // console.log(earning)
            // return
            gameContractApi.receivePoolEarnings(window.ethereum.selectedAddress)
                .then(res => {
                    showToast('领取成功')
                    this.this.getPoolInfor()
                    this.$loading.hide()
                })
                .catch(err => {
                    showToast('领取失败')
                    this.$loading.hide()

                    console.log('err', err)
                })
        },
        //获取奖金池信息
        getPoolInfor() {
            this.$loading.hide()
            helpContractApi.poolEarningsInfor(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('奖池信息', res)
                    // this.poolInfor = res

                    // this.poolInfor.a = res.a
                    // this.poolInfor.b = res.b
                    this.poolInfor.a = this.getFilterAmount(res.a)
                    this.poolInfor.b = this.getFilterAmount(res.b)
                    this.$loading.hide()

                })
                .catch(err => {
                    this.poolInfor.a = 0
                    this.poolInfor.b = 0

                    console.log('err', err)
                    this.$loading.hide()

                })
        },
        async getWGTFromUSDT(value) {
            let amount = value.toString()
            gameContractApi.WGTFromUSDT(amount)
            const result = await gameContractApi.WGTFromUSDT(amount)
            console.log('换算完值', result)
            return result
        },
        async getUserTotalAssets() {
            const WEB3 = new Web3(window.ethereum);
            this.$loading.hide()
            try {
                let wgt = await wgtContractApi.wgtAssets(window.ethereum.selectedAddress)
                let wga = await wgaContractApi.wgaAssets(window.ethereum.selectedAddress)
                this.wgtBalance = WEB3.utils.fromWei(wgt, 'ether')
                this.wgaBalance = WEB3.utils.fromWei(wga, 'ether')
                let WGTPoint = await this.getWGTFromUSDT(100)
                WGTPoint = Number(WGTPoint) / 100
                let totalAssets = Number(this.wgtBalance) / WGTPoint + (Number(this.wgaBalance) / 20)
                this.totalAssets = Number(totalAssets).toFixed(4)
                this.wgtBalance = Number(this.wgtBalance).toFixed(4)
                this.wgaBalance = Number(this.wgaBalance).toFixed(4)

                console.log('wgtBalance', wgt, this.wgtBalance / WGTPoint, wga, Number(this.wgaBalance) / 20)
                console.log('WGTPoint', WGTPoint)
                this.$loading.hide()

            } catch (err) {
                console.log(err)
                showToast('获取资产错误，请重试')
                this.$loading.hide()
            }

        },
        getUserIncome() {
            userIncome(window.ethereum.selectedAddress)
                .then(res => {
                    console.log(res)
                    const { income_card, income_deposit, income_personal, income_pool, income_sum, income_team, personal, pool_out } = res.data
                    let obj = {
                        address: window.ethereum.selectedAddress,
                        income_card: Number(income_card).toFixed(4),
                        income_deposit: Number(income_deposit).toFixed(4), pool_out: Number(pool_out).toFixed(4), income_personal: Number(income_personal).toFixed(4), income_pool: income_pool, income_sum: Number(income_sum).toFixed(4), income_team: Number(income_team).toFixed(4), personal: personal
                    }

                    this.$store.commit('updateUserInfor', obj)
                    console.log(this.$store.state.userInfor)
                    this.$loading.hide()

                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()

                })
        },
        //用户贡献值对应大使
        contributionLevel(contributionValue) {
            if (contributionValue >= 0 && contributionValue < 10000) {
                return '忠字传播大使'
            } else if (contributionValue >= 10000 && contributionValue < 50000) {
                return '义字传播大使'
            } else if (contributionValue >= 50000 && contributionValue < 100000) {
                return '仁字传播大使'
            } else if (contributionValue >= 100000 && contributionValue < 300000) {
                return '勇字传播大使'
            } else if (contributionValue >= 300000 && contributionValue < 500000) {
                return '礼字传播大使'
            } else if (contributionValue >= 500000 && contributionValue < 1000000) {
                return '智字传播大使'
            } else if (contributionValue >= 1000000 && contributionValue < 3000000) {
                return '信字传播大使'
            } else if (contributionValue >= 3000000 && contributionValue < 70000000) {
                return '财字传播大使'
            } else if (contributionValue >= 70000000) {
                return '富字传播大使'
            }
        },
        //获取用户收益信息
        getUserInfo() {
            gameContractApi.userInfo(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('用户收益详情', res.poolTeam)
                    // this.earningsInfo.poolTeam = this.getFilterAmount(res.poolTeam)
                    const WEB3 = new Web3(window.ethereum);

                    this.earningsInfo.poolTeam = res.poolTeam
                    this.earningsInfo.poolTeam = WEB3.utils.fromWei(res.poolTeam, 'ether')
                    this.$loading.hide()

                })
                .catch(err => {
                    this.$loading.hide()
                    console.log('err', err)
                })
        },

        copyAddress() {
            if (navigator.clipboard && window.isSecureContext) {
                console.log('aaa')
                navigator.clipboard.writeText(this.address).then(() => {
                    showSuccessToast('复制成功')
                }, () => {
                    showToast('复制失败')

                });
            } else {
                console.log('bbb')
                let textArea = document.createElement('input')
                textArea.value = this.address
                // 使text area不在viewport，同时设置不可见
                textArea.style.position = 'absolute'
                textArea.style.opacity = 0
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                return new Promise((res, rej) => {
                    // 执行复制命令并移除文本框
                    document.execCommand('copy') ? res('复制成功') : rej('复制失败')
                    textArea.remove()
                })
                    .then((res) => {
                        // 从 resolve 获取正常结果
                        console.log(res)
                        showSuccessToast('复制成功')
                    })
                    .catch((res) => {
                        // 从 reject 获取异常结果
                        console.log(res)
                        showToast('复制失败')
                    })
            }
        },
        addressFilter(value) {
            if (value === undefined || value === null) return
            let arr = value.split('')
            let targetStr
            let targetArr = []
            arr.map((item, index) => {
                if (index <= 10 || index >= arr.length - 11) {
                    targetArr.push(item)
                }
            })
            targetArr.splice(11, 0, '...')
            targetStr = targetArr.join('')
            return targetStr
        },
        viewEarnings(type) {
            this.$router.push({
                path: '/earnings/' + type
            })
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}

.my-rolling-text {
    --van-rolling-text-color: #E20F2A;
    --van-rolling-text-font-size: 40px;
    --van-rolling-text-gap: 2px;
    --van-rolling-text-item-width: 26px;
}
</style>