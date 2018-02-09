import Router from "vue-router";
import { RouteConfig, RawLocation, Route } from "vue-router/types/router";
import { Store } from "@store/store";
import { Permissions } from "@directives/permissions";
import Vue from "vue";
import { staticRouter } from "@router/entry";
import { EventBus, CONSTANT } from "@utils/event";
import { session } from "@utils/index";
import { ROUTEREVENT } from "@store/router.type";


export let entry: RouteConfig[] = staticRouter;


export const entryRouter = new Router({
    linkActiveClass: "active",
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: entry
});


entryRouter.beforeEach((
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
    if (session.getItem("pcode")) {
        // Store.dispatch(ROUTEREVENT.FILTERROUTER, to);
        next();
    } else {
        if (to.path === "/login") {
            next();
        } else {
            next("/login");
        }
    }
});


// EventBus.register(CONSTANT.FILTERROUTER, function (event: string, to: {
//     type: "f5" | "normal" | "/",
//     route: Route
// }) {
//     const { type, route } = to;
//     if (type === "/") {
//         entryRouter.push(route.path, Store.getters.newRouter[0]);
//         // Store.dispatch(ROUTEREVENT.FILTERROUTER, Store.getters.newRouter[0]);
//         return;
//     }
//     if (type === "f5") {
//         entryRouter.push(route.path);
//         return;
//     }
//     if (Permissions.judge(route.meta.permission) || route.meta.permission === "*") {
//         entryRouter.push(route.path);
//     } else {
//         entryRouter.push("/403");
//     }
// });
Vue.use(Router);