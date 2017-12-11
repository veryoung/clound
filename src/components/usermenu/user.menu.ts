import Component from "vue-class-component";
import Vue from "vue";


require("./user.menu.styl");
@Component({
    name: "usermenu",
    template: require("./user.menu.html")
})
export class UserMenu extends Vue {

}