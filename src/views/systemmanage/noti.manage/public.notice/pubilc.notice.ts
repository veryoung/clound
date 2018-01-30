import ElementUI  from "element-ui";
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


require("./pubilc.notice.styl");

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
    public filterData: SearchType = {
        key_word: "",
        new: true,
        page: "1",
        ids: [],
        page_size: "10",
        send_time: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")],
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);

    public PublicNoticeData: PublicNoticeColumnType[] = new Array<PublicNoticeColumnType>();
    // watch
    public unwatch: Function = () => { };


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
        // Aux.getIds().map((id, $idnex) => {
        //     EventBus.unRegister(id);
        // });
        // this.unwatch();
    }

    // init method
    search() {
        // 拼接 开始时间和结束时间
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

    handle() {

    }

    del() {
        if (this.filter.ids.length === 0) {
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
    ids: Array<string>;
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
}

export interface PubilcTableType {
    [extra: string]: PublicNoticeColumnType[];
}

