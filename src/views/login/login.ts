import Component from "vue-class-component";



import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { USER } from "@store/user.center.type";
import { UserStatus } from "@utils/monitor";
import { FooterComponent } from "@components/layout/footer/footer";
import { BaseLibrary } from "@views/base/base.class";
import { User } from "@server/user";
import { Permissions } from "@directives/permissions";
import { ROUTEREVENT } from "@store/router.type";



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
export class Login extends BaseLibrary {
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
        new UserStatus(() => {
            this.$router.go(-1);
        });
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
    // go() {
    //     for (let item of entry) {
    //         if (Permissions.judge(item.meta.permission)) {
    //             this.$router.push(item.path);
    //             break;
    //         }
    //     }
    // }
    onSubmit() {
        GeneralServer.login(this.form).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    new UserStatus(() => {
                        this.$router.push("/");
                    });
                    break;
                case "error":
                    this.changeCode();
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
            this.form.captcha_id = res.data.captcha_id;
        });
    }
}