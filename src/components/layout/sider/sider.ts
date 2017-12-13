import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";


import { LeftMenu } from "@components/layout/sider/_menu/_menu";


require("./sider.styl");
@Component({
    name: "sider",
    template: require("./sider.html"),
    components: {
        LeftMenu
    },
    props: {
        menus: {
            type: Array
        }
    }
})
export class SiderComponent extends Vue {
    // init props
    public menus: Array<RouteConfig>;

    // init data
    public width: number = 200;

    // init method

    changeWidth(width: number) {
        this.width = width;
    }
}