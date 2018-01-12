import Component from "vue-class-component";
import Vue from "vue";



import { TopMenu } from "@components/topmenu/top.menu";
import { UserMenu } from "@components/usermenu/user.menu";
require("./header.styl");
@Component({
    name: "headercomponent",
    template: require("./header.html"),
    components: {
        TopMenu, UserMenu
    }
})
export class HeaderComponent extends Vue {

}