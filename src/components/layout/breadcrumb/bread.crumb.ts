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
    Listlen: boolean = true;
    BreadList: RouteRecord[];
    // created
    created() {
        this.getBreadcrumb();
    }
    // method
    getBreadcrumb() {
        console.log(this.$route);
        let matched: RouteRecord[] = this.$route.matched.filter(item => item.name);
        // const first: RouteRecord = matched[0];
        // if (first && (first.name !== "首页" || first.path !== "")) {
        //     matched = matched;
        // }
        // 判断显示不显示的条件 listenlen === false （显示）
        // this.Listlen = first.name === matched[1].name ? false : true;

        this.BreadList = matched.splice(1);
    }
}