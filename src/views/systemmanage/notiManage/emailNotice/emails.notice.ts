import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TableConfigType } from "@store/table.type";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { ListBaseClass } from "@views/base/base.class";

require("./emails.notice.styl");

@Component({
    name: "emailsnotice",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./emails.notice.styl"),
})


export class EmailsNotice extends ListBaseClass {
    // init computed
    // public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["邮件通知"];
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
        results: "",
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    // 选择当前时间
    public currentDateDay: any[] = new Array<string>();

    // public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();
    // watch
    public unwatch: Function = () => { };
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
        let startDay = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD");
        let endDay = moment(new Date()).format("YYYYMMDD");

        this.currentDateDay = [startDay, endDay];
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
        console.log(this.currentDateDay);
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
