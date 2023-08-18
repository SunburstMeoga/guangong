<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">推荐关系</div>
            </div>
        </div>
        <div class="flex flex-col text-icon-gray justify-center items-center">
            <div class="w-11/12 text-left mb-2">当前地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="text-sm">0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB</div>
            </div>
            <div class="w-11/12 text-icon-gray bg-card-introduce py-4 rounded-md px-2 mb-6">
                <div class="flex justify-between items-center mb-2">
                    <div>已邀请</div>
                    <div class="text-theme-primary">5人</div>
                </div>
                <div class="flex justify-between items-center">
                    <div>邀请总收益</div>
                    <div class="text-theme-primary">23 WGT</div>
                </div>
            </div>
            <div class="w-11/12 text-left mb-2">上级地址</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-4">
                <div class="text-sm">0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB</div>
            </div>
            <div class="w-11/12 text-left mb-2" v-show="showLink">邀请链接</div>
            <div class="w-11/12  bg-card-introduce py-4 rounded-md px-2 mb-4" v-show="showLink">
                http://www.baidu.com
            </div>
            <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                <div class="buy-button text-primary-word text-lg button-word" @click="showLink = true">
                    生成邀请链接
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showLink: false
        }
    },
    methods: {
        cancelPay() {
            window.history.back();
        }
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}
</style>