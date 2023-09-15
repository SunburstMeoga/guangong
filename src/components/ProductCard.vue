<template>
    <div>
        <div class="px-4">
            <div class="rounded-xl inline-block px-2 py-px bg-success-undertone text-sm text-success-word mb-6">
                {{ cardTag }}
            </div>
            <div class="title text-3xl font-bold text-theme-primary leading-12 mb-6">
                {{ name }}
            </div>
            <!-- <div class="flex justify-start items-center mb-10">
                <div class="w-8 h-8 rounded-full overflow-hidden mr-1.5">
                    <img src="@/assets/owner.png" alt="">
                </div>
                <div class="text-sm text-card-content">
                    <div class="text-icon-gray text-xs">拥有者</div>
                    <div class="font-bold">Jack Zhang</div>
                </div>
            </div> -->
            <div class="flex justify-center items-center mb-20">
                <div class="w-11/12 h-72">
                    <img :src="imageUrl" alt="">
                </div>
            </div>
            <div class="px-4 py-4 rounded-lg backdrop-blur bg-module-card" style="background-color: rgb(47 47 50 / 0.6);">
                <div class="flex justify-center items-center mb-6">
                    <div class="flex justify-start items-center w-11/12">
                        <div class="pr-10">
                            <div class="text-card-title text-sm font-light mb-2">数量</div>
                            <div class="text-card-content text-2xl font-semibold">{{ circulation }}</div>
                        </div>
                        <div>
                            <div class="text-card-title text-sm font-light mb-2">价格</div>
                            <div class="text-card-content text-2xl font-semibold">{{ card_type == 'fortune_card' ?
                                Number(price) * 20 : price }} {{ (card_type
        == 'nft_role' || card_type
        == 'synthesis_props') ? 'U' :
        (card_type == 'fortune_card' ? 'WGA' : 'WGT') }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <div class="buy-button w-11/12 rounded py-3 flex justify-center items-center text-primary-word text-lg">
                        <!-- {{ $t('product.buy') }} -->
                        查看详情
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helpContractApi from '@/request/ether_request/help'

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
        cardTag: {
            type: String,
            default: ''
        },
        card_type: {
            type: String,
            default: ''
        },
        circulation: {
            type: Number,
            default: 0
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

.buy-button {
    background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}
</style>