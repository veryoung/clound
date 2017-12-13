import Component from "vue-class-component";
import Vue from "vue";


import { HeaderComponent } from "@components/layout/header/header";

require("./layout.styl");
@Component({
    name: "layout",
    components: {
        HeaderComponent
    },
    template: require("./layout.html"),
})
export class Layout extends Vue {
}