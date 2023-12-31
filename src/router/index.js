// import { createRouter, createWebHistory } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

import home from "./home";
import personal from "./personal";
import recommend from "./recommend";
import mapPlay from "./map_paly";
import exchange from "./exchange";
import myTeam from "./my_team";

const routes = [
  ...home,
  ...personal,
  ...recommend,
  ...mapPlay,
  ...exchange,
  ...myTeam,
];

export default createRouter({
  //   history: createWebHistory(),
  history: createWebHashHistory(),

  routes,
});
