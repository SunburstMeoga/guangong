<template>
    <div class="text-white px-2">
        <div class="flex justify-between items-center py-2 font-semibold border-b border-card-introduce">
            <div class="">收益</div>
            <div :class="isEarings ? 'text-green-600' : 'text-red-600'">{{ isEarings ? '+ ' : '- ' }} 8.888</div>
        </div>
        <div class="flex justify-between text-sm items-center py-2 font-light">
            <div class="">时间</div>
            <div class="">2023.01.23</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isEarings: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped></style>