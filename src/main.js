import { createApp } from "vue";

import VueLazyload from "vue-lazyload";
import App from "./App.vue";
import "@/assets/scss/tailwind.css";
import "@/assets/scss/iconfont.css";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import i18n from "./language";
import store from "./store";
import loading from "@/components/loading";
import Confirm from "./components/confirm";
createApp(App)
  .use(router)
  .use(Vant)
  .use(i18n)
  .use(store)
  .use(loading)
  .use(Confirm)
  .use(VueLazyload, {
    preLoad: 1.3, //预加载的宽高比
    loading: require("@/assets/loading.gif"), //图片加载状态下显示的图片
    // error: errorimage, //图片加载失败时显示的图片
    attempt: 1, // 加载错误后最大尝试次数
  })
  .mount("#app");
