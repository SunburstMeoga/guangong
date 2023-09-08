<template>
    <div class="pt-24">
        <div v-if="!isConfirm">
            <div class="text-white">
                <div class="w-11/12 ml-auto mr-auto"><module-title titleWord="关公地图" /></div>
                <div class="w-11/12 ml-auto mr-auto py-4">
                    <div v-for="(item, index) in worshipsList" :key="index" class="bg-black rounded mb-4">
                        <festival-card :cardInfo="item" @handlewWrship="toWrship" />
                    </div>
                    <div v-if="worshipsList.length == 0" class="mt-14 text-center text-icon-gray font-extrabold text-2xl">
                        暂无关公地图数据
                    </div>
                </div>
            </div>

            <div class="fixed left-0 bottom-0 flex justify-between items-center w-full py-4 px-4 bg-bottom-content">
                <div class="buy-button w-5/12 text-primary-word text-lg button-word" @click="handleMarking">
                    上传地图
                </div>
                <div class="campaign w-5/12 text-primary-word text-lg button-word" @click="viewMyMarked">
                    我的地图
                </div>
            </div>


            <van-popup v-model:show="showUpdataLocation">
                <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                    <div class=" leading-6 font-helvetica-neue-bold text-base py-6">上传地图</div>

                    <div class="w-11/12 text-sm mb-1">
                        地图名称
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="name" placeholder="请输入地图名称">
                    </div>
                    <div class="w-11/12 text-sm mb-1">
                        地图地址
                    </div>
                    <div
                        class="mb-8 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="map_address"
                            placeholder="请输入地图地址">
                    </div>
                    <!-- <div class="w-11/12 text-sm mb-1">
                        地图ID(任意整数)
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="locationID" placeholder="请输入地图ID">
                    </div> -->
                    <!-- <div class="w-11/12 text-sm mb-1">
                        邀请链接
                    </div>
                    <div
                        class="w-11/12 break-all mb-4 text-tips-word bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        http://localhost:8081/recommend?p=0x1e7e6f6e85668dd1783f3f94a45f71a716eaf5cb
                    </div> -->
                    <div class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="handleUpdataLocation">
                        上传地图信息
                    </div>
                </div>
            </van-popup>
        </div>
        <div v-else class="text-white">
            <van-popup v-model:show="showConfirm" :close-on-click-overlay="false">
                <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                    <div class=" leading-6 font-helvetica-neue-bold text-base py-6">邀请确认</div>
                    <div class="w-11/12 text-sm mb-1">
                        地图ID
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all   bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        # {{ tobeConfirmMap.id }}
                    </div>
                    <div class="w-11/12 text-sm mb-1">
                        地图名称
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all   bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        {{ tobeConfirmMap.name }}
                    </div>
                    <div class="w-11/12 text-sm mb-1">
                        地图地址
                    </div>
                    <div
                        class="mb-8 w-11/12 break-all   bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded ">
                        {{ tobeConfirmMap.map_address }}
                    </div>

                    <div class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded "
                        @click="otherConfirmMapInfo">
                        确认
                    </div>
                </div>
            </van-popup>
        </div>

        <van-popup v-model:show="showWorship" :close-on-click-overlay="false">
            <div class="text-card-content bg-cover-content flex w-80 flex-col justify-start items-center">
                <img src="@/assets/worship.gif" alt="">
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup, showToast, showSuccessToast, showDialog } from 'vant';
import FestivalCard from '@/components/festivalCard'
import ModuleTitle from '@/components/ModuleTitle'
import { markMap, confirmMapInfo, updataMap, worship } from '@/request/ether_request/map'
import { getLocationID, userMarkedMapList, userMarkedDetials, worshipList } from '@/request/api_request'
export default {
    components: { ModuleTitle, [Popup.name]: Popup, FestivalCard, },
    data() {
        return {
            active: 0,
            showUpdataLocation: false,
            locationID: null,
            map_address: null,
            name: null,
            isConfirm: false,
            uploadAddress: '',
            mapIndex: 0,
            showConfirm: true,
            mapID: 0,
            tobeConfirmMap: {},
            worshipsList: [],
            shareUrl: '',
            showWorship: false
        }
    },
    mounted() {
        console.log(this.$route.query)
        this.getWorshipList()
        if (this.$route.query.uploadAddress) {
            this.$loading.show()
            this.uploadAddress = this.$route.query.uploadAddress
            this.mapIndex = this.$route.query.index
            this.mapID = this.$route.query.mapID
            this.getUserMarkedDetials()
            this.isConfirm = true
        }
    },
    methods: {
        //祭拜
        toWrship(price, cardInfo) {
            this.$loading.show()
            console.log(price, cardInfo)
            worship(cardInfo.address, cardInfo.index, price)
                .then(res => {
                    this.$loading.hide()
                    showToast('祭拜成功', res)
                    // this.showWorship = true
                })
                .catch(err => {
                    this.$loading.hide()
                    showToast('祭拜失败，请重试')
                })
        },
        userUpdataMap(locationID) {
            updataMap(locationID)
                .then(res => {
                    this.$loading.hide()
                    console.log('上传地图id到智能合约', res)
                    navigator.clipboard.writeText(this.shareUrl).then(() => {
                        showDialog({
                            title: '上传地图成功',
                            message: '地图已上传成功，并已复制邀请链接',
                        }).then(() => {

                        });
                    }, () => {
                        showDialog({
                            title: '上传地图成功',
                            message: '地图已上传成功!',
                        }).then(() => {

                        });
                    });

                })
                .catch(err => {
                    this.$loading.hide
                    console.log('err', err)
                })
        },
        //关公祭列表
        getWorshipList() {
            worshipList()
                .then(res => {
                    console.log("关公祭列表", res)
                    this.worshipsList = res.data
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        //被邀请玩家进行确认操作
        otherConfirmMapInfo() {
            let that = this
            console.log(this.uploadAddress, this.mapIndex, window.ethereum.selectedAddress)
            this.$loading.show()
            console.log(this.uploadAddress, this.mapIndex)
            confirmMapInfo(this.uploadAddress, this.mapIndex)
                .then(res => {
                    console.log('已确认', res)
                    this.$loading.hide()
                    showDialog({
                        message: '已确认该地址',
                        theme: 'round-button',
                    }).then(() => {
                        that.$router.push({
                            path: '/'
                        })
                    });
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                    showToast('确认失败，请重新确认')
                })
        },
        //待确认的地图信息
        getUserMarkedDetials() {
            userMarkedDetials(this.mapID)
                .then(res => {
                    console.log('地图详情', res)
                    this.tobeConfirmMap = res.data
                    this.$loading.hide()
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                })
        },
        viewMyMarked() {
            this.$router.push({
                path: '/map/my-maps'
            })
        },
        handleMarking() {
            this.showUpdataLocation = true
        },
        handleUpdataLocation() {
            let that = this
            console.log(window.location)
            // return
            if (!that.name || !that.map_address) {
                showToast('请完善地图信息')
                return
            }
            this.showUpdataLocation = false
            this.$loading.show()
            console.log(ethereum.selectedAddress)
            getLocationID(window.ethereum.selectedAddress, {
                name: this.name,
                map_address: this.map_address
            })
                .then(res => {
                    console.log('上传成功的地址信息', res)
                    this.shareUrl = `${window.location.href}?uploadAddress=${window.ethereum.selectedAddress}&index=${res.data.index}&mapID=${res.data.id}`
                    this.userUpdataMap(res.data.id)
                })
                .catch(err => {
                    console.log('err', err)
                    this.$loading.hide()
                })
        },
        markMapLocation(mapIndex) {
            markMap(mapIndex)
                .then(res => {
                    console.log('标注地址成功', res)
                    this.showUpdataLocation = false
                    this.getMapLink()
                })
                .catch(err => {
                    console.log(err)
                    this.$loading.hide()
                    this.showUpdataLocation = false
                })
        },
        getMapLink() {
            let that = this
            userMarkedMapList(ethereum.selectedAddress)
                .then(res => {
                    console.log('邀请链接', res)
                    let url = `${window.loacation.href}?uploadAddress=${window.ethereum.selectedAddress}&index=${res.data.index}&mapID=${$res.data.id}`
                    console.log(url)
                    navigator.clipboard.writeText(url).then(() => {
                        showSuccessToast('邀请链接已复制成功')
                        that.$loading.hide()
                    }, () => {
                        // Toast.fail(this.$t('toast.copyFail'))

                    });
                })
                .catch(err => {
                    console.log('err', err)
                })
        }
    }
}
</script>

<style scoped>
.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
    @apply font-medium py-3 rounded flex justify-center items-center
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>