import  ElementUI  from "element-ui";
import { USER, DefaultUserType } from "@store/user.center.type";
import { UserCenterType } from "@store/user.center.type";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { TableConfigType } from "@store/table.type";
import { MYWEBSITEEVENT, MyWebsiteType, WebsiteTableType } from "@store/mywebsite.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";
import SearchType, { filterData, WebsiteListColumnType, WebSiteListType, WebsiteManagerController, DomainType } from "./website.manage.attachement";
import { EventBus, CONSTANT, vm } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { ListBaseClass } from "@views/base/base.class";
import { open } from "fs";



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
            "personInfo",
            "defaultUser"
        ])
    }
})
export class WebsiteManagement extends ListBaseClass {
    // init computed
    public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;
    public personInfo: UserCenterType;
    public defaultUser: DefaultUserType;



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


    // lifecircle hook 
    created() {
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.websitetableData = (<any>Object).assign([], that.tableData[that.tableConfig["mywebsitetable"].page - 1]);
        });
 
        this.$store.dispatch(USER.DEFAULTUSER, { uid: this.defaultUser.uid });
        let PersonInfoId = EventBus.register(CONSTANT.DEFAULTUSER, function (event: string, info: any) {
            that.userMessage.used_domain_num = that.personInfo[that.defaultUser.uid].used_domain_num;
            that.userMessage.max_domain_num = that.personInfo[that.defaultUser.uid].max_domain_num;
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
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.mywebsitetable.page_size = val;
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.mywebsitetable.page = val;
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
    }

    sortChange(opt: any) {
        if (opt.prop === "ctime") {
            if (opt.order === "descending") {
                this.filter.sort_ctime = "-1";
            } else {
                this.filter.sort_ctime = "1";
            }
        }
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
    }

    // 跳转方法统一
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
                ElementUI.MessageBox.confirm("删除网站后，网站不再提供防御服务，将有攻击风险，是否继续删除？", "提示").then(() => {
                    MywebsiteServer.delWebsite(row.id).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                ElementUI.Notification({
                                    title: "提示",
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
                                break;
                            default:
                                break;
                        }
                    });
                }).catch(() => {
        
                });
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



    // 导出
    exportChoose(type: string) {
        let data: SearchType = this.filter;
        if (this.ids.length === 0) {
            this.$notify({
                title: "提示",
                message: "请选择导出项",
                type: "warning"
            });
        } else {
            this.exportFile(`/api/v20/websites/export/?ids=[${this.ids}]${this.objToUrl(this.filter)}`);
        }
    }
    exportAll() {
        let data = this.filter;
        this.exportFile(`/api/v20/websites/export/?ids=[]${this.objToUrl(this.filter)}`);
    }

    // 开启防御/批量回源
    openwaf(type: string) {
        let open_waf: string = "0";
        let open_text: string = "";
        let open_tips: string = "";
        let open_title: string = "";
        if (type === "openWaf") {
            open_waf = "1";
            open_text = "防御";
            open_tips = "将对网站开启防御功能，是否开启？";
            open_title = "开启防御";
        } else {
            open_waf = "0";
            open_text = "回源";
            open_tips = "网站将不再享受防御服务，是否回源？";
            open_title = "批量回源";
        }
        if (this.ids.length === 0) {
            this.$notify({
                title: "提示",
                message: "请选择" + open_text + "项",
                type: "warning"
            });
        } else {
            this.$confirm(open_tips, open_title, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    open_waf: open_waf,
                    website_ids: this.ids,
                };
                MywebsiteServer.batchWebsite(params).then((response: AxiosResponse<ResType>) => {
                    let data = response.data;
                    if (data.status === "suc") {
                        this.$notify({
                            title: "提示",
                            message: "开启" + open_text + "成功",
                            type: "success"
                        });
                    }
                    this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
                });
            }).catch(() => {
                this.$notify({
                    title: "提示",
                    type: "info",
                    message: "已取消" + open_title
                });
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
                this.$notify({
                    title: "提示",
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