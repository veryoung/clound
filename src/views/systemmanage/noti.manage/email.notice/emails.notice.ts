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
            "tableData",
        ])
    }
})


export class EmailsNotice extends ListBaseClass {
    // init computed
    public tableData: EmailNoticeTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["邮件通知"];
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

        let ListId = EventBus.register(CONSTANT.GETLISTMESSAGE, function (event: string, info: any) {
            that.emailnoticetableData = (<any>Object).assign([], that.tableData[that.tableConfig["noticetable"].page - 1]);
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