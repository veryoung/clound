import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { mapGetters } from "vuex";


import { userCenterRouter } from "@router/user.center";
import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { UserCenterType, USER } from "@store/user.center.type";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";
import { UserStatus } from "@utils/monitor";
import { Auxiliary } from "@utils/auxiliary";



const Aux = new Auxiliary<string>();
require("./user.menu.styl");
@Component({
    name: "usermenu",
    template: require("./user.menu.html"),
    computed: {
        ...mapGetters([
            "personInfo"
        ])
    }
})
export class UserMenu extends Vue {
    // init data
    public Routers: Array<RouteConfig> = userCenterRouter;
    public user_name: string = "";
    // init computed
    public personInfo: UserCenterType;
    // lifecircle hook
    created() {
        let that = this;
        new UserStatus();
        if (this.personInfo.default) {
            this.user_name = this.personInfo.default.user_name;
        }
        EventBus.register(CONSTANT.DEFAULTUSER, function () {
            that.user_name = that.personInfo.default.user_name;
        });
    }
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