import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { mapGetters } from "vuex";


import { userCenterRouter } from "@router/user.center";
import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { UserCenterType, USER } from "@store/user.center.type";
import { AxiosResponse } from "axios";


require("./user.menu.styl");
@Component({
    name: "usermenu",
    template: require("./user.menu.html"),
})
export class UserMenu extends Vue {
    public Routers: Array<RouteConfig> = userCenterRouter;
    // init computed
    public personInfo: UserCenterType;
    // lifecircle hook

    logout() {
        GeneralServer.logout().then((response) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    this.$router.push("/login");
                    break;
                default:
                    break;
            }
        });
    }
}