<template>
    <div class="pt-24">
        <div v-if="isConfirm">
            <div class="text-white">
                <div class="w-11/12 ml-auto mr-auto"><module-title titleWord="关公地图" /></div>
                <div class="w-11/12 ml-auto mr-auto py-4">
                    <div v-for="(item, index) in 5" :key="index" class="bg-black rounded mb-4">
                        <festival-card />
                    </div>
                </div>
            </div>



            <div class="fixed left-0 bottom-0 flex justify-between items-center w-full py-4 px-4 bg-bottom-content">
                <div class="buy-button w-5/12 text-primary-word text-lg button-word" @click="handleMarking">
                    标注地图
                </div>
                <div class="campaign w-5/12 text-primary-word text-lg button-word" @click="handleMarking">
                    我的标注
                </div>
            </div>


            <van-popup v-model:show="showUpdataLocation">
                <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                    <div class=" leading-6 font-helvetica-neue-bold text-base py-6">标注地址</div>

                    <div class="w-11/12 text-sm mb-1">
                        地图名称
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="name" placeholder="请输入地图名称">
                    </div>
                    <div class="w-11/12 text-sm mb-1">
                        地图地址
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="map_address"
                            placeholder="请输入地图地址">
                    </div>
                    <!-- <div class="w-11/12 text-sm mb-1">
                        地图ID(任意整数)
                    </div>
                    <div
                        class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                        <input class="w-full h-full bg-bottom-content" type="text" v-model="locationID" placeholder="请输入地图ID">
                    </div> -->
                    <!-- <div class="w-11/12 text-sm mb-1">
                        邀请链接
                    </div>
                    <div
                        class="w-11/12 break-all mb-4 text-tips-word bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                        http://localhost:8081/recommend?p=0x1e7e6f6e85668dd1783f3f94a45f71a716eaf5cb
                    </div> -->
                    <div class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded md:hidden"
                        @click="handleUpdataLocation">
                        上传标注信息
                    </div>
                </div>
            </van-popup>
        </div>
        <div v-else class="text-white">
            确认
        </div>
    </div>
</template>

<script>
import { Popup, showToast, showSuccessToast } from 'vant';
import FestivalCard from '@/components/festivalCard'
import ModuleTitle from '@/components/ModuleTitle'
import { updataMap, userMarkedMap } from '@/request/ether_request'
import { getLocationID, mapLink } from '@/request/api_request'
export default {
    components: { ModuleTitle, [Popup.name]: Popup, FestivalCard },
    data() {
        return {
            active: 0,
            showUpdataLocation: false,
            locationID: null,
            map_address: null,
            name: null,
            isConfirm: true
        }
    },
    mounted() {
        this.getUserMarkedMap()
    },
    methods: {
        //查看用户标注过的地图
        getUserMarkedMap() {
            userMarkedMap(ethereum.selectedAddress)
                .then(res => {
                    console.log('当前用户标注过地图', res)
                })
                .catch(err => {
                    console.log('err', err)
                })
        },
        handleMarking() {
            this.showUpdataLocation = true
        },
        handleUpdataLocation() {
            if (!this.name || !this.map_address) {
                showToast('请完善地图信息')
                return
            }
            this.showUpdataLocation = false
            this.$loading.show()
            getLocationID(ethereum.selectedAddress, {
                name: this.name,
                map_address: this.map_address
            })
                .then(res => {
                    console.log('上传成功的地址信息', res)
                    this.updataMapLocation(res.data.id)
                })
                .catch(err => {
                    this.$loading.hide()
                })
        },
        updataMapLocation(locationID) {
            updataMap(locationID)
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
            mapLink(ethereum.selectedAddress)
                .then(res => {
                    console.log('邀请链接', res)
                    navigator.clipboard.writeText(res.data.index).then(() => {
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
    @apply font-medium py-4 rounded flex justify-center items-center
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>