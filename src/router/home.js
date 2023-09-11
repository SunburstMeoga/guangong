const home = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/home"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/market/:tokenId",
    name: "market",
    component: () => import("@/views/home/details"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/good/:id",
    name: "good",
    component: () => import("@/views/home/details"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/nfts/mall",
    name: "mall/list",
    component: () => import("@/views/home/nfts"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/nfts/market",
    name: "market/list",
    component: () => import("@/views/home/market"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/checkout/:id",
    name: "checkout",
    component: () => import("@/views/home/checkout"),
    meta: {
      showTopBar: false,
    },
  },
];

export default home;
