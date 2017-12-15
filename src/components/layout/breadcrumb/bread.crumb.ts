import Component from "vue-class-component";
import Vue from "vue";

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
    BreadList: any = [];
    // created
    created() {
        this.getBreadcrumb();
    }
    // method
    getBreadcrumb() {
        console.log(this.$route);
        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        if (first && (first.name !== "首页" || first.path !== "")) {
            matched = matched;
        }
        this.Listlen = first.name === matched[1].name ? false : true;
        let length = matched.length - 1;
        this.BreadList = matched.splice(1);
    }
}