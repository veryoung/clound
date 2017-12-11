import Vue from "vue";
import Router from "vue-router";

import { Layout } from "@views/layout/layout";
import { appRouter } from "@router/app";


Vue.use(Router);

export const entryRouter = new Router({
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: appRouter
    }
  ]
});
