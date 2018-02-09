import { Module } from "vuex";
import { RouteConfig } from "vue-router/types/router";
import { asyncRouter, staticRouter } from "@router/entry";
import { ROUTEREVENT } from "@store/router.type";
import { DynamicRoute } from "@utils/dynamic.route";
import { EventBus, CONSTANT } from "@utils/event";
import { entryRouter } from "@router/index";
const _ = require("lodash");





export const RouterStore: Module<{ asyncRouter: RouteConfig[], newRouter: RouteConfig[] }, any> = {
    state: (): { asyncRouter: RouteConfig[], newRouter: RouteConfig[] } => {
        return {
            asyncRouter: staticRouter,
            newRouter: []
        };
    },

    mutations: {
        [ROUTEREVENT.FILTERROUTER]: (state: { asyncRouter: RouteConfig[], newRouter: RouteConfig[] }, payload) => {
            state.asyncRouter = payload.asyncRouter;
            state.newRouter = payload.newRouter;
            EventBus.doNotify(CONSTANT.FILTERROUTER);
            // , { route: payload.route }
        },
    },
    actions: {
        [ROUTEREVENT.FILTERROUTER]: ({ state, commit, rootState }, payload) => {
            if (state.newRouter.length > 0) {
                EventBus.doNotify(CONSTANT.FILTERROUTER);
                // , { type: "normal", route: payload }
                return false;
            }
            let asyncRouter2: RouteConfig[] = _.cloneDeep(asyncRouter);
            let newRouter: RouteConfig[] = new DynamicRoute(asyncRouter2).getRoute();
            let filterRouter: RouteConfig[] = newRouter.concat(staticRouter);
            entryRouter.addRoutes(newRouter);
            commit(ROUTEREVENT.FILTERROUTER, {
                asyncRouter: filterRouter,
                newRouter: newRouter,
                // type: payload.type
            });
        },
    },
    getters: {
        routerStore: function (state) {
            return state.asyncRouter;
        },
        newRouter: function (state) {
            return state.newRouter;
        }
    }
};