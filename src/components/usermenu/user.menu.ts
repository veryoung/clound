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

    // init methods

    /**
     *                 <el-dropdown-item v-for="(router,$index) in Routers.children" :key="$index">
                    <router-link :to="router.path" tag="span">{{router.name}}</router-link>
                </el-dropdown-item>
     */
}