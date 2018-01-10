import { TableConfigType } from "@store/table.type";
import { MYWEBSITEEVENT, MyWebsiteType, } from "@store/mywebsite.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";
import SearchType, { filterData, WebsiteListColumnType, WebSiteListType, WebsiteManagerController } from "./website.manage.attachement";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";



const Aux = new Auxiliary<string>();
require("./website.manage.styl");
@Component({
    name: "websitemanagement",
    template: require("./website.manage.html"),
    components: {
        ModuleTitle, TissueTree, SetCol, CloudTable
    },
    computed: {
        ...mapGetters([
            "tableData",
            "tableConfig",
        ])
    }
})
export class WebsiteManagement extends Vue {
    // init computed
    public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;


    // init data
    public titles: string[] = ["我的网站"];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();

    // 导出
    public ids: string[] = [];
    public serialize: string = "&";
    public exportLink: string = `/portal/api/v20/websites/export_all/?ids=[${this.ids}]${this.serialize}`;


    // public tableDefault: = 
    // lifecircle hook 
    created() {
        // console.log(this.tableConfig.mywebsitetable);
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.websitetableData = (<any>Object).assign([], that.tableData[that.tableConfig["mywebsitetable"].page - 1]);
        });
        Aux.insertId(ListId);
    }

    destroyed() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }

    // init method
    search() {
        console.log("----搜索--------");
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }

    reset() {

    }

    mergeData(opt: any) {
        const { page_size, page } = opt;
        return (<any>Object).assign({}, this.filter, {
            page: page,
            page_size: page_size,
        });
    }

    // 跳转方法同统一
    handle(type: "look" | "add" | "editor" | "settings" | "del", rowObj?: any) {
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.push(`/WebsiteManagement/myWebsite/editor/${row.id}`);
            } else if (type === "settings") {
                this.$router.push(`/WebsiteManagement/myWebsite/settings/${row.id}`);
            } else if (type === "look") {
                this.$router.push(`/WebsiteManagement/myWebsite/look/${row.id}`);
            } else if (type === "del") {
                WebsiteManagerController.handleDel(row);
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


    // 导出
    exportChoose(type: string) {
        let dom = document.createElement("a");
        dom.href = `${this.exportLink}`;
        console.log(this.filter);
        console.log(dom.href);
        dom.target = "_blank";
        if (type === "all") {
            dom.click();
        } else {
            if (this.ids.length === 0) {
                this.$message({
                    message: "请选择导出项",
                    type: "warning"
                });
            } else {
                dom.click();
            }
        }
    }
    exportAll() {
        let dom = document.createElement("a");
        const { domain, name, open_waf, organization, port, protocol, source_info, state } = this.filter;
        let exportLink: string = `/portal/api/v20/websites/export_all/?domain=${domain}${this.serialize}name=${name}${this.serialize}open_waf=${open_waf}${this.serialize}organization=${organization}${this.serialize}port=${port}${this.serialize}protocol=${protocol}${this.serialize}source_info=${source_info}${this.serialize}state=${state}${this.serialize}`;
        dom.href = `${exportLink}`;
        dom.target = "_blank";
        dom.click();
    }
}