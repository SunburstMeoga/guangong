<template>
    <div class="pt-24">
        <div class="text-white">
            <div class="w-11/12 ml-auto mr-auto"><module-title titleWord="关公地图" /></div>
            <div class="w-11/12 ml-auto mr-auto py-4 bg-black rounded">
                <div v-for="(item, index) in 5" :key="index">
                    <festival-card />
                </div>
            </div>
        </div>

        

        <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
            <div class="buy-button text-primary-word text-lg button-word" @click="handleMarking">
                标注地图
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
                    <input class="w-full h-full bg-bottom-content" type="text" placeholder="请输入地图名称">
                </div>
                <div class="w-11/12 text-sm mb-1">
                    地图地址
                </div>
                <div
                    class="mb-4 w-11/12 break-all text-tips-word  bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                    <input class="w-full h-full bg-bottom-content" type="text" placeholder="请输入地图地址">
                </div>
                <div class="w-11/12 text-sm mb-1">
                    邀请链接
                </div>
                <div
                    class="w-11/12 break-all mb-4 text-tips-word bg-bottom-content flex justify-evenly items-center py-3.5 px-2 text-essentials-white text-sm rounded md:hidden">
                    http://localhost:8081/recommend?p=0x1e7e6f6e85668dd1783f3f94a45f71a716eaf5cb
                </div>
                <div
                    class="w-11/12 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded md:hidden">
                   上传标注信息并复制邀请地址
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup } from 'vant';
import FestivalCard from '@/components/festivalCard'
import ModuleTitle from '@/components/ModuleTitle'
export default {
    components: { ModuleTitle, [Popup.name]: Popup, FestivalCard },
    data() {
        return {
            active: 0,
            showUpdataLocation: true,
        }
    },
    methods: {
        handleMarking() {
            this.showUpdataLocation = true
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
</style>