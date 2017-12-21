import Component from "vue-class-component";
import Vue from "vue";


const style = require("./login.m.css");
@Component({
    name: "login",
    template: require("./login.html")
})
export class Login extends Vue {
    public formInline: any = {
        user: "",
        region: ""
    };

    // computed
    get style() {
        return style;
    }

    // init methods
    onSubmit() {
        console.log("submit!");
    }
}