import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TableConfigType } from "@store/table.type";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { ListBaseClass } from "@views/base/base.class";
import { NOTICEEVENT } from "@store/notice.type";
import { mapGetters } from "vuex";
import { EventBus, CONSTANT } from "@utils/event";

require("./emails.notice.styl");

@Component({
    name: "emailsnotice",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./emails.notice.html"),
    computed: {
        ...mapGetters([
            "tableConfig",
            "emailTable",
        ])
    }
})


export class EmailsNotice extends ListBaseClass {
    // init computed
    public emailTable: EmailNoticeTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["邮件通知"];
    public ids: string[] = [];
    public filterData: SearchType = {
        key_word: "",
        send_date: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")],
        send_type: "",
        status: "",
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    public emailnoticetableData: EmailNoticeColumnType[] = new Array<EmailNoticeColumnType>();

    // watch
    // lifecircle hook 
    created() {
        this.$store.dispatch(NOTICEEVENT.GETEMAILLIST, this.mergeData(this.tableConfig["emailtable"], this.filter));
        let that = this;

        let ListId = EventBus.register(CONSTANT.GETEMAILLIST, function (event: string, info: any) {
            console.log(that.emailTable);
            that.emailnoticetableData = (<any>Object).assign([], that.emailTable[that.tableConfig["noticetable"].page - 1]);
            
        });
    }

    destroyed() {
        // Aux.getIds().map((id, $idnex) => {
        //     EventBus.unRegister(id);
        // });
        // this.unwatch();
    }

    // init method
    search() {
        this.$store.dispatch(NOTICEEVENT.GETEMAILLIST, this.mergeData(this.tableConfig["emailtable"], this.filter));
    }

    // 填写
    write() {
        this.$router.push(`/SystemManagement/ReportManagement/emaillnotice/add`);
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.$store.dispatch(NOTICEEVENT.GETEMAILLIST, this.mergeData(this.tableConfig["emailtable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.emailtable.page_size = val;
        this.$store.dispatch(NOTICEEVENT.GETEMAILLIST, this.mergeData(this.tableConfig["emailtable"], this.filter));

    }
    handleCurrentChange(val: number) {
        this.tableConfig.emailtable.page = val;
        this.$store.dispatch(NOTICEEVENT.GETEMAILLIST, this.mergeData(this.tableConfig["emailtable"], this.filter));

    }

    handleSelectionChange(options: any) {
        this.ids = [];
        options.map((item: EmailNoticeColumnType, $index: number) => {
            this.ids.push(item.id);
        });
    }

    // 跳转方法同统一
    handle() {

    }

    sortChange(opt: any) {

    }


}
export interface SearchType {
    key_word: string;
    send_date: Array<string>;
    send_type: string;
    status: string;
}

export interface EmailNoticeColumnType {
    id: string;
    object: string;
    receiver: string;
    send_date: string;
    send_type: string;
    sender: string;
    status: string;
}

export interface EmailNoticeTableType {
    [extra: string]: EmailNoticeColumnType[];
}