const exchange = [
  {
    path: "/team",
    name: "team",
    component: () => import("@/views/myTeam/index"),
    meta: {
      showTopBar: false,
    },
  },
];

export default exchange;
