<template>
    <div class="text-white px-2">
        <div class="flex justify-between items-center py-2 font-semibold border-b border-card-introduce">
            <div class="">收益</div>
            <div class="text-green-600">+ {{ earning }}</div>
        </div>
        <div class="flex justify-between text-sm items-center py-2 font-light">
            <div class="">时间</div>
            <div class="">{{ time }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isEarings: {
            type: Boolean,
            default: false
        },
        earning: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
    }
}
</script>

<style scoped></style>