import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CheckIn from "@/views/CheckIn.vue";
import Report from "@/views/Report.vue";
import Locations from "@/views/Locations.vue";
import Login from "@/views/Login";
import store from "../store";
import Registration from "@/views/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: redirectHomeIfAuthenticated
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    beforeEnter: redirectHomeIfAuthenticated
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/checkin",
    name: "CheckIn",
    component: CheckIn
  },
  {
    path: "/report",
    name: "Report",
    component: Report
  },
  {
    path: "/locations",
    name: "Locations",
    component: Locations
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function redirectHomeIfAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next("/home");
    return;
  }
  next();
}

function redirectLoginIfGuest(to, from, next) {
  if (
    to.path == "/login" ||
    to.path == "/registration" ||
    store.getters.isAuthenticated
  ) {
    next();
    return;
  }
  next("/login");
}

router.beforeEach(redirectLoginIfGuest);

export default router;
