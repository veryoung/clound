import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { Route } from "vue-router/types/router";
import { vm } from "@utils/event";




require("./_menu.styl");
@Component({
    name: "leftmenu",
    template: require("./_menu.html"),
    props: {
        menus: {
            type: Array
        }
    }
})
export class LeftMenu extends Vue {
    // init props
    public menus: Array<RouteConfig>;


    // init data
    public IsCollapse: boolean = false;
    public width: number = 200;
    public flex: string = "0deg";
    public defaultIndex: string | undefined = this.menus[0].name;
    public unwatch: any = "";

    created() {
        // this.defaultIndex = this.menus[0].name;
        let that = this;
        this.unwatch = vm.$watch(() => {
            return this.defaultIndex;
        }, (to, from) => {
            console.warn("watch", to, from);
        }, {
                deep: true
            });
        this.unwatch = vm.$watch(() => {
            return this.$route;
        }, (to, from) => {
            that.defaultIndex = to.name;
        }, {
                deep: true
            });
    }

    updated() {
        // this.defaultIndex = this.$route.name;
        // console.log(this.$route.name);
    }

    destroyed() {
        console.log("destroyed");
        this.unwatch();
    }

    // init method
    toggleMenu() {
        this.width = this.width === 200 ? 65 : 200;
        this.$emit("changeWidth", this.width);
        this.flex = this.flex === "0deg" ? "180deg" : "0deg";
        this.IsCollapse = this.IsCollapse ? false : true;
    }

    handleOpen(key: any, keyPath: any) {
        console.log(key, keyPath);
    }

    handleClose(key: any, keyPath: any) {
        console.log(key, keyPath);
    }

    go(pathObj: any) {
        this.$router.push(pathObj);
    }

}