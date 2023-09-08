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
            <div class="text-theme-primary text-2xl font-semibold mb-3">{{ name }}</div>
            <div class="text-icon-gray">收益开始时间：{{ time }}</div>
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

        time: {
            type: Number,
            default: 0
        },
        imageUrl: {
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