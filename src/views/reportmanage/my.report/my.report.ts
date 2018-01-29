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
import SearchType, { filterData, WebsiteListColumnType, WebSiteListType, WebsiteManagerController, DomainType } from "./my.report.attachement";
import { EventBus, CONSTANT, vm } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { session } from "@utils/sessionstorage";
import { ListBaseClass } from "@views/base/base.class";
import * as moment from "moment";


const Aux = new Auxiliary<string>();
require("./my.report.styl");
@Component({
    name: "myreport",
    template: require("./my.report.html"),
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
export class MyReport extends ListBaseClass {
    // init computed
    public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;
    public personInfo: UserCenterType;
    public defaultUser: DefaultUserType;



    // init data
    public titles: string[] = ["我的报告"];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();


    // 统计时间
    public conuntDay: any[] = new Array<string>();
    // 生成时间 
    public currentDay: any[] = new Array<string>();
    // 统计范围
    public options4: any = [];
    public value9: any =  [];
    public list: any =  [];
    public loading: boolean = false;
    public states: any = ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"];
    // 导出
    public ids: string[] = [];


    // lifecircle hook 
    created() {
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");
        this.filter.count_time = [startDay, endDay];
        this.filter.pro_time = [startDay, endDay];



        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.websitetableData = (<any>Object).assign([], that.tableData[that.tableConfig["mywebsitetable"].page - 1]);
        });
        Aux.insertId(ListId);
    }

    mounted() {
        this.list = this.states.map( (item: any ) => {
          return { value: item, label: item };
        });
    }

    destroyed() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }

    // init method

    // 统计范围查询请求
    remoteMethod(query: any) {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter((item: any ) => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
    }

    search() {
        console.log(this.filter);
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
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
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
                this.$router.push(`/ReportManagement/RreviewReport/${row.id}`);
            } else if (type === "del") {
                WebsiteManagerController.handleDel(row, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
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
            this.$message({
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
            this.$message({
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
                        this.$message({
                            message: "开启" + open_text + "成功",
                            type: "success"
                        });
                    }
                    this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.filter));
                });
            }).catch(() => {
                this.$message({
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