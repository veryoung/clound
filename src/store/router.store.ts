import { Module } from "vuex";
import { RouteConfig } from "vue-router/types/router";
import { asyncRouter, staticRouter } from "@router/entry";
import { ROUTEREVENT } from "@store/router.type";
import { DynamicRoute } from "@utils/dynamic.route";
import { EventBus, CONSTANT } from "@utils/event";
import { entryRouter } from "@router/index";





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
        },
    },
    actions: {
        [ROUTEREVENT.FILTERROUTER]: ({ state, commit, rootState }) => {
            let temp: RouteConfig[] = Object.assign([], asyncRouter);
            let newRouter: RouteConfig[] = Object.assign([], new DynamicRoute(temp).getRoute());
            EventBus.doNotify(CONSTANT.FILTERROUTER);
            commit(ROUTEREVENT.FILTERROUTER, {
                asyncRouter: Object.assign([], newRouter.concat(staticRouter)),
                newRouter: newRouter
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