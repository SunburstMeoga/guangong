<template>
    <div>
        <div>
            <div class="pt-24">
                <div
                    class="relative ml-auto mr-auto w-11/12 h-96 bg-black rounded-xl overflow-hidden flex justify-center items-center mb-4">
                    <div class="w-80 h-80">
                        <img src="@/assets/guangong2.png" alt="">
                    </div>
                    <div
                        class="absolute top-0 left-0 rounded-br-xl inline-block px-4 py-2 bg-success-undertone text-sm text-success-word">
                        武聖出山
                    </div>
                </div>

                <div class="flex flex-col justify-start items-center mb-10">
                    <div class="w-11/12 text-card-content font-medium text-3xl mb-4 flex justify-between items-center">
                        <div>
                            美髯公
                        </div>

                    </div>
                    <div
                        class="w-11/12 flex flex-col justify-between items-center bg-more-content text-icon-gray button-word">
                        <div>
                            当前NFT可合成为汉寿侯
                        </div>
                        <div>
                            合成路线：美髯公 + 赤兔马 + 青龙偃月刀
                        </div>
                    </div>
                    <div class="w-11/12 flex justify-between items-center border-module">
                        <div class="buy-button button-word w-full text-lg">
                            出售
                        </div>
                    </div>

                    <!-- <div class="border-module">
                        <div class="text-icon-gray text-xs mb-1">
                            發行方
                        </div>
                        <div class="flex justify-start items-center mb-8">
                            <div class="rounded-full overflow-hidden w-6 h-6 mr-2">
                                <img src="https://res.ucollex.io/cdn-cgi/image/width=100/images/20220725/5tKs6wbE7CxCMbpkn5DQ.jpg"
                                    alt="">
                            </div>
                            <div class="text-card-content font-medium text-lg">
                                monstercat貓廠
                            </div>
                        </div>
                        <div class="text-icon-gray text-xs mb-1">
                            擁有者
                        </div>
                        <div class="flex justify-start items-center">
                            <div class="rounded overflow-hidden w-6 h-6 mr-2">
                                <img src="https://upload.ucollex.io/cdn-cgi/image/width=512/uploads/dash/ShyePRsApntO.jpg"
                                    alt="">
                            </div>
                            <div class="text-card-content font-medium text-lg">
                                LeBlanc James
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="border-module w-11/12 text-card-content" @click="showStage = !showStage">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">当前阶段</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showStage ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showStage">
                            武聖出山（yue）
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showNextStage = !showNextStage">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">下一阶段</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showNextStage ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showNextStage">
                            百战封神（每個道具卡价值300U）
                        </div>
                    </div> -->

                    <div class="border-module w-11/12 text-card-content">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">詳細資料</div>
                            <!-- <div class="icon iconfont icon-right  show-icon" :class="showDetails ? '-rotate-90' : ''">
                            </div> -->
                        </div>
                        <div class="mt-8" v-show="showDetails">
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">階段</div>
                                <div class="text-base text-card-content">武聖出山</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">發行量</div>
                                <div class="text-base text-card-content">100</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征令牌</div>
                                <div class="text-base text-card-content">關公令</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">令牌價（等值WGT）</div>
                                <div class="text-base text-card-content">150U</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">週期</div>
                                <div class="text-base text-card-content">1周</div>

                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">出征獎勵（等值WGT）</div>
                                <div class="text-base text-card-content">159U</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">月化利率</div>
                                <div class="text-base text-card-content">24%</div>
                            </div>
                            <div class="mb-6">
                                <div class="mb-2 text-xs text-icon-gray">損耗週期</div>
                                <div class="text-base text-card-content">135次</div>

                            </div>
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showRequest = !showRequest">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl">合成要求</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showRequest ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8" v-show="showRequest">
                            美髯公+赤兔馬+青龍偃月刀
                        </div>
                    </div>
                    <div class="border-module w-11/12 text-card-content" @click="showIssue = !showIssue">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl ">發行方</div>
                            <div class="icon iconfont icon-right  show-icon" :class="showIssue ? '-rotate-90' : ''">
                            </div>
                        </div>
                        <div class="mt-8 flex justify-start items-center h-14" v-show="showIssue">
                            <div class="rounded-full overflow-hidden w-10 h-10">
                                <img src="https://res.ucollex.io/cdn-cgi/image/width=100/images/20220725/5tKs6wbE7CxCMbpkn5DQ.jpg"
                                    alt="">
                            </div>
                            <div class="ml-2 flex flex-col justify-between">
                                <div class="text-white font-medium">由 世界關公寶WGT 发行</div>
                                <div class="text-icon-gray">Oct 28, 2022 at 12:34am</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex justify-center items-center pb-32">
                    <div class="w-11/12 bg-more-content text-icon-gray button-word">
                        查看更多該階段下更多NFT
                    </div>
                </div> -->
                <div class="fixed flex justify-between items-center left-0 bottom-0 w-full py-4 px-4 bg-bottom-content">
                    <div class="buy-button w-6/12 text-primary-word text-lg button-word" @click="showSynthesis = true">
                        升级
                    </div>
                    <div class="bg-more-content campaign  flex-1 ml-2 text-primary-word text-lg button-word">
                        出征
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model:show="showSynthesis">
            <div class="text-card-content bg-cover-content flex w-80 pb-6 flex-col justify-start items-center">
                <div class=" leading-6 font-helvetica-neue-bold text-base py-6">合成</div>
                <div class="w-40 h-40 flex justify-center rounded-xl overflow-hidden items-center bg-black mb-3">
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
                </div>
                <div class="w-11/12 mt-4 bg-language-content flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded md:hidden"
                    @click="showSynthesis = false">
                    确认合成
                </div>
                <div class="w-11/12 mt-4 text-tips-word bg-bottom-content text flex justify-evenly items-center py-3.5 text-essentials-white text-sm rounded md:hidden"
                    @click="showSynthesis = false">
                    取消
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Popup } from 'vant';
export default {
    components: { [Popup.name]: Popup },
    data() {
        return {
            showSynthesis: false,
            showNextStage: true,
            showStage: true,
            showRequest: true,
            showDetails: true,
            showIssue: true
        }
    },
    mounted() {
        console.log(this.$route.params)
    },
    methods: {

    }
}
</script>


<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.border-module {
    @apply w-11/12 border-b border-card-introduce py-10 font-light;
}

.show-icon {
    @apply font-extrabold transition ease-in-out duration-200;
}

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