import Component from "vue-class-component";
import Vue from "vue";


import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { Store } from "@store/store";
import { USER } from "@store/user.center.type";
import { session } from "@utils/sessionstorage";
import { Permissions } from "@directives/permissions";
import { UserStatus } from "@utils/monitor";


const style = require("../login/login.m.css");
@Component({
    name: "loginportal",
    template: require("./login.portal.html")
})
export class LoginPortal extends Vue {
    public form: any = {
        username: "",
        pwd: ""
    };

    // lifecircle hook
    created() {
        new UserStatus(this.$router.push, "/home");
    }
    // computed
    get style() {
        return style;
    }

    // init methods
    onSubmit() {
        GeneralServer.login(this.form).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    this.$router.push("/");
                    break;
                default:
                    break;
            }
        });
    }
}