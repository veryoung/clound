import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";




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
        this.$router.replace(pathObj);
    }

}