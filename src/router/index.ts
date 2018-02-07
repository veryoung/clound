import Router from "vue-router";
import { RouteConfig, RawLocation, Route } from "vue-router/types/router";
import { Store } from "@store/store";
import { Permissions } from "@directives/permissions";
import Vue from "vue";
import { staticRouter } from "@router/entry";


export const entry: RouteConfig[] = staticRouter;


export const entryRouter = new Router({
    linkActiveClass: "active",
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: entry
});

entryRouter.beforeEach((
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
    if (Permissions.judge(to.meta.permission) || to.meta.permission === "*") {
        next();
    } else {
        next("/403");
    }
});



Vue.use(Router);