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
            <div class="buy-button py-1 px-2 text-sm text-primary-word rounded" @click="copyAddress">复制地址</div>
        </div>
        <div class="mb-2 flex justify-start items-baseline">
            <div class="">总资产： </div>
            <!-- 下面有行灰色的值。分别显示wgt和wga的余额 -->
            <div class="text-theme-primary flex justify-start items-baseline text-xs">
                <div class="">{{ wgtBalance }}WGT + {{ wgaBalance }}WGA </div>
                <div class="text-xs">≈{{ totalAssets }}</div>
            </div>

        </div>
        <!-- <div class="mb-2 flex justify-start items-baseline">
            <div class="">总资产构成： </div>
            <div class="text-theme-primary flex justify-start items-baseline">
                <div class="font-bold text-sm">{{ wgtBalance }}WGT + {{ wgaBalance }}WGA</div>
            </div>

        </div> -->
        <div class="mb-2">
            <div class="flex justify-start items-center">
                <span>总收益：</span>
                <!-- <span class="font-bold text-theme-primary">{{  earningsInfo.usdt + earningsInfo.selfUsdt }} WGT </span> -->
                <span class="font-bold text-theme-primary"> {{ $store.state.userInfor.income_sum }} WGT
                </span>
            </div>
        </div>

        <div class="mb-2">
            <div class="flex justify-start items-center">
                <span>团队星级：</span>
                <!-- <span class="font-bold text-theme-primary">{{  earningsInfo.usdt + earningsInfo.selfUsdt }} WGT </span> -->
                <span class="font-bold text-theme-primary"> {{ $store.state.userStar }}
                </span>
            </div>
        </div>
        <div class="mb-2">
            <div class="flex justify-start items-center">
                <span>个人贡献值级别：</span>
                <span class="font-bold flex justify-start items-baseline">
                    <span>{{ contributionLevel($store.state.userInfor.personal) }} </span> <span
                        class="text-xs font-normal pl-1">(贡献值：{{ $store.state.userInfor.personal }})</span>
                </span>
            </div>
        </div>
        <div class="mb-4 pb-4 border-b border-card-border">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                    <span>个人收益池金额：</span>
                    <span class="font-bold">{{ earningsInfo.poolTeam }} WGT</span>
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
        <div class="mb-4 pb-4 border-b border-card-border">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                    <span>可领取金额：</span>
                    <span class="font-bold ">{{ poolInfor.b }} WGT</span>
                    <span class="campaign px-3 py-1 text-sm text-white ml-4 rounded"
                        @click="userReceivePoolEarnings">领取收益</span>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center font-normal text-xs">
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1"
                    @click="viewEarnings('role_card')">
                    <!-- 不知道是哪个字段 -->
                    <div>角色卡收益</div>
                    <div class="">{{ $store.state.userInfor.income_card }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1"
                    @click="viewEarnings('wealth_card')">
                    <div>财神卡收益</div>
                    <div>{{ $store.state.userInfor.income_deposit }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1"
                    @click="viewEarnings('individual')">
                    <div>个人收益</div>
                    <div>{{ $store.state.userInfor.income_personal }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 py-1" @click="viewEarnings('team')">
                    <div>团队收益</div>
                    <div>{{ $store.state.userInfor.income_team }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RollingText, showSuccessToast, showToast } from 'vant';
// import { userInfo, receivePoolEarnings } from '@/request/ether_request/game'
import gameContractApi from '@/request/ether_request/game'

import { userIncome } from '@/request/api_request'
import wgtContractApi from '@/request/ether_request/wgt'
import wgaContractApi from '@/request/ether_request/wga'
import helpContractApi from '@/request/ether_request/help'

import Web3 from "web3";

export default {
    components: { [RollingText.name]: RollingText },
    data() {
        return {
            address: window.ethereum.selectedAddress,
            earningsInfo: {},
            userLevel: 0,
            totalAssets: '0',
            poolInfor: {},
            wgtBalance: '0',
            wgaBalance: '0'
        }
    },
    mounted() {
        this.address = window.ethereum.selectedAddress

        if (window.ethereum) {


        }
        if (window.ethereum && window.ethereum.selectedAddress) {
            this.getUserInfo()
            this.getUserIncome()
            this.getUserTotalAssets()
            this.getPoolInfor()
        } else {
            this.$confirm.show({
                title: "提示",
                content: "请先连接钱包",
                showCancelButton: false,
                onConfirm: () => {
                    this.$router.push({
                        path: '/'
                    })
                },
            });
        }

    },
    methods: {

        getFilterAmount(amount) {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            const reslut = WEB3.utils.fromWei(amount, 'ether')
            console.log(amount, reslut)

            return reslut
        },
        //领取总奖池收益
        userReceivePoolEarnings() {
            if (!window.ethereum.selectedAddress) {
                showToast('请先登录')
            }
            this.$loading.show()
            if (this.poolInfor.b == 0) {
                showToast('无可领取余额')
                this.$loading.hide()
                return
            }
            gameContractApi.receivePoolEarnings(this.poolInfor.b)
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
            helpContractApi.poolEarningsInfor(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('奖池信息', res)
                    // this.poolInfor = res
                    // this.poolInfor.a = this.getFilterAmount(res.a)
                    // this.poolInfor.b = this.getFilterAmount(res.b)
                    this.poolInfor.a = res.a
                    this.poolInfor.b = res.b

                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        async getUserTotalAssets() {
            const WEB3 = new Web3(window.ethereum);
            // const wgt = WEB3.utils.fromWei(await wgtAssets(window.ethereum.selectedAddress), 'ether')
            const wgt = await wgtContractApi.wgtAssets(window.ethereum.selectedAddress)
            const wga = await wgaContractApi.wgaAssets(window.ethereum.selectedAddress)
            console.log(WEB3.utils.fromWei(wgt + wga, 'ether'))
            this.wgtBalance = WEB3.utils.fromWei(wgt, 'ether')
            this.wgaBalance = WEB3.utils.fromWei(wga, 'ether')
            console.log(wgt, wga, this.wgtBalance, this.wgaBalance)
            this.totalAssets = WEB3.utils.fromWei(wgt + wga, 'ether')
            console.log('totalAssets', this.totalAssets)
        },
        getUserIncome() {
            userIncome(window.ethereum.selectedAddress)
                .then(res => {
                    console.log(res)
                    const { income_card, income_deposit, income_personal, income_pool, income_sum, income_team, personal } = res.data
                    let obj = {
                        address: window.ethereum.selectedAddress,
                        income_card: income_card,
                        income_deposit: income_deposit, income_personal: income_personal, income_pool: income_pool, income_sum: income_sum, income_team: income_team, personal: personal
                    }

                    this.$store.commit('updateUserInfor', obj)
                    console.log(this.$store.state.userInfor)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //用户贡献值对应大使
        contributionLevel(contributionValue) {
            if (contributionValue > 0 && contributionValue < 10000) {
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
                    // console.log('用户收益详情', res)
                    // this.earningsInfo.poolTeam = this.getFilterAmount(res.poolTeam)
                    const WEB3 = new Web3(window.ethereum);

                    this.earningsInfo.poolTeam = res.poolTeam
                    this.earningsInfo.poolTeam = WEB3.utils.fromWei(res.poolTeam, 'ether')

                })
                .catch(err => {
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
                let textArea = document.createElement('textarea')
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
                if (index <= 6 || index >= arr.length - 7) {
                    targetArr.push(item)
                }
            })
            targetArr.splice(7, 0, '...')
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