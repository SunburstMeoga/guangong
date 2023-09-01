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
                    {{ getStateWord(mapInfo.state) }}
                </div>
            </div>
            <!-- <div class="w-11/12 ml-auto mr-auto text-2xl  text-left text-white font-bold mb-4">
                {{ mapInfo.name }}
            </div> -->

            <div class="w-11/12 ml-auto p-2 mr-auto bg-cover-content rounded text-white mb-8">
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
                <!-- <div class="attribute-item">
                    <div class="attribute-lable w-3/12">邀请链接：</div>
                    <div class="text-card-content text-sm text-decoration-line break-all flex-1">{{ shareUrl }}</div>
                </div> -->
            </div>

            <div class="w-11/12 ml-auto mr-auto text-white mb-2">
                邀请链接
            </div>
            <div
                class="w-11/12 ml-auto p-2 pb-8 mr-auto bg-cover-content rounded text-white text-sm mb-8 break-all relative">
                {{ shareUrl }}
                <div class="absolute buy-button right-2 bottom-2 px-2 rounded-full text-sm text-primary-word"
                    @click="copyContent">
                    复制链接
                </div>
            </div>

            <div class="w-11/12 ml-auto mr-auto text-white mb-2">
                已确认玩家 ( {{ confirmsList.length }} )
            </div>
            <div v-if="confirmsList.length !== 0">
                <div class="w-11/12 ml-auto p-2 mr-auto bg-cover-content rounded text-white text-sm mb-2"
                    v-for="(item, index) in confirmsList.length" :key="index">
                    {{ item }}
                </div>
            </div>
            <div v-else class="w-11/12 ml-auto p-2 mr-auto bg-cover-content rounded text-white text-sm mb-2">
                暂无玩家对该地图进行确认
            </div>
        </div>

        <div class="fixed left-0 bottom-0 flex justify-between items-center w-full py-4 px-4 bg-bottom-content">
            <div class="buy-button w-5/12 text-primary-word text-lg button-word" @click="markMapLocation">
                申请认证
            </div>
            <div class="campaign w-5/12 text-primary-word text-lg button-word" @click="cancelMapLocation">
                撤销认证
            </div>
        </div>


    </div>
</template>

<script>
import { userMarkedDetials } from '@/request/api_request'
import { markMap, cancelMarkMap } from '@/request/ether_request'
import { showToast } from 'vant'

export default {
    data() {
        return {
            mapID: 0,
            mapInfo: {},
            shareUrl: '这里是邀请链接',
            confirmsList: []
        }
    },
    mounted() {
        this.mapID = this.$route.params.id
        console.log(window.location.host)
        this.getUserMarkedDetials()
    },
    methods: {
        //复制
        copyContent() {
            navigator.clipboard.writeText(this.shareUrl).then(() => {
                showToast('已复制')
            }, () => {
                showToast('失败，请重新复制')
            });
        },
        //撤销认证
        cancelMapLocation() {
            cancelMarkMap()
                .then(res => {
                    console.log('取消认证', res)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //认证关公地图
        markMapLocation() {
            markMap(this.mapInfo.index)
                .then(res => {
                    console.log('认证地址', res)
                    this.showUpdataLocation = false
                    this.getMapLink()
                })
                .catch(err => {
                    console.log(err)
                    this.$loading.hide()
                    this.showUpdataLocation = false
                })
        },
        getStateWord(state) {
            switch (state) {
                case 0: return '该地址正在等待其它玩家确认...'
                case 1: return '该地址已被其它玩家确认~'
                case 2: return '该地址正在申请地图认证...'
                case 3: return '该地址已通过认证申请。'
            }
        },
        //查看用户已上传的地图
        getUserMarkedDetials() {
            this.$loading.show()
            userMarkedDetials(this.mapID)
                .then(res => {
                    console.log('地图详情', res)
                    this.mapInfo = res.data
                    this.confirmsList = res.data.confirm
                    this.shareUrl = `${window.location.host}/#/map?uploadAddress=${window.ethereum.selectedAddress}&index=${res.data.index}&mapID=${res.data.id}`
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

.button-word {
    @apply font-medium py-3 rounded flex justify-center items-center
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>