import { ResType } from "server";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { TableConfigType } from "@store/table.type";
import { CloudTable } from "@components/cloudtable/table";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



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
    public filter: any = (<any>Object).assign({}, []);
    // public websitetableData: WebsiteListColumnType[] = new Array<WebsiteListColumnType>();
    // watch
    public unwatch: Function = () => { };

    // public tableDefault: = 
    // lifecircle hook 
    created() {
      
    }

    destroyed() {
        // Aux.getIds().map((id, $idnex) => {
        //     EventBus.unRegister(id);
        // });
        // this.unwatch();
    }

    // init method
    search() {
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