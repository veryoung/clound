import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";



require("./website.manage.styl");
@Component({
    name: "websitemanagement",
    template: require("./website.manage.html"),
    components: {
        ModuleTitle, TissueTree, SetCol,  
    },
})
export class WebsiteManagement extends Vue {
    // init computed


    // init data
    public titles: string[] = ["我的网站"];

    // public tableDefault: = 
    // lifecircle hook 
    created() {
        console.log("i am website ");
    }

    destroyed() {

    }

    // init method
  
}