<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">地图详情</div>
            </div>
        </div>
        <div>
            <div
                class="w-11/12 px-2 py-4 ml-auto mr-auto bg-cover-content flex justify-start items-center rounded text-white mb-4">
                <div class="mr-3">
                    <span class="relative flex h-4 w-4">
                        <!-- <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span> -->
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
                    </span>
                </div>
                <div>
                    该地址正在等待后台审核...
                </div>
            </div>
            <!-- <div class="w-11/12 ml-auto mr-auto text-2xl  text-left text-white font-bold mb-4">
                {{ mapInfo.name }}
            </div> -->

            <div class="w-11/12 ml-auto p-2 mr-auto bg-cover-content rounded text-white mb-4">
                <div class="attribute-item">
                    <div class="attribute-lable">地图名称：</div>
                    <div class="text-card-content text-sm">{{ mapInfo.name }}</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">地图ID：</div>
                    <div class="text-card-content text-sm">#{{ mapInfo.id }}</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">关公祭金额：</div>
                    <div class="text-card-content text-sm">{{ mapInfo.worship }} WGT</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">地图数据位置：</div>
                    <div class="text-card-content text-sm">{{ mapInfo.index }}</div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-lable">邀请链接：</div>
                    <div class="text-card-content text-sm">{{ shareUrl }}</div>
                </div>
            </div>

            <div class="w-11/12 ml-auto mr-auto text-white mb-2">
                已确认地址 ( 3 )
            </div>
            <div class="w-11/12 ml-auto p-2 mr-auto bg-cover-content rounded text-white text-xs mb-2"
                v-for="(item, index) in 3" :key="index">
                0x1E7e6F6E85668dD1783f3f94a45F71a716Eaf5cB
            </div>
        </div>


    </div>
</template>

<script>
import { userMarkedDetials } from '@/request/api_request'
export default {
    data() {
        return {
            mapID: 0,
            mapInfo: {},
            shareUrl: '这里是邀请链接'
        }
    },
    mounted() {
        this.mapID = this.$route.params.id
        console.log(this.mapID)
        this.getUserMarkedDetials()
    },
    methods: {
        //查看用户已上传的地图
        getUserMarkedDetials() {
            this.$loading.show()
            userMarkedDetials(this.mapID)
                .then(res => {
                    console.log('地图详情', res)
                    this.mapInfo = res.data
                    console.log(this.mapInfo)
                    this.$loading.hide()
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()

                })
        },
        viewMyMarkedDetails() {

        },
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

.attribute-item {
    @apply flex justify-start items-start mb-2;
}

.attribute-lable {
    @apply text-tips-word text-sm;
}

.border-module {
    @apply border-b border-card-introduce pb-10 font-light;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
    @apply font-medium py-4 rounded flex justify-center items-center;
}
</style>