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
            <div class="text-theme-primary font-bold text-4xl">
                <!-- {{ earningsInfo.usdt + earningsInfo.selfUsdt }} WGT -->
                99.99 WGT
            </div>

        </div>
        <div class="mb-2">
            <div class="flex justify-start items-center">
                <span>总收益：</span>
                <!-- <span class="font-bold text-theme-primary">{{  earningsInfo.usdt + earningsInfo.selfUsdt }} WGT </span> -->
                <span class="font-bold text-theme-primary"> 99.99 WGT </span>
            </div>

        </div>
        <div class="mb-2">
            <div class="flex justify-start items-center">
                <span>个人贡献值级别：</span>
                <span class="font-bold flex justify-start items-baseline"> <span>忠字传播大使 </span> <span
                        class="text-xs font-normal pl-1">(贡献值：4234)</span> </span>

            </div>

        </div>
        <div class="mb-4 pb-4 border-b border-card-border">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-start">
                    <span>个人收益池金额：</span>
                    <span class="font-bold">{{ earningsInfo.poolTeam }} WGT</span>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center font-normal text-xs">
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5"
                    @click="viewEarnings('role_card')">
                    <!-- 不知道是哪个字段 -->
                    <div>角色卡收益</div>
                    <div class="">{{ earningsInfo.usdtStar }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5"
                    @click="viewEarnings('wealth_card')">
                    <div>财神卡收益</div>
                    <div>{{ earningsInfo.usdtStar }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5"
                    @click="viewEarnings('individual')">
                    <div>个人收益</div>
                    <div>{{ earningsInfo.selfUsdt }}</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 py-1.5" @click="viewEarnings('team')">
                    <div>团队收益</div>
                    <!-- <div>{{ earningsInfo.usdt }}</div> -->
                    0
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RollingText, showSuccessToast } from 'vant';
import { userLevel, userInfo } from '@/request/ether_request/game'
export default {
    components: { [RollingText.name]: RollingText },
    data() {
        return {

            address: window.ethereum.selectedAddress,
            earningsInfo: {},
            userLevel: 0
        }
    },
    mounted() {
        if (ethereum.selectedAddress) {

        }
        this.address = window.ethereum.selectedAddress
        this.getUserLevel()
        this.getUserInfo()
    },
    methods: {
        //用户贡献值对应大使
        contributionLevel(level) {
            switch (level) {
                case 0:
            }
        },
        //获取用户收益信息
        getUserInfo() {
            userInfo(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('用户收益详情', res)
                    this.earningsInfo = res
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        getUserLevel() {
            userLevel(window.ethereum.selectedAddress)
                .then(res => {
                    console.log('用户当前等级', res)
                    this.userLevel = res
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        copyAddress() {
            navigator.clipboard.writeText(this.address).then(() => {
                showSuccessToast('复制成功')
            }, () => {
                // Toast.fail(this.$t('toast.copyFail'))

            });
        },
        addressFilter(value) {
            console.log('value', value)
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

.my-rolling-text {
    --van-rolling-text-color: #E20F2A;
    --van-rolling-text-font-size: 40px;
    --van-rolling-text-gap: 2px;
    --van-rolling-text-item-width: 26px;
}
</style>