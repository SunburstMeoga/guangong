const personal = [
  {
    path: "/personal",
    name: "personal",
    component: () => require("@/views/personal/personal"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/assets/:id",
    name: "assets",
    component: () => require("@/views/personal/details"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/earnings/:type",
    name: "earnings",
    component: () => require("@/views/personal/earnings"),
    meta: {
      showBar: false,
    },
  },
];

export default personal;
