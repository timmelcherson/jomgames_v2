import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Rajnd from "../views/Rajnd.vue";
import Wordgame from "../views/Wordgame.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/rajnd",
    name: "Rajnd",
    component: Rajnd,
  },
  {
    path: "/wordgame",
    name: "Wordgame",
    component: Wordgame,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
