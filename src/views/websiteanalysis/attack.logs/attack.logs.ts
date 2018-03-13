import { TableConfigType } from "@store/table.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { ModuleTitle } from "@components/title/module.title";
import { SetCol } from "@components/setcol/setcol";
import { WEBSITEANALYSISEVENT } from "@store/website.analysis.type";
import { ListBaseClass } from "@views/base/base.class";
import { MYWEBSITEEVENT, WebsiteTableType } from "@store/mywebsite.type";
import { WebsiteListColumnType } from "@views/websitemanage/website.manage.attachement";



require("./attack.logs.styl");
@Component({
    name: "attacklogs",
    template: require("./attack.logs.html"),
    components: {
        ModuleTitle, SetCol, CloudTable
    },

    computed: {
        ...mapGetters([
            "logAuditAttackLogtableData",
            "tableConfig",
            "tableData",

        ])
    }
})
export class AttackLogs extends ListBaseClass {
    // init computed
    public logAuditAttackLogtableData: AttackLogType;
    public tableConfig: TableConfigType;
    public tableData: WebsiteTableType;


    // init data
    public Aux = new this.Auxiliary<string>();
    public titles: string[] = ["攻击日志"];
    public filterData: SearchType = {
        attack_type: "",
        attacked_url: "",
        attact_ip: "",
        attact_ip_add: "",
        cdate: this.moment(new Date()).format("YYYYMMDD"),
        etime: this.moment(new Date()).format("HHmmss"),
        id: "",
        name: "",
        results: "",
        safe_level: "",
        stime: this.moment(new Date(new Date().getTime() - 1 * 60 * 60 * 1000)).format("HHmmss"),
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    // 网站域名
    public websitefilter: SearchType = (<any>Object).assign({}, websitefilterData);
    public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();
    public domainData: any = [];
    public domainDataArray: any = [];
    public domainObj: any = {};


    // 选择当前时间
    public currentDateDay: string = "";
    public currentDate: Array<string> = [];
    public attacktableData: AttackLogTableType[] = new Array<AttackLogTableType>();

    // 选中项
    public log_ids: any = [];


    public pickerOptions2: any = {
        shortcuts: [{
            text: "最近一周",
            onClick(picker: any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
            }
        }, {
            text: "最近一个月",
            onClick(picker: any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
            }
        }, {
            text: "最近三个月",
            onClick(picker: any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
            }
        }]
    };
    public value1: string = "";
    public value2: string = "";
    public options: Array<DomainType> = [
        {
            value: "",
            label: "全部"
        },
        {
            value: "跨站脚本攻击",
            label: "跨站脚本"
        }, {
            value: "注入攻击",
            label: "注入攻击"
        }, {
            value: "文件包含攻击",
            label: "文件包含"
        }, {
            value: "信息泄露攻击",
            label: "信息泄露"
        }, {
            value: "HTTP协议攻击",
            label: "HTTP协议"
        }, {
            value: "CC攻击",
            label: "CC攻击"
        }, {
            value: "恶意爬虫攻击",
            label: "恶意爬虫"
        }, {
            value: "恶意扫描攻击",
            label: "恶意扫描"
        }, {
            value: "应用漏洞攻击",
            label: "应用漏洞"
        }, {
            value: "Webshell攻击",
            label: "Webshell"
        }
    ];
    public value: string = "";

    // public tableDefault: = 
    // lifecircle hook 
    created() {
        // 初始化时间
        this.currentDate = [this.filter.stime, this.filter.etime];
        this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"], this.websitefilter));

        let that = this;

        let ListId = this.EventBus.register(this.CONSTANT.GETATTACKLOGDATA, function (event: string, info: any) {
            that.attacktableData = (<any>Object).assign([], that.logAuditAttackLogtableData[that.tableConfig["attacklogtable"].page - 1]);
            console.log(that.attacktableData);
        });

        let WebsiteId = this.EventBus.register(this.CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.websitetableData = (<any>Object).assign([], that.tableData[that.tableConfig["mywebsitetable"].page - 1]);
            that.domainDataArray = [];
            // 提取必须项 形成数组
            for (let key in that.websitetableData) {
                let Obj = {
                    name: "",
                    value: ""
                };
                Obj.name = that.websitetableData[key].domain;
                Obj.value = that.websitetableData[key].id;
                that.domainDataArray.push(Obj);
            }
            that.domainDataArray.unshift({ name: "全部", value: "" });
            that.filter.id = that.domainDataArray[0].value;
            that.$store.dispatch(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, that.mergeData(that.tableConfig["attacklogtable"], that.filter));

        });

        this.Aux.insertId(ListId);
        this.Aux.insertId(WebsiteId);
    }

