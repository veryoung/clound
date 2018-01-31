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
import { FooterComponent } from "@components/layout/footer/footer";



const style = require("./login.styl");
@Component({
    name: "login",
    template: require("./login.html"),
    components: {
        FooterComponent
    }
})
export class Login extends Vue {
    public form: {
        username: string;
        pwd: string;
        idcode: string;
        captcha_id: string;
    } = {
            username: "",
            pwd: "",
            idcode: "",
            captcha_id: ""
        };

    public ubase64: string = "";

    // lifecircle hook
    created() {
        new UserStatus(this.$router.push, "/home");
        this.changeCode();
    }
    // computed
    get style() {
        return style;
    }
    get env() {
        return process.env.PLATFORM;
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

    changeCode() {
        GeneralServer.code().then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            this.ubase64 = `data:image/png;base64,${res.data.ubase64}`;
            this.form.idcode = res.data.idcode;
        });
    }
}