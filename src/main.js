import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/scss/tailwind.css";
import "@/assets/scss/iconfont.css";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import i18n from "./language";
import store from "./store";
import loading from "@/components/loading";
createApp(App)
  .use(router)
  .use(Vant)
  .use(i18n)
  .use(store)
  .use(loading)
  .mount("#app");
