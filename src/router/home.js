const home = [
  {
    path: "/",
    name: "home",
    component: () => require("@/views/home/home"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/market/:id",
    name: "market",
    component: () => require("@/views/home/details"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/good/:id",
    name: "good",
    component: () => require("@/views/home/details"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/nfts/mall",
    name: "mall/list",
    component: () => require("@/views/home/nfts"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/nfts/market",
    name: "market/list",
    component: () => require("@/views/home/nfts"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/checkout/:id",
    name: "checkout",
    component: () => require("@/views/home/checkout"),
    meta: {
      showBar: false,
    },
  },
];

export default home;
