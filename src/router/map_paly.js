const mapPlay = [
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map/index"),
    meta: {
      showTopBar: true,
    },
  },
  {
    path: "/map/my-maps",
    name: "my-maps",
    component: () => import("@/views/map/my"),
    meta: {
      showTopBar: false,
    },
  },
  {
    path: "/map/my-details/:id",
    name: "my-details",
    component: () => import("@/views/map/myMapDetails"),
    meta: {
      showTopBar: false,
    },
  },
];

export default mapPlay;
