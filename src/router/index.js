import { createRouter, createWebHistory } from "vue-router";
import home from "./home";
import personal from "./personal";
import recommend from "./recommend";
import mapPlay from "./map_paly";
const routes = [...home, ...personal, ...recommend, ...mapPlay];

export default createRouter({
  history: createWebHistory(),
  routes,
});
