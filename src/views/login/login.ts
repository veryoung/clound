import Component from "vue-class-component";
import Vue from "vue";
import ElementUI from "element-ui";


import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { UserStatus } from "@utils/monitor";
import { Store } from "@store/store";
import { USER } from "@store/user.center.type";



const style = require("./login.m.css");
@Component({
    name: "login",
    template: require("./login.html")
})
export class Login extends Vue {
    public form: any = {
        username: "",
        pwd: ""
    };

    // lifecircle hook
    created() {
        GeneralServer.oneself().then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    this.$router.push("/home");
                    break;
                case "red":
                    return;
                default:
                    break;
            }
        });
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