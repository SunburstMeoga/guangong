<template>
    <div>
        <div class="relative">
            <div>
                <img v-lazy="imageUrl" alt="">
            </div>
            <!-- <div
                class="absolute top-0 right-0 rounded-bl-lg py-1 px-4 backdrop-blur-sm text-xs text-assets-word bg-black/50">
                出征中
            </div> -->
        </div>
        <div class="backdrop-blur-3xl text-xs text-assets-word bg-module-card px-2 py-1">
            <div class="text-theme-primary text-2xl font-semibold mb-3">{{ name }}</div>
            <div class="text-icon-gray">收益开始时间：{{ time }}</div>
            <div class="text-icon-gray">支付方式：{{ isWGA ? 'WGT-A支付' : 'WGT支付' }}</div>


            <div class="campaign mt-4 text-whites text-center py-2 mb-2 rounded" @click="receiveProceeds">{{ incomeMethod }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },

        time: {
            type: Number,
            default: 0
        },
        imageUrl: {
            type: String,
            default: ''
        },
        incomeMethod: {
            type: String,
            default: ''
        },
        isWGA: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        receiveProceeds() {
            this.$emit('receiveProceeds')
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.campaign {
    background: rgb(89, 32, 116);
    background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}
</style>