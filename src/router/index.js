import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "play",
      component: () => import("../views/PlayView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/user/:id",
      name: "user",
      component: () => import("../views/UserProfile.vue"),
    },
  ],
});

export default router;
