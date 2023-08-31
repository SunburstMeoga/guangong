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
    path: "/map/my-maps",
    name: "my-maps",
    component: () => import("@/views/map/my"),
    meta: {
      showBar: false,
    },
  },
  {
    path: "/map/my-details/:id",
    name: "my-details",
    component: () => import("@/views/map/myMapDetails"),
    meta: {
      showBar: false,
    },
  },
];

export default mapPlay;
