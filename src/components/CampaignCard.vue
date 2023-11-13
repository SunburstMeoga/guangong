<template>
    <div>
        <div class="relative">
            <div>
                <img :src="imageUrl" alt="">
            </div>
            <!-- <div
                class="absolute top-0 right-0 rounded-bl-lg py-1 px-4 backdrop-blur-sm text-xs text-assets-word bg-black/50">
                出征中
            </div> -->
        </div>
        <div class="backdrop-blur-3xl text-xs text-assets-word bg-module-card px-2 py-1">
            <div class="text-theme-primary text-2xl font-semibold">{{ name }}</div>
            <div class="text-icon-gray">No.{{ nftRole }}</div>
            <div class="text-icon-gray" v-if="utc !== 0">出征时间：{{ utc == 0 ? 0 : filterTime(utc) }}</div>
            <div class="text-icon-gray">出征令牌：{{ nftToken }}</div>
            <div class="text-icon-gray">当前出征次数：{{ count }}</div>
            <div class="text-icon-gray">本次出征是否领取过收益：{{ income ? '是' : '否' }}</div>
            <div class="text-icon-gray mb-2">出征属性：{{ cammaignAttribute }}</div>
            <div class="flex justify-between items-center mb-2">
                <div class="campaign text-whites text-center p-2 rounded" @click="receiveProceeds">领取收益</div>
                <div class="buy-button text-whites text-center p-2 rounded" @click="campaignAgain">再次出征</div>
            </div>
        </div>
    </div>
</template>

<script>
import { filterTime } from '@/utils/filterValue'

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        imageUrl: {
            type: String,
            default: ''
        },
        nftRole: {
            type: String,
            default: ''
        },
        utc: {
            type: Number,
            default: 0
        },
        nftToken: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        income: {
            type: Boolean,
            default: false
        },
        cammaignAttribute: {
            type: String,
            default: ''
        }
    },
    methods: {
        filterTime,
        receiveProceeds() {
            this.$emit('receiveProceeds')
        },
        campaignAgain() {
            this.$emit('campaignAgain')
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

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>