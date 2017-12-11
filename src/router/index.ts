import Vue from "vue";
import Router from "vue-router";

import { Plugins } from "../views/plugins/plugins";


Vue.use(Router);

export default new Router({
  routes: [
{
      path: "/plugins",
      name: "plugins",
      component: Plugins
    }
  ]
});
