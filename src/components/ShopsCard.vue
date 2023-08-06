<template>
    <div>
        <div class="rounded-2xl " style="border:1px solid red;">
            <img :src="imageUrl" alt="">
        </div>
    </div>
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
    object-fit: contain;
}
</style>