    destroyed() {
        this.Aux.getIds().map((id, $idnex) => {
            this.EventBus.unRegister(id);
        });
    }

    // init method
    search() {
        this.filter.stime = this.currentDate[0];
        this.filter.etime = this.currentDate[1];
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, this.mergeData(this.tableConfig["attacklogtable"], this.filter));
    }

    handle(opt: any) {
        let id = opt.row.rule_id;
        let data = opt.row;
        // AttackLog/look/:datetime/:rule_id/:site_id/:src_ip/:uri
        this.$router.push(`/WebsiteAnalysis/AttackLog/look/${data.dt}/${data.rule_id}/${data.site_id}/${data.src_ip}?uri=${data.uri}`);
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.filter.id = this.domainDataArray[0].value;
        this.currentDate = [this.filter.stime, this.filter.etime];
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, this.mergeData(this.tableConfig["attacklogtable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.noticetable.page_size = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, this.mergeData(this.tableConfig["attacklogtable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.noticetable.page = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, this.mergeData(this.tableConfig["attacklogtable"], this.filter));
    }

    handleSelectionChange(options: any[]) {
        this.log_ids = [];
        options.map((item: any, $index: number) => {
            this.log_ids.push(item.log_id);
        });
    }


    sortChange(opt: any) {

    }

    // 导出
    exportChoose(type: string) {
        let data: SearchType = this.filter;
        if (this.log_ids.length === 0) {
            this.$notify({
                title: "提示",
                message: "请选择导出项",
                type: "warning"
            });
        } else {
            let str = "";
            for (let key in this.log_ids) {
                str += "," + this.log_ids[key];
            }
            str = str.substr(1);
            console.log(`/api/v20/dashboard/export_attack/?log_ids=${str}${this.objToUrl(this.filter)}`);
            this.exportFile(`/api/v20/dashboard/export_attack/?log_ids=${str}${this.objToUrl(this.filter)}`);
        }
    }
    exportAll() {
        let data = this.filter;
        this.exportFile(`/api/v20/dashboard/export_attack/?${this.objToUrl(this.filter)}`);
    }
}

export interface DomainType {
    value: string;
    label: string;
}
export interface SearchType {
    attack_type: string;
    attacked_url: string;
    attact_ip: string;
    attact_ip_add: string;
    cdate: string;
    etime: string;
    id: string;
    name: string;
    results: string;
    safe_level: string;
    stime: string;
}
export interface AttackLogTableType {
    aim_IP: string;
    aim_port: string;
    attcked_url: string;
    client: string;
    id: string;
    mate: string;
    referer: string;
    req_ID: string;
    req_body: string;
    req_header: string;
    req_length: string;
    res_code: string;
    res_header: string;
    resbody: string;
    results: string;
    source_IP: string;
    source_port: string;
    threat_level: string;
    time: string;
    trig_rule: string;
    website_add: string;
}

export interface AttackLogType {
    [extra: string]: AttackLogTableType[];
}


export const websitefilterData: WebsiteSearchType = {
    all: "1",
    cperson: "",
    domain: "",
    name: "",
    open_waf: "",
    organization: "",
    port: "",
    protocol: "",
    source_info: "",
    source_type: "",
    state: "",
    ctime: "",
    sort_ctime: "",
};

export default interface WebsiteSearchType {
    cperson: string;
    domain?: string;
    name: string;
    open_waf: string;
    organization: string;
    port: number | string;
    protocol: string;
    source_info?: string;
    source_type?: string;
    state?: string;
    ctime?: string;
    sort_ctime?: string;
    all: string;
}