import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";
import SearchType, { filterData , WebsiteListColumnType} from "./website.manage.attachement";



require("./website.manage.styl");
@Component({
    name: "websitemanagement",
    template: require("./website.manage.html"),
    components: {
        ModuleTitle, TissueTree, SetCol,  CloudTable
    },
})
export class WebsiteManagement extends Vue {
    // init computed


    // init data
    public titles: string[] = ["我的网站"];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public tableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();


    // public tableDefault: = 
    // lifecircle hook 
    created() { 
        console.log("i am website ");
    }

    destroyed() {

    }

    // init method
    search() {
    }

    reset() {
  
    }

    // 跳转方法同统一
    handle(type: "look" | "add" | "editor" | "settings" | "del", rowObj?: any) {
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.push(`/WebsiteManagement/myWebsite/editor/${row.uid}`);
            } else if (type === "settings") {
                this.$router.push(`/WebsiteManagement/myWebsite/settings/${row.uid}`);
            } else if (type === "look") {
                this.$router.push(`/WebsiteManagement/myWebsite/look/${row.uid}`);
            } else if (type === "del") {
            }
            return;
        }
        if (type === "add") {
            this.$router.push(`/WebsiteManagement/myWebsite/add`);
        }
    }

    handleSizeChange(val: number) {

    }
    handleCurrentChange(val: number) {

    }

    handleSelectionChange(options: any[]) {

    }
    
    sortChange(opt: any) {

    }
}