<template>
    <div>
        <div class="relative">
            <div>
                <img :src="imageUrl" alt="">
            </div>
            <!-- <div
                class="absolute top-0 right-0 rounded-bl-lg py-1 px-4 backdrop-blur-sm text-xs text-assets-word bg-black/50">
                出征中
            </div> -->
        </div>
        <div class="backdrop-blur-3xl text-sm text-assets-word bg-module-card pl-2 py-1">
            <div class="text-theme-primary text-xl">{{ name }}</div>
            <div class="text-icon-gray">{{ cardType }}</div>
            <!-- <div class="text-icon-gray"> 正在出征 </div> -->
            <div v-if="type === 'pending'" class="text-icon-gray">No. {{ nftID }}</div>
            <div v-else class="text-icon-gray">No. {{ token }}</div>
            <div class="text-icon-gray text-right pr-2 font-bold">{{ card_type == 'fortune_card' ? Number(price) / 500 :
                price
            }} {{ currency == 'nft_role' ? 'U'
    :
    (currency == 'fortune_card' ? 'WGA' : 'WGT') }}</div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
        token: {
            type: Number,
            default: 0
        },
        cardType: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        nftID: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: ''
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
</style>