<template>
    <div class="rounded-lg overflow-hidden">
        <div class="bg-black flex justify-center items-center w-full">
            <div class="w-full">
                <img v-lazy="imageUrl" alt="">
            </div>
        </div>
        <div class="w-full bg-card-introduce px-4 py-2">
            <div class="text-theme-primary text-2xl font-bold mb-4">{{ name }}</div>

            <div class="text-tips-word text-xs">持有者</div>
            <div class="text-card-content text-sm mb-4"> {{ owner }} </div>
            <div class="text-tips-word text-xs">當前價格</div>
            <!-- <div class="text-card-content text-xl font-semibold flex"> {{ Math.ceil(Number(amount *
                ($store.state.WGTPoint *
                    1.03)).toFixed(4)) + 'WGT' }} · {{ Number(amount) + 'U' }}</div> -->
            <div class="text-card-content text-xl font-semibold flex"> {{ Math.ceil(Number(amount *
                ($store.state.WGTPoint *
                    1.03)).toFixed(4)) + 'WGT' }} </div>

            <!-- <div class="text-card-content text-sm font-semibold"> </div> -->
            <!-- <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                    <div class="w-6 h-6 rounded-full overflow-hidden mr-1.5">
                        <img src="https://upload.ucollex.io/cdn-cgi/image/width=100/uploads/dash/ucollex2-CreatorAvatar-02.jpg"
                            alt="">
                    </div>
                    <div class="text-sm text-card-content">{{ owner }}</div>
                </div>
                <div class="flex justify-end items-center text-gray-400">
                    <div class="w-4 h-6 rounded-full overflow-hidden">
                        <div class="icon iconfont icon-heart"></div>
                    </div>
                    <div class="text-sm  ml-1.5">28</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
        amount: {
            type: String,
            default: ''
        },
        card_type: {
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
    object-fit: contain;

}
</style>