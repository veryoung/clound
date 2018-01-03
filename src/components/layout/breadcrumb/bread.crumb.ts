import Component from "vue-class-component";
import Vue from "vue";
import { RouteRecord } from "vue-router";

require("./bread.crumb.styl");
@Component({
    name: "breadcrumb",
    template: require("./bread.crumb.html"),
    watch: {
        "$route": "getBreadcrumb" // 监听事件
    }
})
export class BreadCrumbComponent extends Vue {
    // initial data
    BreadList: RouteRecord[] = new Array<RouteRecord>();
    // lifecircle hook
    created() {
        this.getBreadcrumb();
    }
    // method
    getBreadcrumb() {
        let matched: RouteRecord[] = this.$route.matched.filter(item => item.name);
        this.BreadList = matched;
    }
}