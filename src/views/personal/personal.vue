<template>
    <div>
        <div class="flex flex-col justify-start items-center pt-20">
            <div class="w-full">
                <personal-assets />
            </div>
            <div class="w-11/12">
                <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab v-for="(item, index) in  nftTypeList " :title="item.title + item.number" class="pt-10">
                        <!-- <module-title :titleWord="item.title" class="mb-4"></module-title> -->
                        <div class="columns-2">
                            <div v-for="( _item, _index ) in  item.list " :key="index" @click="toAassetsDetails"
                                class="rounded-xl mb-4 overflow-hidden break-inside-avoid shadow-md">
                                <assets-card :imageUrl="_item" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import PersonalAssets from '@/components/PersonalAssets'
import AssetsCard from '@/components/AssetsCard'
import { Tab, Tabs } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs, PersonalAssets, AssetsCard },
    data() {
        return {
            nftTypeList: [{ title: 'NFT角色卡', number: 12, list: [require('@/assets/huangzhong1.png'), require('@/assets/qianlidanji.png'), require('@/assets/shuiyanqijun.png'), require('@/assets/shuiyanqijun.png'), require('@/assets/shuiyanqijun.png'), require('@/assets/qianlidanji.png'), require('@/assets/taoyuanjieyi.png'), require('@/assets/taoyuanjieyi.png'), require('@/assets/taoyuanjieyi.png'), require('@/assets/taoyuanjieyi.png'), require('@/assets/taoyuanjieyi.png'), require('@/assets/taoyuanjieyi.png')] },
            { title: '合成道具卡', number: 6, list: [require('@/assets/qianlidanji.png'), require('@/assets/guanyu2.png'), require('@/assets/qianlidanji.png'), require('@/assets/huangzhong1.png'), require('@/assets/huangzhong1.png'), require('@/assets/guanyu3.png')] },
            { title: '战法道具卡', number: 9, list: [require('@/assets/zhangfei.png'), require('@/assets/zhaoyun.png'), require('@/assets/huangzhong.png'), require('@/assets/zhangfei.png'), require('@/assets/zhaoyun.png'), require('@/assets/huangzhong.png'), require('@/assets/zhangfei.png'), require('@/assets/zhaoyun.png'), require('@/assets/huangzhong.png')] }],
        }
    },
    methods: {
        toAassetsDetails() {
            this.$router.push({
                path: '/assets/2343224'
            })
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.van-tabs__wrap {
    height: 80px;
}
</style>