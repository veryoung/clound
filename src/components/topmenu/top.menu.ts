import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { mapGetters } from "vuex";
import { UserStatus } from "@utils/monitor";
import { EventBus, CONSTANT } from "@utils/event";

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
export class TopMenu extends Vue {
    // init computed
    public routerStore: RouteConfig[];
    public newRouter: RouteConfig[];
    // init data
    public entryRouter: RouteConfig[] = [];
    // init lifecircle
    created() {
        let that = this;
        new UserStatus();
        EventBus.register(CONSTANT.FILTERROUTER, () => {
            that.entryRouter = that.routerStore;
            console.log(that.newRouter);
            that.$router.addRoutes(that.newRouter);
        });

    }
}