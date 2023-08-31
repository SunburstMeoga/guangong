<template>
    <div>
        <div class="py-3 px-2 flex justify-between items-center">
            <div class="flex-1 mr-10">
                <div class="attribute-item">
                    <div class="attribute-lable">地址名称：</div>
                    <div class="text-card-content text-sm">番禺大石关帝岗</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">地址ID：</div>
                    <div class="text-card-content text-sm">#4008517517</div>
                </div>
                <div class="attribute-lable mb-2">请选择香火价位进行祭拜</div>
                <div class="flex justify-between items-center">
                    <div v-for="(item, index) in priceList" :key="index"
                        class="px-2 bg-more-content text-icon-gray text-sm rounded-md"
                        :class="currentPrice === index ? 'buy-button' : ''" @click="handlePrice(index)">
                        {{ item.price }}
                    </div>
                </div>
            </div>
            <div>
                <div class="campaign py-1 px-4 rounded-sm">
                    祭拜
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            priceList: [
                { price: '1U', value: 0 },
                { price: '5U', value: 0 },
                { price: '10U', value: 0 },
                { price: '100U', value: 0 }
            ],
            currentPrice: 0
        }
    },
    methods: {
        handlePrice(index) {
            this.currentPrice = index
        }
    }
}
</script>

<style scoped>
.attribute-item {
    @apply flex justify-start items-center mb-2;
}

.attribute-lable {
    @apply text-tips-word text-sm;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
    color: #000;
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>