import Component from "vue-class-component";
import Vue from "vue";

require("./router.component.styl");

@Component({
    name: "RouterComponent",
    template: require("./router.component.html")
})
export class RouterComponent extends Vue {

}