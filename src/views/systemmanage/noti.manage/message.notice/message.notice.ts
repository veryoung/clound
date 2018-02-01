import  ElementUI  from "element-ui";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { TableConfigType } from "@store/table.type";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import * as moment from "moment";
import { ListBaseClass } from "@views/base/base.class";
import { mapGetters } from "vuex";
import { NOTICEEVENT } from "@store/notice.type";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NoticeServer } from "@server/notice";
import { AxiosResponse } from "axios";
import { ResType } from "server";

require("./message.notice.styl");
const Aux = new Auxiliary<string>();

@Component({
    name: "messagenotice",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./message.notice.html"),
    computed: {
        ...mapGetters([
            "tableConfig",
            "msgTable",
        ])
    }
})


export class MessageNotice extends ListBaseClass {
    // init computed
    public msgTable: MsgNoticeTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["短信通知"];
    public ids: string[] = [];
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
        this.$store.dispatch(NOTICEEVENT.GETMSGLIST, this.mergeData(this.tableConfig["msgtable"], this.filter));
        let that = this;
        let ListId = EventBus.register(CONSTANT.GETMSGLIST, function (event: string, info: any) {
            that.MessageNoticetableData = (<any>Object).assign([], that.msgTable[that.tableConfig["msgtable"].page - 1]);

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
        this.$store.dispatch(NOTICEEVENT.GETMSGLIST, this.mergeData(this.tableConfig["msgtable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.$store.dispatch(NOTICEEVENT.GETMSGLIST, this.mergeData(this.tableConfig["msgtable"], this.filter));
    }

    handleSizeChange(val: number) {
        // this.tableConfig.mywebsitetable.page_size = val;
    }
    handleCurrentChange(val: number) {
        // this.tableConfig.mywebsitetable.page = val;
    }

    handleSelectionChange(options: any) {
        this.ids = [];
        options.map((item: MsgNoticeColumnType, $index: number) => {
            this.ids.push(item.id);
        });
    }


    // 填写
    write() {
        this.$router.push(`/SystemManagement/ReportManagement/messagenotice/add`);
    }
    
    del(rowObj?: any) {
        if (rowObj) {
            let delArray: any = [];
            delArray.push(rowObj.row.id);
            this.$confirm("删除后公告将无法恢复，您确定要删除吗？", "删除公告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                NoticeServer.delMessageRecord(delArray).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            ElementUI.Message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.$store.dispatch(NOTICEEVENT.GETMSGLIST, this.mergeData(this.tableConfig["msgtable"], this.filter));
                            break;
                        default:
                            break;
                    }
                });
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        } else {
            if (this.ids.length === 0) {
                this.$message({
                    message: "请选择需要删除项",
                    type: "warning"
                });
            } else {
                this.$confirm("删除后公告将无法恢复，您确定要删除吗？", "删除公告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    NoticeServer.delMessageRecord(this.ids).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                ElementUI.Message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.$store.dispatch(NOTICEEVENT.GETMSGLIST, this.mergeData(this.tableConfig["msgtable"], this.filter));
                                break;
                            default:
                                break;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            }
        }
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