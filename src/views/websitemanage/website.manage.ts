import { ResType } from "server";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { TableConfigType } from "@store/table.type";
import { MYWEBSITEEVENT, MyWebsiteType, WebsiteTableType } from "@store/mywebsite.type";
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
        if (this.filter.ctime === null ) {
            this.filter.ctime = "";
        }
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }

    handleSizeChange(val: number) {
        this.tableConfig.mywebsitetable.page_size = val;
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.mywebsitetable.page = val;
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
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



    handleSelectionChange(options: any[]) {
        this.ids = [];
        options.map((item: WebsiteListColumnType, $index: number) => {
            this.ids.push(item.id);
        });
    }

    sortChange(opt: any) {

    }


    // 导出
    exportChoose(type: string) {
        let dom = document.createElement("a");
        const { domain, name, open_waf, organization, port, protocol, source_info, state } = this.filter;
        let exportLink: string = `/api/v20/websites/export/?ids=[${this.ids}]${this.serialize}domain=${domain}${this.serialize}name=${name}${this.serialize}open_waf=${open_waf}${this.serialize}organization=${organization}${this.serialize}port=${port}${this.serialize}protocol=${protocol}${this.serialize}source_info=${source_info}${this.serialize}state=${state}${this.serialize}`;
        console.log(exportLink);
        dom.href = `${exportLink}`;
        dom.target = "_blank";
        if (this.ids.length === 0) {
            this.$message({
            message: "请选择导出项",
            type: "warning"
            });
        } else {
            dom.click();
        }
    }
    exportAll() {
        let dom = document.createElement("a");
        const { domain, name, open_waf, organization, port, protocol, source_info, state } = this.filter;
        let exportLink: string = `/api/v20/websites/export/?domain=${domain}${this.serialize}name=${name}${this.serialize}open_waf=${open_waf}${this.serialize}organization=${organization}${this.serialize}port=${port}${this.serialize}protocol=${protocol}${this.serialize}source_info=${source_info}${this.serialize}state=${state}${this.serialize}`;
        dom.href = `${exportLink}`;
        dom.target = "_blank";
        dom.click();
    }

    // 开启防御/批量回源
    openwaf(type: string) {
        let open_waf: number;
        let open_text: string;
        if (type === "openWaf") {
            open_waf = 1;
            open_text = "防御";
        } else {
            open_waf = 0;
            open_text = "回源";
        }
        if (this.ids.length === 0) {
            this.$message({
                message: "请选择" + open_text + "项",
                type: "warning"
            });
        } else {
            console.log(this.ids);
            let params = {
                open_waf: open_waf,
                website_ids: this.ids,
            };
            MywebsiteServer.batchWebsite(params).then( (response: AxiosResponse<ResType>) => {
                let data = response.data;
                if ( data.status === "suc" ) {
                    this.$message({
                        message: "开启" + open_text + "成功",
                        type: "success"
                    });
                }
            });
        }

    }

}