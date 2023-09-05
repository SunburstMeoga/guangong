const personal = [
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/views/personal/personal"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/assets/:tokenId",
    name: "assets",
    component: () => import("@/views/personal/details"),
    meta: {
      showBar: false,
    },
  },
  {
    path: "/pending-order/:tokenId",
    name: "pending-order",
    component: () => import("@/views/personal/details"),
    meta: {
      showBar: false,
    },
  },
  {
    path: "/campaign/:tokenId",
    name: "campaign",
    component: () => import("@/views/personal/details"),
    meta: {
      showBar: false,
    },
  },
  {
    path: "/earnings/:type",
    name: "earnings",
    component: () => import("@/views/personal/earnings"),
    meta: {
      showBar: false,
    },
  },
];

export default personal;
