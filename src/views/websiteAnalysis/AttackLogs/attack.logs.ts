import { ResType } from "server";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { TableConfigType } from "@store/table.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import * as moment from "moment";



import { ModuleTitle } from "@components/title/module.title";
import { SetCol } from "@components/setcol/setcol";
import { EventBus, CONSTANT, vm } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";



const Aux = new Auxiliary<string>();
require("./attack.logs.styl");
@Component({
    name: "attacklogs",
    template: require("./attack.logs.html"),
    components: {
        ModuleTitle, SetCol, CloudTable
    },
    computed: {
        ...mapGetters([
            "tableData",
            "tableConfig",
        ])
    }
})
export class AttackLogs extends Vue {
    // init computed
    // public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["网站分析"];
    public filterData: SearchType = {
        start_time: "",
        end_time: "",
        name: "",
        domain: "",
        attackedUrl: "",
        attactIP: "",
        attactIPadd: "",
        attack_type: "",
        safe_level: "",
        results: "" ,
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    // 选择当前时间
    public currentDateDay: string = "";
    public currentDate: Array<string> = [];
    public websitetableData: any[] = new Array<string>();

    // public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();
    // watch
    public unwatch: Function = () => { };

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
    public options: Array<DomainType> = [{
        value: "选项1",
        label: "黄金糕"
    }, {
        value: "选项2",
        label: "双皮奶"
    }, {
        value: "选项3",
        label: "蚵仔煎"
    }, {
        value: "选项4",
        label: "龙须面"
    }, {
        value: "选项5",
        label: "北京烤鸭"
    }];
    public value: string = "";

    // public tableDefault: = 
    // lifecircle hook 
    created() {
        // 初始化时间
        let startDay = moment(new Date()).format("YYYYMMDD");
        let startdatetime = moment(new Date(new Date().getTime() - 1 * 60 * 60 * 1000)).format("HHmmss");
        let enddatetime = moment(new Date()).format("HHmmss");
        this.currentDateDay = startDay;
        this.currentDate = [startdatetime, enddatetime];
        // 
    }

    destroyed() {
        // Aux.getIds().map((id, $idnex) => {
        //     EventBus.unRegister(id);
        // });
        // this.unwatch();
    }

    // init method
    search() {
        // 拼接 开始时间和结束时间
        this.filter.start_time = this.currentDateDay + this.currentDate[0];
        this.filter.end_time = this.currentDateDay + this.currentDate[1];
        console.log(this.filter);
        // if (this.filter.ctime === null) {
        //     this.filter.ctime = "";
        // }
        // this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }

    reset() {
        // this.filter = (<any>Object).assign({}, filterData);
        // this.$store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, this.mergeData(this.tableConfig["mywebsitetable"]));
    }

    handleSizeChange(val: number) {
        // this.tableConfig.mywebsitetable.page_size = val;
    }
    handleCurrentChange(val: number) {
        // this.tableConfig.mywebsitetable.page = val;
    }

    handleSelectionChange(options: any) {
        // this.$emit("handleSelectionChange", options);
    }


    mergeData(opt: any) {
        const { page_size, page } = opt;
        // return (<any>Object).assign({}, this.filter, {
        //     page: page,
        //     page_size: page_size,
        // });
    }

    // 跳转方法同统一
    handle() {

    }

    sortChange(opt: any) {

    }


}

export interface DomainType {
    value: string;
    label: string;
}
export interface SearchType {
    end_time: string;
    start_time: string;
    name: string;
    domain: string;
    attackedUrl: string;
    attactIP: string;
    attactIPadd: string;
    attack_type: string;
    safe_level?: string;
    results?: string;
}
