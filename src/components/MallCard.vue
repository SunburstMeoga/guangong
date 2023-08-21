<template>
    <div class="h-64 relative rounded overflow-hidden">
        <div class="absolute left-0 top-0 w-full">
            <img :src="imageUrl" alt="">
        </div>
        <div
            class="absolute top-0 left-0 rounded-br-xl inline-block px-4 py-2 bg-success-undertone text-sm text-success-word">
            武聖出山
        </div>
        <div class="absolute left-4 bottom-4">
            <!-- <div class="w-8 h-8 rounded-full overflow-hidden bg-theme-primary">
                <img src="../assets/logo.png" alt="">
            </div> -->
            <div class="mt-2 mb-4 text-2xl text-white truncate">
                美髯公
            </div>
            <span
                class="inline-block py-2 bg-shops-content !leading-3rem px-2 bg-opacity-20 backdrop-filter !backdrop-blur-sm rounded normal-case text-essentials-white border-none">
                售价：US$ 8.88
            </span>
        </div>
    </div>

    <!-- <div class="w-full h-full relative">
        <div>
            <img class="w-full h-full absolute left-0 top-0" :src="item.imageUrl" alt="">
        </div>
        <div class="absolute left-4 bottom-4">
            <div class="w-8 h-8 rounded-full overflow-hidden bg-theme-primary">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="mt-2 mb-4 text-2xl text-white truncate">
                這裡是商鋪名稱
            </div>
            <span
                class="inline-block py-4 bg-shops-content !leading-3rem px-6 bg-opacity-20 backdrop-filter !backdrop-blur-sm rounded normal-case text-essentials-white text-xs border-none">
                共 {{ index + 12 }} 件商品
            </span>
        </div>
    </div> -->
</template>

<script>
export default {
    props: {
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