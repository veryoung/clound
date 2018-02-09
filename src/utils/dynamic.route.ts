import { RouteConfig } from "vue-router/types/router";
import { Permissions } from "@directives/permissions";
import { session } from "@utils/sessionstorage";
const _ = require("lodash");

export class DynamicRoute {
    private targetRoute: RouteConfig[] = [];
    constructor(sourceRoute: RouteConfig[]) {
        this.handlePermission(sourceRoute);
        this.targetRoute = sourceRoute;
    }

    private handlePermission(sourceRoute: RouteConfig[]) {
        for (let i = 0; i < sourceRoute.length; i++) {
            let item: RouteConfig = sourceRoute[i];
            try {
                if (item.meta.permission && item.meta.permission !== "*" && !Permissions.judge(item.meta.permission)) {
                    sourceRoute.splice(i, 1);
                    i -= 1;
                    continue;
                }
                if (item.children) {
                    let temp: RouteConfig[] = new DynamicRoute(item.children).getRoute();
                    if (item.props && (<any>item.props).sider && (<any>item.props).sider.menus) {
                        (<any>item.props).sider.menus = temp;
                    }
                    if (item.redirect) {
                        item.redirect = `${item.path}/${temp[0].path}`;
                    }
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    public getRoute() {
        return this.targetRoute;
    }
}