import { RouteConfig } from "vue-router/types/router";
import { Permissions } from "@directives/permissions";

export class DynamicRoute {
    private targetRoute: RouteConfig[] = [];
    constructor(sourceRoute: RouteConfig[]) {
        this.handlePermission(sourceRoute);
    }

    private handlePermission(sourceRoute: RouteConfig[]) {
        sourceRoute.map((item: RouteConfig, $index: number) => {
            if (Permissions.judge(item.meta.permission)) {
                this.targetRoute.push(item);
            }
        });
    }

    public getRoute() {
        return this.targetRoute;
    }
}