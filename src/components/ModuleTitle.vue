<template>
    <div class="text-card-content">
        <div class="text-2xl font-medium">
            {{ titleWord }}
        </div>
        <div class="flex justify-center items-center pt-4 text-sm text-more-word" v-if="hasMore">
            <div class="mr-1">查看所有二级市场NFT</div>
            <div class="flex justify-center items-center">
                <div class="icon iconfont icon-right" style="font-size: 14px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleWord: {
            type: String,
            default: ''
        },
        hasMore: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style></style>