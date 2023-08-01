<template>
    <div>
        <div
            class="flex justify-between items-center py-4 px-4 backdrop-blur bg-black/70 w-full fixed top-0 left-0 right-0 z-50">
            <div class="w-16 bg-theme-primary rounded-full">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="flex justify-end items-center">
                <div class="top-operating">
                    <div class="icon iconfont icon-Search" style="font-size: 20px;" />
                </div>
                <div class="top-operating ml-4">
                    <div class="icon iconfont icon-menu-hamburger" style="font-size: 22px;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
img {
    width: 100%;
    object-fit: contain;
}

.top-operating {
    @apply rounded-full w-10 h-10 flex justify-center items-center bg-icon-undertone text-white;
}
</style>