<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">我上传的地图</div>
            </div>
        </div>
        <div class="text-white">

            <div class="w-11/12 ml-auto mr-auto">
                <div v-for="(item, index) in mapsList" :key="index" class="bg-black rounded mb-4"
                    @click="viewMyMarkedDetails(item)">
                    <my-map-card :mapName="item.name" :mapAddress="item.map_address" :mapID="item.id"
                        :markState="item.state" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { userMarkedMapList } from '@/request/api_request'
import MyMapCard from '@/components/MyMapCard.vue'
export default {
    components: { MyMapCard },
    data() {
        return {
            mapsList: []
        }
    },
    mounted() {
        this.getUserMarkedMapList()
    },
    methods: {
        viewMyMarkedDetails(item) {
            console.log(item)
            this.$router.push({
                path: '/map/my-details/' + item.id
            })
        },
        cancelPay() {
            window.history.back();
        },
        getUserMarkedMapList() {
            this.$loading.show()
            console.log('userMarkedMapList', window.ethereum.selectedAddress)
            userMarkedMapList(ethereum.selectedAddress)
                .then(res => {
                    console.log('marked maps', res)
                    this.mapsList = res.data
                    this.$loading.hide()
                })
                .catch(err => {
                    console.log(err)
                    this.$loading.hide()
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

.border-module {
    @apply border-b border-card-introduce pb-10 font-light;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
    @apply font-medium py-4 rounded flex justify-center items-center;
}
</style>