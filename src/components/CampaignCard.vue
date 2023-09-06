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
        <div class="backdrop-blur-3xl text-sm text-assets-word bg-module-card pl-2 py-1">
            <div class="text-theme-primary text-2xl font-semibold">{{ name }}</div>
            <div class="text-icon-gray">出征角色Token：# {{ nftRole }}</div>
            <div class="text-icon-gray">出征时间：{{ time }}</div>
            <div class="text-icon-gray">出征令牌：{{ nftToken }}</div>
            <div class="text-icon-gray">当前出征次数：{{ count }}</div>
            <div class="text-icon-gray">本次出征是否领取过收益：{{ income ? '是' : '否' }}</div>
            <div class="text-icon-gray">出征属性：{{ cammaignAttribute }}</div>
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
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>