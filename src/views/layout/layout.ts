import Component from "vue-class-component";
import Vue from "vue";


import { HeaderComponent } from "@components/layout/header/header";
import { FooterComponent } from "@components/layout/footer/footer";
import { SiderComponent } from "@components/layout/sider/sider";

require("./layout.styl");
@Component({
    name: "layout",
    components: {
        HeaderComponent, FooterComponent, SiderComponent
    },
    template: require("./layout.html"),
})
export class Layout extends Vue {
}