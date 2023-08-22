<template>
    <div>
        <div>
            <div class="py-8">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                    <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="goBack"></div>
                    <div class="">{{ earningsType === 'team' ? '团队收益' : '个人收益' }}</div>
                </div>
            </div>
            <div>
                <div class="w-11/12 ml-auto mr-auto mb-2" @click="showBottom = true">
                    <div class="py-2 text-center w-3/12 text-white rounded bg-bottom-content">
                        时间 <span class="icon iconfont icon-time"></span>
                    </div>
                </div>
            </div>
            <div class="w-11/12 ml-auto mr-auto">
                <div class="mb-2 bg-bottom-content rounded" v-for="(item, index) in 20" :key="index">
                    <earnings-card />
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
.van-cell {
    background: #27272A;
}
</style>