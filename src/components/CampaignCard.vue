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
        <div class="backdrop-blur-3xl text-sm text-assets-word bg-module-card px-2 py-1">
            <div class="text-theme-primary text-2xl font-semibold">{{ name }}</div>
            <div class="text-icon-gray">出征角色Token：# {{ nftRole }}</div>
            <div class="text-icon-gray">出征时间：{{ time }}</div>
            <div class="text-icon-gray">出征令牌：{{ nftToken }}</div>
            <div class="text-icon-gray">当前出征次数：{{ count }}</div>
            <div class="text-icon-gray">本次出征是否领取过收益：{{ income ? '是' : '否' }}</div>
            <div class="text-icon-gray">出征属性：{{ cammaignAttribute }}</div>
            <div class="campaign mt-4 text-whites text-center py-2 mb-2 rounded" @click="receiveProceeds">领取收益</div>
        </div>
    </div>
</template>

<script>
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
        time: {
            type: Number,
            default: 0
        },
        nftToken: {
            type: Number,
            default: 0
        },
        count: {
            type: String,
            default: ''
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
        receiveProceeds() {
            this.$emit('receiveProceeds')
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
</style>