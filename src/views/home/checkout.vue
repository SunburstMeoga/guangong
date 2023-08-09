<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-close absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">结账</div>
            </div>
        </div>
        <div class="w-11/12 ml-auto mr-auto border-module">
            <div class="bg-bottom-content py-5 px-4 rounded-lg mb-10">
                <div class="flex justify-start items-center">
                    <div class="w-8 h-8 rounded-full overflow-hidden mr-1.5">
                        <img src="@/assets/owner.png" alt="">
                    </div>
                    <div class="text-sm text-card-content">
                        <div class="text-icon-gray text-xs">拥有者</div>
                        <div class="font-bold">Jack Zhang</div>
                    </div>
                </div>
            </div>
            <div class="flex justify-start items-start mb-10">
                <div class="w-32 flex justify-center rounded-lg overflow-hidden items-center bg-black">
                    <img src="https://gd-hbimg.huaban.com/846fca69e5c8defee000b95c3e24327d0742acd7f57f-ThxGq0_fw240webp"
                        alt="">
                </div>
                <div class="ml-6 text-card-content">
                    <div class="title text-2xl font-bold leading-12 mb-6">
                        桃園結義
                    </div>
                    <div class="rounded-xl inline-block px-2 py-px bg-success-undertone text-sm text-success-word mb-6">
                        武聖出山
                    </div>
                    <div class="text-base font-semibold">
                        US$ 18.00
                    </div>
                </div>
            </div>
            <div class="text-card-content flex justify-between items-center text-base">
                <div>總金額</div>
                <div class="font-semibold">US$ 18.00</div>
            </div>
        </div>
        <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
            <div class="buy-button text-primary-word text-lg">
                確認
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        cancelPay() {
            window.history.back();
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.border-module {
    @apply border-b border-card-introduce pb-10 font-light;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
    @apply font-medium py-4 rounded flex justify-center items-center;
}
</style>