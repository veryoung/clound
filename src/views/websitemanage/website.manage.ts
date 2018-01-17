import { USER } from "@store/user.center.type";
import { UserCenterType } from "@store/user.center.type";
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
import SearchType, { filterData, WebsiteListColumnType, WebSiteListType, WebsiteManagerController, DomainType } from "./website.manage.attachement";
import { EventBus, CONSTANT, vm } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { session } from "@utils/sessionstorage";



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
            "personInfo"
        ])
    }
})
export class WebsiteManagement extends Vue {
    // init computed
    public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;
    public personInfo: UserCenterType;



    // init data
    public titles: string[] = ["我的网站"];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();
    public userMessage: DomainType = {
        used_domain_num: "",
        max_domain_num: "",
    };

    // 导出
    public ids: string[] = [];
    public serialize: string = "&";
    public exportLink: string = `/api/v20/websites/export/?ids=[${this.ids}]${this.serialize}`;


    // lifecircle hook 
    created() {
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.websitetableData = (<any>Object).assign([], that.tableData[that.tableConfig["mywebsitetable"].page - 1]);
        });

        this.$store.dispatch(USER.DEFAULTUSER, { uid: session.getItem("age") });
        let PersonInfoId = EventBus.register(CONSTANT.DEFAULTUSER, function (event: string, info: any) {
            that.userMessage.used_domain_num = that.personInfo.default.used_domain_num;
            that.userMessage.max_domain_num = that.personInfo.default.max_domain_num;
        });
        Aux.insertId(ListId);
        Aux.insertId(PersonInfoId);
    }

    destroyed() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }

    // init method
    search() {
        if (this.filter.ctime === null) {
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
                WebsiteManagerController.handleDel(row, this.mergeData(this.tableConfig["mywebsitetable"]));
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
        this.exportLink = `/api/v20/account/user/excel/?ids=[${this.ids}]${this.serialize}`;
    }

    sortChange(opt: any) {

    }


    // 导出
    exportChoose(type: string) {
        let dom = document.createElement("a");
        dom.href = `${this.exportLink}`;
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
        dom.href = `${this.exportLink}`;
        dom.target = "_blank";
        dom.click();
    }

    // 开启防御/批量回源
    openwaf(type: string) {
        let open_waf: string = "0";
        let open_text: string = "";
        if (type === "openWaf") {
            open_waf = "1";
            open_text = "防御";
        } else {
            open_waf = "0";
            open_text = "回源";
        }
        if (this.ids.length === 0) {
            this.$message({
                message: "请选择" + open_text + "项",
                type: "warning"
            });
        } else {
            let params = {
                open_waf: open_waf,
                website_ids: this.ids,
            };
            MywebsiteServer.batchWebsite(params).then((response: AxiosResponse<ResType>) => {
                let data = response.data;
                if (data.status === "suc") {
                    this.$message({
                        message: "开启" + open_text + "成功",
                        type: "success"
                    });
                }
            });
        }

    }

    // 当状态为未接入时的验证
    stateCheck(opt: any) {
        let params: StateCheckType = {
            sid: opt.id
        };
        MywebsiteServer.refreshState(params).then((response: AxiosResponse<ResType>) => {
            let data = response.data;
            if (data.status === "suc") {
                this.$message({
                    message: "验证成功",
                    type: "success"
                });
            }
        });
    }

}

export interface StateCheckType {
    sid: number;
}