import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";



require("./wite.manage.styl");
@Component({
    name: "witemanagement",
    template: require("./wite.manage.html"),
    components: {
        ModuleTitle, TissueTree, SetCol,  
    },
})
export class WiteManagement extends Vue {
    // init computed


    // init data
    public titles: string[] = ["我的网站"];

    // public tableDefault: = 
    // lifecircle hook 
    created() {
        console.log("i am Wite ");
    }

    destroyed() {

    }

    // init method
  
}