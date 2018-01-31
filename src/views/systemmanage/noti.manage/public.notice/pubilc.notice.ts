import ElementUI from "element-ui";
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
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { NoticeServer } from "@server/notice";
import { Auxiliary } from "@utils/auxiliary";


require("./pubilc.notice.styl");
const Aux = new Auxiliary<string>();

@Component({
    name: "publicnotice",
    components: {
        ModuleTitle,
        SetCol,
        CloudTable
    },
    template: require("./pubilc.notice.html"),
    computed: {
        ...mapGetters([
            "tableConfig",
            "noticeTable"
        ])
    }
})


export class PublicNotice extends ListBaseClass {
    // init computed
    public noticeTable: PubilcTableType;
    public tableConfig: TableConfigType;

    // init data
    public titles: string[] = ["站内公告"];
    public ids: string[] = [];
    public filterData: SearchType = {
        key_word: "",
        new: true,
        page: "1",
        page_size: "10",
        send_time: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")],
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);

    public PublicNoticeData: PublicNoticeColumnType[] = new Array<PublicNoticeColumnType>();
    // watch

    // lifecircle hook 
    created() {
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
        let that = this;

        let ListId = EventBus.register(NOTICEEVENT.GETNOTICELIST, function (event: string, info: any) {
            that.PublicNoticeData = (<any>Object).assign([], that.noticeTable[that.tableConfig["noticetable"].page - 1]);
        });
        // 
    }

    destroyed() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }

    // init method
    search() {
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
    }

    reset() {
        this.filter = (<any>Object).assign({}, this.filterData);
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
    }

    handleSizeChange(val: number) {
        this.tableConfig.noticetable.page_size = val;
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.noticetable.page = val;
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
    }

    handleSelectionChange(options: any) {
        this.ids = [];
        options.map((item: PublicNoticeColumnType, $index: number) => {
            this.ids.push(item.id);
        });
    }

    // 填写
    write() {
        this.$router.push(`/SystemManagement/ReportManagement/notice/add`);
    }

    // 查看详情
    look(rowObj?: any) {
        console.log(rowObj);
        if (rowObj) {
            this.$router.push(`/SystemManagement/ReportManagement/notice/look/${rowObj.row.id}`);
        }
    }
    del() {
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
                NoticeServer.delNotice(this.ids).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            ElementUI.Message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.$store.dispatch(NOTICEEVENT.GETNOTICELIST, this.mergeData(this.tableConfig["noticetable"], this.filter));
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

    sortChange(opt: any) {

    }

    dateChange() {

    }


}

export interface DomainType {
    value: string;
    label: string;
}
export interface SearchType {
    key_word: string;
    new: boolean;
    page: string;
    page_size: string;
    send_time: Array<string>;
}

export interface PublicNoticeColumnType {
    c_person: string;
    c_time: string;
    content: string;
    title: string;
    id: string;
}

export interface PubilcTableType {
    [extra: string]: PublicNoticeColumnType[];
}

