import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";


import { LeftMenu } from "@components/layout/sider/_menu/_menu";
import { systemRouter } from "@router/system";
import { fail } from "assert";


require("./sider.styl");
@Component({
    name: "sider",
    template: require("./sider.html"),
    components: {
        LeftMenu
    }
})
export class SiderComponent extends Vue {
    // init data
    public width: number = 200;
    public menuProps: Array<RouteConfig> = systemRouter;

    // init method

    changeWidth(width: number) {
        this.width = width;
    }
}