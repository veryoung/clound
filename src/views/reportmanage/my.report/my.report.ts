import { USER, DefaultUserType } from "@store/user.center.type";
import { UserCenterType } from "@store/user.center.type";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { TableConfigType } from "@store/table.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { SetCol } from "@components/setcol/setcol";
import SearchType, { filterData, MyReportManagerController } from "./my.report.attachement";
import { EventBus } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { ListBaseClass } from "@views/base/base.class";
import * as moment from "moment";
import { REPORTEVENT } from "@store/report.type";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";


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
            "reportList",
            "tableConfig",
        ])
    }
})
export class MyReport extends ListBaseClass {
    // init computed
    public reportList: {
        count_cycle: string;
        count_obj: any;
        count_time: string[];
        name: string;
        pro_time: string[];
        id: string;
    }[];
    public tableConfig: TableConfigType;



    // init data
    public titles: string[] = ["我的报告"];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public reporttable: {
        count_cycle: string;
        count_obj: any;
        count_time: string[];
        name: string;
        pro_time: string[];
        rid: string;
    }[] = [];


    // 统计时间
    public conuntDay: any[] = new Array<string>();
    // 生成时间 
    public currentDay: any[] = new Array<string>();
    // 统计范围
    public options4: any = [];
    public value9: any = [];
    public list: any = [];
    public loading: boolean = false;
    // 导出
    public ids: string[] = [];


    // lifecircle hook 
    created() {
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");
        this.filter.count_time = [startDay, endDay];
        this.filter.pro_time = [startDay, endDay];



        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
        let that = this;
        let ListId = EventBus.register(this.CONSTANT.GETREPORTLIST, function (event: string, info: any) {
            that.reporttable = (<any>Object).assign([], that.reportList[that.tableConfig["myreporttable"].page - 1]);
        });
        Aux.insertId(ListId);
    }

    mounted() {
        // this.list = this.states.map((item: any) => {
        //     return { value: item, label: item };
        // });
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
                this.options4 = this.list.filter((item: any) => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
        } else {
            this.options4 = [];
        }
    }

    search() {
        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");
        this.filter.count_time = [startDay, endDay];
        this.filter.pro_time = [startDay, endDay];
        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.myreporttable.page_size = val;
        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.myreporttable.page = val;
        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
    }

    sortChange(opt: any) {
        this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter));
    }

    // 跳转方法同统一
    handle(type: "look" | "add" | "download" | "del", rowObj?: any) {
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "download") {
                this.exportFile(`/middleware/report/download/${row.id}/${row.name}`);
            } else if (type === "look") {
                this.$router.push(`/ReportManagement/RreviewReport/${row.id}/${row.name}`);
            } else if (type === "del") {
                MyReportManagerController.handleDel(row,  this.$store.dispatch(REPORTEVENT.GETREPORTLIST, this.mergeData(this.tableConfig["myreporttable"], this.filter)));
            }
            return;
        }
        if (type === "add") {
            this.$router.push(`/WebsiteManagement/myWebsite/add`);
        }
    }

    download() {

    }

    del() {

    }



    handleSelectionChange(options: any[]) {
        this.ids = [];
        options.map((item: {
            count_cycle: string;
            count_obj: any;
            count_time: string[];
            name: string;
            pro_time: string[];
            rid: string;
        }, $index: number) => {
            this.ids.push(item.rid);
        });
    }
    // 时间选择

    // dateChange(date: Array<string>) {
    //     this.filter.start_date = date[0];
    //     this.filter.end_date = date[1];
    // }


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
}

export interface StateCheckType {
    sid: number;
}