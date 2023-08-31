<template>
    <div>
        <div class="py-3 px-2 flex justify-between items-center">
            <div class="flex-1 mr-10">
                <div class="attribute-item">
                    <div class="attribute-lable">地图名称：</div>
                    <div class="text-card-content text-sm">{{ mapName }}</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">地图ID：</div>
                    <div class="text-card-content text-sm">#{{ mapID }}</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">地图位置：</div>
                    <div class="text-card-content text-sm">{{ mapAddress }}</div>
                </div>
                <!-- <div class="attribute-item">
                    <div class="attribute-lable">关公祭数量：</div>
                    <div class="text-card-content text-sm flex-1">{{ mapAddress }}</div>
                </div>

                <div class="attribute-item">
                    <div class="attribute-lable">标注状态：</div>
                    <div class="text-card-content text-sm">
                        {{ getMarkState(markState) }}
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">已确认地址：</div>
                    <div class="text-card-content text-sm flex-1">3</div>
                </div>
                <div class="w-full">
                    <div v-for="(item, index) in 3" :key="index"
                        class="text-tips-word w-full bg-bottom-content py-1 px-2 mb-1 text-essentials-white text-xs rounded">
                        0x1e7e6f6e85668dd1783f3f94a45f71a716eaf5cb
                    </div>
                </div> -->
            </div>
            <div>
                <div class="icon iconfont icon-right text-card-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mapName: {
            type: String,
            default: ''
        },
        mapID: {
            type: Number,
            default: ''
        },
        mapAddress: {
            type: String,
            default: ''
        },
        markState: {
            type: Number,
            default: ''
        }
    },
    data() {
        return {
            markWord: 'test'
        }
    },
    methods: {
        getMarkState() {
            switch (this.markState) {
                case 0: return '上传未确认'
                    break;
                case 1: return '已上传确认'
                    break;
                case 2: return '待认证'
                    break;
                case 3: return '已认证'
                    break;
            }
        }
    }
}
</script>

<style scoped>
.attribute-item {
    @apply flex justify-start items-start mb-2;
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