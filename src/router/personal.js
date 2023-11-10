const personal = [
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/views/personal/personal"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/assets/:tokenId",
    name: "assets",
    component: () => import("@/views/personal/details"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/pending-order/:tokenId",
    name: "pending-order",
    component: () => import("@/views/personal/details"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/campaign/:tokenId",
    name: "campaign",
    component: () => import("@/views/personal/details"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/earnings/:type",
    name: "earnings",
    component: () => import("@/views/personal/earnings"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/campaign-earning/:cardIndex",
    name: "campaign-earning",
    component: () => import("@/views/personal//campaignEarning"),
    meta: {
      showTopBar: false,
    },
  },
];

export default personal;
