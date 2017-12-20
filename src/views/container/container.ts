import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";



import { FooterComponent } from "@components/layout/footer/footer";
import { BreadCrumbComponent } from "@components/layout/breadcrumb/bread.crumb";




require("./container.styl");
@Component({
    name: "viewcontainer",
    template: require("./container.html"),
    components: {
        FooterComponent, BreadCrumbComponent
    },
})
export class ViewContainer extends Vue {
    // init props
}