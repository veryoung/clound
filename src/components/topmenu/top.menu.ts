import Component from "vue-class-component";
import { RouteConfig } from "vue-router";
import { mapGetters } from "vuex";
import { BaseLibrary } from "@views/base/base.class";

require("./top.menu.styl");
@Component({
    name: "topmenu",
    template: require("./top.menu.html"),
    computed: {
        ...mapGetters([
            "routerStore",
            "newRouter"
        ])
    }
})
export class TopMenu extends BaseLibrary {
    // init computed
    public routerStore: RouteConfig[];
    public newRouter: RouteConfig[];
    // init data
    public entryRouter: RouteConfig[] = [];
    // init lifecircle
    created() {
        let that = this;
        this.EventBus.register(this.CONSTANT.FILTERROUTER, () => {
            that.entryRouter = that.routerStore;
        });
    }
}