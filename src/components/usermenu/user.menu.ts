import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";


import { userCenterRouter } from "@router/user.center";


require("./user.menu.styl");
@Component({
    name: "usermenu",
    template: require("./user.menu.html")
})
export class UserMenu extends Vue {
    public Routers: Array<RouteConfig> = userCenterRouter;
    constructor() {
        super();
    }
}