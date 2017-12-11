import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";


import { appRouter } from "@router/app";

require("./top.menu.styl");
@Component({
    name: "topmenu",
    template: require("./top.menu.html")
})
export class TopMenu extends Vue {
    // init data
    public appRouter: Array<RouteConfig> = appRouter;
}