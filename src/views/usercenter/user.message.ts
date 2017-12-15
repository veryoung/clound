import Component from "vue-class-component";
import Vue from "vue";



require("./user.message.styl");
@Component({
    name: "usermessage",
    template: require("./user.message.html")
})
export class UserMessage extends Vue {

}