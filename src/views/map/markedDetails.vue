<template>
    <div>
        <div class="py-8">
            <div class="w-11/12 ml-auto mr-auto relative flex justify-center items-center text-card-content mb-4">
                <div class="icon iconfont icon-left absolute left-1" style="font-size: 24px;" @click="cancelPay()"></div>
                <div class="">地址名称</div>
            </div>
        </div>
        <div>

        </div>

    </div>
</template>

<script>
import { userMarkedDetials } from '@/request/api_request'
export default {
    data() {
        return {
            mapID: 0
        }
    },
    mounted() {
        this.mapID = this.$route.params.id
        console.log(this.mapID)
        this.getUserMarkedDetials()
    },
    methods: {
        //查看用户已上传的地图
        getUserMarkedDetials() {
            userMarkedDetials(this.mapID)
                .then(res => {
                    console.log('地图详情', res)
                })
                .catch(err => {
                    console.log('err', err)
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

.border-module {
    @apply border-b border-card-introduce pb-10 font-light;
}

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
    @apply font-medium py-4 rounded flex justify-center items-center;
}
</style>