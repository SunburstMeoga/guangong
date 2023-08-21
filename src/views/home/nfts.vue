<template>
    <div>
        <div class="pt-24 text-white">
            <div class="relative w-full">
                <div class="module">
                    <module-title titleWord="二级市场" />
                </div>
                <div class="absolute left-0">
                    <img src="@/assets/shop-bg2.png" alt="">
                </div>
                <div class="mt-20">
                    <van-tabs v-model:active="active" shrink swipeable sticky title-active-color="#E20F2A"
                        background="#121212" color="#E20F2A">
                        <van-tab v-for="(item, index) in  typeList" :title="item" class="pt-4">

                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle.vue'
import { Tab, Tabs } from 'vant';

export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs },
    data() {
        return {
            typeList: ['NFT角色卡', '合成道具卡', '战法道具卡']
        }
    }
}
</script>

<style scopeed>
img {
    width: 100%;
    height: 100%;
    object-fit: contain
}

.module {
    @apply w-11/12 mr-auto ml-auto;
}
</style>