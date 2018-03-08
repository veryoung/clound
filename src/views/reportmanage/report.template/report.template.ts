import Component from "vue-class-component";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TissueTree } from "@components/tissuetree/tree";
import { ModuleTitle } from "@components/title/module.title";
import { Auxiliary } from "@utils/auxiliary";
import { mapGetters } from "vuex";
import { ListBaseClass } from "@views/base/base.class";
import ReportTemplateSearchType, { filterData, ReportTemplateController, ReportTemplateColumnType } from "@views/reportmanage/report.template/report.template.attachement";
import * as moment from "moment";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { TableConfigType } from "@store/table.type";
import { EventBus, CONSTANT } from "@utils/event";
import { REPORTEVENT } from "@store/report.type";
import { ReportService } from "@server/report";
import { AxiosResponse } from "axios";
import { ResType } from "server";


const Aux = new Auxiliary<string>();
require("./report.template.styl");

@Component({
    name: "reporttemplate",
    template: require("./report.template.html"),
    components: {
        ModuleTitle, TissueTree, SetCol, CloudTable
    },
    computed: {
        ...mapGetters([
            "tableConfig",
            "reportTableData",
        ])
    }
})

export class ReportTemplate extends ListBaseClass {
    // props
    public tableConfig: TableConfigType;
    public reportTableData: any;

    // data
    public titles: string[] = ["报告模板"];

    public filter: ReportTemplateSearchType = (<any>Object).assign({}, filterData);
    public tableData: ReportTemplateColumnType[] = new Array<ReportTemplateColumnType>();

    // 创建时间
    public createTime: any[] = new Array<string>();
    // 统计范围
    public options4: any = [];
    public value9: any = [];
    public list: any = [];
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


    // method    
    created() {
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");
        this.filter.create_time = [startDay, endDay];
        this.$store.dispatch(REPORTEVENT.GETREPORTTEMPLATELIST, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETREPORTTEMPLATELIST, function (event: string, info: any) {
            that.tableData = that.reportTableData[that.tableConfig.reporttemplatetable.page - 1];
        });
        Aux.insertId(ListId);
    }

    mounted() {
        this.list = this.states.map((item: any) => {
            return { value: item, label: item };
        });
    }

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
        console.log(this.filter);
        this.$store.dispatch(REPORTEVENT.GETREPORTTEMPLATELIST, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");
        this.filter.create_time = [startDay, endDay];
        this.$store.dispatch(REPORTEVENT.GETREPORTTEMPLATELIST, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.mywebsitetable.page_size = val;
        this.$store.dispatch(REPORTEVENT.GETREPORTTEMPLATELIST, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.mywebsitetable.page = val;
        this.$store.dispatch(REPORTEVENT.GETREPORTTEMPLATELIST, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
    }

    sortChange(opt: any) {

    }


    // 跳转方法同统一
    handle(type: "run" | "add" | "editor" | "del", rowObj?: any) {
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.push(`/ReportManagement/ReportTemplate/editor/${row.id}`);
            } else if (type === "run") {
                ReportService.createReport({ report_tmp_id: `${row.id}` })
                    .then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "生成成功",
                                    type: "success"
                                });
                                break;
                            default:
                                break;
                        }
                    });
            } else if (type === "del") {
                ReportTemplateController.handleDel(row, this.mergeData(this.tableConfig["reporttemplatetable"], this.filter));
            }
            return;
        }
        if (type === "add") {
            this.$router.push(`/ReportManagement/ReportTemplate/add`);
        }
    }

}