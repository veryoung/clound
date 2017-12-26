import Component from "vue-class-component";
import Vue from "vue";
import ElementUI from "element-ui";


import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";



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

    // computed
    get style() {
        return style;
    }

    // init methods
    onSubmit() {
        GeneralServer.login(this.form).then((res: ResType & any) => {
            switch (res.status) {
                case "suc":
                    this.$router.push("/home");
                    break;
                default:
                    break;
            }
        });
    }
}