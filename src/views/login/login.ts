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



require("./login.styl");
const operation_logo = require("src/resource/images/logo.png");
const portal_logo = require("src/resource/images/logo1.png");
const protal_banner = require("src/resource/images/banner1.png");
const operation_banner = require("src/resource/images/banner2.png");
const form_frame = require("src/resource/images/login_line.png");
@Component({
    name: "login",
    template: require("./login.html"),
    components: {
        FooterComponent
    }
})
export class Login extends Vue {
    // init data
    // public : string = "src/resource/images/logo.png";
    // public portal_logo:string = "";
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
    get operation_logo() {
        return operation_logo;
    }
    get portal_logo() {
        return portal_logo;
    }
    get protal_banner() {
        return protal_banner;
    }
    get operation_banner() {
        return operation_banner;
    }
    get form_frame() {
        return form_frame;
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