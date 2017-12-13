import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";



import { FooterComponent } from "@components/layout/footer/footer";
import { SiderComponent } from "@components/layout/sider/sider";




require("./container.styl");
@Component({
    name: "viewcontainer",
    template: require("./container.html"),
    components: {
        FooterComponent, SiderComponent
    },
    props: {
        menus: {
            type: Array
        }
    }
})
export class ViewContainer extends Vue {
    // init props
    public menus: Array<RouteConfig>;

    // init data
    public menuProps: Array<RouteConfig> = this.menus;

}