import { mapGetters } from "vuex";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TableConfigType } from "@store/table.type";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
require("./logs.audit.styl");
import * as moment from "moment";
import { ListBaseClass } from "@views/base/base.class";
import { EventBus, CONSTANT } from "@utils/event";
import { LogAuditType, LOGADUITEVENT, LogAuditsTableType, } from "@store/log.aduit.type";
import { Auxiliary } from "@utils/auxiliary";



const Aux = new Auxiliary<string>();

@Component({
    name: "logsaudit",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./logs.audit.html"),
    computed: {
        ...mapGetters([
            "tableConfig",
            "logAuditTableData",
        ]),

    }
})


export class LogsAudit extends ListBaseClass {
    // init computed
    public logAuditTableData: LogAuditsTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["日志审计"];
    public filterData: SearchType = {
        detail: "",
        send_date: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")];
        ip: "",
        op_result: "",
        op_type: "",
        user: "",
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    // 选择当前时间
    public logAuditTableColumnData: LogsAuditColumnType[] = new Array<LogsAuditColumnType>();

    // 下载
    public ids: string[] = [];
    // watch
    public unwatch: Function = () => { };
    public value1: string = "";
    public value2: string = "";

    // 操作类型项
    public op_typeOptions: Array<DomainType> = [
        {
            value: "",
            label: "全部"
        }, {
            value: "AUTH_MODULE",
            label: "认证管理"
        }, {
            value: "ANALYSIS_MODULE",
            label: "运营分析"
        }, {
            value: "ATTACK_LOG_MODULE",
            label: "攻击日志"
        }, {
            value: "WEB_MANAGE_MODULE",
            label: "网站管理"
        }, {
            value: "REPORT_MODULE",
            label: "统计报告"
        }, {
            value: "NODE_MAINTAIN_MODULE",
            label: "运维管理"
        }, {
            value: "USER_MANAGE_MODULE",
            label: "用户管理"
        }, {
            value: "ORG_MANAGE_MODULE",
            label: "组织机构管理"
        }, {
            value: "OP_LOG_MODULE",
            label: "日志审计"
        }, {
            value: "NOTIFICATION_MODULE",
            label: "通知管理"
        }];
    public value: string = "";

    // lifecircle hook 
    created() {
        // 获取列表
        this.$store.dispatch(LOGADUITEVENT.GETLOGAUDITLIST, this.mergeData(this.tableConfig["logautdittable"], this.filter));
        let that = this;
        let ListId = EventBus.register(LOGADUITEVENT.GETLOGAUDITLIST, function (event: string, info: any) {
            let data = [];
            console.log(that.logAuditTableData);
            data = (<any>Object).assign([], that.logAuditTableData[that.tableConfig["logautdittable"].page - 1]);
            that.logAuditTableColumnData = data[0].data;
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
        this.$store.dispatch(LOGADUITEVENT.GETLOGAUDITLIST, this.mergeData(this.tableConfig["logautdittable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.$store.dispatch(LOGADUITEVENT.GETLOGAUDITLIST, this.mergeData(this.tableConfig["logautdittable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.logautdittable.page_size = val;
        this.$store.dispatch(LOGADUITEVENT.GETLOGAUDITLIST, this.mergeData(this.tableConfig["logautdittable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.logautdittable.page = val;
        this.$store.dispatch(LOGADUITEVENT.GETLOGAUDITLIST, this.mergeData(this.tableConfig["logautdittable"], this.filter));
    }
    sortChange(opt: any) {

    }


    // 选中项目
    handleSelectionChange(options: any[]) {
        this.ids = [];
        options.map((item: LogsAuditColumnType, $index: number) => {
            this.ids.push(item.id);
        });
    }

    // 跳转方法同统一
    handle(type: "download", rowObj?: any) {
        console.log(this.ids);
        if (type === "download") {
            if (this.ids === []) {
                this.downLoadAll();
            } else {
                this.downLoadChoose();
            }
        }
    }



    // 下载
    downLoadChoose() {
        console.log(this.filter);
        this.exportFile(`/api/v20/bulletin/op_log/?ids=[${this.ids}]${this.objToUrl(this.filter)}`);
    }
    downLoadAll() {
        let data = this.filter;
        this.exportFile(`/api/v20/bulletin/op_log/?ids=[]${this.objToUrl(this.filter)}`);
    }

}

export interface DomainType {
    value: string;
    label: string;
}
export interface SearchType {
    detail: string;
    ip: string;
    op_result: string;
    op_type: string;
    user: string;
    send_date: Array<string>;
}

export interface LogsAuditColumnType {
    email: string;
    ip: string;
    op_detail: string;
    op_ret: string;
    op_time: string;
    op_type: string;
    user: string;
    id: string;
}