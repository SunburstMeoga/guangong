const exchange = [
  {
    path: "/exchange",
    name: "exchange",
    component: () => import("@/views/exchange/exchange"),
    meta: {
      showTopBar: false,
    },
  },
];

export default exchange;
