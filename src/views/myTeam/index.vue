<template>
    <div>
        <div>
            <div class="py-8 top-0 sticky flex justify-center z-10 bg-black">
                <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content">
                    <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()">
                    </div>
                    <div class="">我的团队</div>
                </div>
            </div>
            <div>

            </div>
            <div class="pt-4 w-full flex flex-col justify-start items-center text-white">
                <div class="text-white w-11/12 mr-auto ml-auto flex justify-between items-center py-2">
                    <div class="font-medium text-xl">我的下级</div>
                </div>
                <div v-for="(item, index) in 2" :key="index" class="mb-3 w-11/12 bg-bottom-content rounded p-2">
                    <div class="flex justify-between items-center">
                        <div>下级等级</div>
                        <div class="text-red-600">五星</div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>下级地址</div>
                        <div>0x234dkj...feh2344</div>
                    </div>
                </div>
            </div>

            <div class="pt-4 w-full flex flex-col justify-start items-center text-white">
                <div class="text-white w-11/12 mr-auto ml-auto flex justify-between items-center py-2">
                    <div class="font-medium text-xl">属下业绩</div>
                </div>
                <div class="mb-3 w-11/12 bg-bottom-content rounded p-2">
                    <div class="py-2 w-11/12  rounded">
                        业绩总和: <span class="text-red-600">2323 USDT</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        cancelPay() {
            window.history.back();
        },
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
    @apply w-11/12 border-b border-card-introduce py-10;
}

.show-icon {
    @apply font-extrabold transition ease-in-out duration-200;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-4 rounded flex justify-center items-center
}
</style>