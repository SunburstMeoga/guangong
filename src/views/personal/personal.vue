<template>
    <div>
        <div class="flex flex-col justify-start items-center pt-24">
            <!-- <div class="w-11/12">
                <module-title titleWord="所有资产"></module-title>
            </div> -->
            <div class="w-11/12">
                <van-tabs v-model:active="active" scrollspy sticky title-active-color="#E20F2A" background="#121212"
                    color="#E20F2A">
                    <van-tab v-for="(item, index) in  nftTypeList " :title="item.title + item.number" class="pt-10">
                        <module-title :titleWord="item.title" class="mb-4"></module-title>
                        <div class="flex justify-between items-center flex-wrap">
                            <div v-for="( _item, _index ) in  item.list " :key="index" @click="toAassetsDetails"
                                class="rounded-xl overflow-hidden mb-4" style="width: 48%;">
                                <img :src="_item" alt="">
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
import { Tab, Tabs } from 'vant';
export default {
    components: { ModuleTitle, [Tab.name]: Tab, [Tabs.name]: Tabs },
    data() {
        return {
            nftTypeList: [{ title: 'NFT角色卡', number: 4, list: [require('@/assets/guangong1.png'), require('@/assets/guangong2.png'), require('@/assets/guangong3.png')] },
            { title: '合成道具卡', number: 6, list: [require('@/assets/guanyu1.png'), require('@/assets/guanyu2.png'), require('@/assets/guanyu3.png')] },
            { title: '战法道具卡', number: 4, list: [require('@/assets/zhangfei.png'), require('@/assets/zhaoyun.png'), require('@/assets/huangzhong.png')] }],
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