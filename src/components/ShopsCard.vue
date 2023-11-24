<template>
    <div class="text-white">
        <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
            <swiper-slide v-for="(item, index) in shopsList" :key="index">
                <div class="w-full h-full relative">
                    <div>
                        <img class="w-full h-full absolute left-0 top-0" v-lazy="item.imageUrl" alt="">
                    </div>
                    <div class="absolute left-4 bottom-4">
                        <div class="w-8 h-8 rounded-full overflow-hidden bg-theme-primary">
                            <img src="../assets/logo.png" alt="">
                        </div>
                        <div class="mt-2 mb-4 text-2xl text-white truncate">
                            這裡是商鋪名稱
                        </div>
                        <span
                            class="inline-block py-4 bg-shops-content !leading-3rem px-6 bg-opacity-20 backdrop-filter !backdrop-blur-sm rounded normal-case text-essentials-white text-xs border-none">
                            共 {{ index + 12 }} 件商品
                        </span>
                    </div>
                </div>

            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cards';

// import './style.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default {
    props: {
        shopsList: {
            type: Object,
            default: () => []
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [EffectCards],
        };
    },
};
</script>
<style scoped>
img {
    object-fit: cover;
}

.swiper {
    width: 320px;
    height: 420px;
    border: none;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background: #000;
}
</style>