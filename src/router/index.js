import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Mobile from "../views/Mobile.vue";

Vue.use(VueRouter);
//解决vue-router 3.0以上 重复点击导航路由报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Mobile",
    name: "Mobile",
    component: Mobile
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
