<template>
    <div class="pt-24">
        <div class="text-white">
            <div class="w-11/12 ml-auto mr-auto"><module-title titleWord="关公地图" /></div>
            <div class="w-11/12 ml-auto mr-auto py-4 bg-black rounded">
                <div>

                </div>
            </div>
        </div>
        <div class="fixed left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
            <div class="buy-button text-primary-word text-lg button-word" @click="handleMarking">
                标注地图
            </div>
        </div>

        <van-popup v-model:show="showMarking">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">标注地址</div>
                <!-- <div class="w-40 h-40 flex justify-center rounded-xl overflow-hidden items-center bg-black mb-3">
                    <div class="w-32 h-32">
                        <img src="@/assets/guangong2.png" alt="">
                    </div>
                </div>
                <div class="text-xl mb-2">所需合成材料</div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">美髯公 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">赤兔马 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div>
                <div class="text-icon-gray text-base flex justify-between items-end mb-2">
                    <span class="leading-none mr-6">青龙偃月刀 *1</span>
                    <span class="text-xs">(拥有数量 *12)</span>
                </div> -->
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
                    复制邀请地址
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup } from 'vant';

import ModuleTitle from '@/components/ModuleTitle'
export default {
    components: { ModuleTitle, [Popup.name]: Popup },
    data() {
        return {
            active: 0,
            showMarking: true,
        }
    },
    methods: {
        handleMarking() {
            this.showMarking = true
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