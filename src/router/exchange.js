const exchange = [
  {
    path: "/exchange",
    name: "exchange",
    component: () => import("@/views/exchange/exchange"),
    meta: {
      showBar: false,
    },
  },
];

export default exchange;
