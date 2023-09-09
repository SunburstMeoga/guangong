<template>
    <div>
        <div>
            <div class="py-6 top-0 sticky flex justify-center z-10 bg-primary-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="goBack"></div>
                    <div class="">{{ getEarningsTypeWord(earningsType) }}</div>
                </div>
            </div>
            <div class="bg-bottom-content rounded w-11/12 ml-auto mr-auto p-4 text-white mt-4 mb-8">
                <div class="flex justify-between items-center">
                    <div>
                        <div class="">已领取：99.99</div>
                        <div class="flex justify-start items-baseline">
                            <span>{{ earningsType === 'wealth_card' || earningsType === 'role_card' || earningsType ===
                                'individual' ? '待领取' : '待发放' }}：</span>
                            <span class="text-theme-primary font-semibold text-2xl">100.00</span>
                        </div>
                    </div>
                    <!-- <div class="campaign px-2 py-1 rounded" v-if="earningsType === 'individual'">
                        领取奖励
                    </div> -->
                </div>
            </div>
            <div class="text-white w-11/12 mr-auto ml-auto flex justify-between items-center py-2">
                <div class="font-medium text-xl">收益记录</div>
                <div @click="showBottom = true" class="py-2 px-4 text-center text-white rounded bg-bottom-content">
                    时间 <span class="icon iconfont icon-time"></span>
                </div>
            </div>
            <!-- <div class="pt-4">
               
            </div> -->
            <div class="w-11/12 ml-auto mr-auto">
                <div class="mb-2 bg-bottom-content rounded" v-for="(item, index) in 20" :key="index">
                    <earnings-card :isEarings="index % 2 == 0 ? true : false" />
                </div>
            </div>
        </div>
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
            <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate" /></van-popup>>
    </div>
</template>

<script>
import EarningsCard from '@/components/EarningsCard'
import { DatePicker, Popup } from 'vant';
export default {
    components: { EarningsCard, [DatePicker.name]: DatePicker, [Popup.name]: Popup },
    data() {
        return {
            earningsType: "",
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 5, 1),
            currentDate: ['2023', '01', '01'],
            showBottom: false
        }
    },
    methods: {
        //获取收益类型标题
        getEarningsTypeWord(type) {
            switch (type) {
                case 'role_card': return '角色卡收益'
                case 'wealth_card': return '财神卡收益'
                case 'individual': return '个人收益'
                case 'team': return '团队收益'
            }
        },
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        this.earningsType = this.$route.params.type
        console.log('this.$route.params', this.$route.params)
    }
}
</script>

<style scoped>
.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}

.van-cell {
    background: #27272A;
}
</style>