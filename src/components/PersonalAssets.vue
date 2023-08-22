<template>
    <!-- 团队收益，个人收益，资产总值，NFT总数，wgt余额，usdt余额，pgt余额。 -->
    <div class="w-full text-icon-gray pb-3 border-b border-card-introduce bg-personal-bg bg-cover bg-no-repeat p-4">
        <!-- <div class="absolute top-0 left-0">
            <img src="@/assets/personal-bg2.png" alt="">
        </div> -->
        <div class="flex justify-between items-center mb-4">
            <div>
                <span>0x1E7e6F6E85...1a716Eaf5cB</span>
            </div>
            <div class="buy-button py-1 px-2 text-sm text-primary-word rounded">复制地址</div>
        </div>
        <div class="mb-6">
            <div class="">资产总值</div>
            <div class="text-theme-primary font-bold text-4xl">
                88.232 WGT
                <!-- <div class="flex justify-start items-center">
                    <div class="mr-1">US$ </div>
                    <van-rolling-text :text-list="textList" :duration="1" class="my-rolling-text" />
                </div> -->
            </div>

        </div>
        <div class="mb-6">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-start">
                    <span>当日收益：</span>
                    <span class="font-bold">3.77 WGT</span>
                </div>
                <!-- <div class="flex justify-start items-start">
                    <span>NFT总数：</span>
                    <span class="font-bold ">90</span>
                </div> -->
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center font-normal text-xs">
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5">
                    <div>WGT</div>
                    <div>22.33</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5">
                    <div>USDT</div>
                    <div class="">22.33</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 border-r border-card-introduce py-1.5"
                    @click="viewEarnings('individual')">
                    <div>个人收益</div>
                    <div>22.33</div>
                </div>
                <div class="flex flex-col justify-center items-center w-3/12 py-1.5" @click="viewEarnings('team')">
                    <div>团队收益</div>
                    <div>334.3</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RollingText } from 'vant';

export default {
    components: { [RollingText.name]: RollingText },
    data() {
        return {
            textList: [
                '00.0000',
                '24.1233',
                '44.2233',
                '53.3233',
                '64.4233',
                '74.5233',
                '94.1233',
            ]
        }
    },
    methods: {
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