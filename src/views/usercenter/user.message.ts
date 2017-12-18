import Component from "vue-class-component";
import Vue from "vue";


import { ModuleTitle } from "@components/title/module.title";

require("./user.message.styl");
@Component({
    name: "usermessage",
    template: require("./user.message.html"),
    components: {
        ModuleTitle
    }
})
export class UserMessage extends Vue {
    // init data
    basicTitle: string[] = ["基本信息"];
    serverTitle: string[] = ["服务信息"];
}