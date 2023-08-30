<template>
    <div>
        <div class="p-2">
            <div class="attribute-item">
                <div class="attribute-lable">地址名称：</div>
                <div class="attribute-lable">番禺大石关帝岗</div>
            </div>
            <div class="attribute-item">
                <div class="attribute-lable">地址ID：</div>
                <div class="attribute-lable">#4008517517</div>
            </div>
            <div class="attribute-lable mb-2">请选择香火价位进行祭拜</div>
            <div class="flex justify-between items-center">
                <div v-for="(item, index) in priceList" :key="index">
                    {{ item.price }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            priceList: []
        }
    }
}
</script>

<style scoped>
.attribute-item {
    @apply flex justify-start items-center mb-4;
}

.attribute-lable {
    @apply text-card-content text-sm;
}
</style>