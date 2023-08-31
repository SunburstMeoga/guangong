const mapPlay = [
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map/index"),
    meta: {
      showBar: true,
    },
  },
  {
    path: "/map/my-marked",
    name: "my-marked",
    component: () => import("@/views/map/my"),
    meta: {
      showBar: false,
    },
  },
  {
    path: "/map/marked-details/:id",
    name: "marked-details",
    component: () => import("@/views/map/markedDetails"),
    meta: {
      showBar: false,
    },
  },
];

export default mapPlay;
