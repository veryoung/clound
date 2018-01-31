import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TableConfigType } from "@store/table.type";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { ListBaseClass } from "@views/base/base.class";

require("./message.notice.styl");

@Component({
    name: "messagenotice",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./message.notice.html"),
})


export class MessageNotice extends ListBaseClass {
    // init computed
    // public tableData: WebsiteTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["短信通知"];
    public filterData: SearchType = {
        key_word: "",
        send_date: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")],
        msg_type: "",
        status: "",
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);
    public MessageNoticetableData: MsgNoticeColumnType[] = new Array<MsgNoticeColumnType>();
    // watch
 
    // lifecircle hook 
    created() {

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


    // 填写
    write() {
        this.$router.push(`/SystemManagement/ReportManagement/messagenotice/add`);
    }
    
    del() {

    }

    sortChange(opt: any) {

    }


}
export interface SearchType {
    key_word: string;
    send_date: Array<string>;
    msg_type: string;
    status: string;
}

export interface MsgNoticeColumnType {
    id: string;
    content: string;
    msg_type: string;
    receiver: string;
    send_date: string;
    sender: string;
    status: string;
}

export interface MsgNoticeTableType {
    [extra: string]: MsgNoticeColumnType[];
}