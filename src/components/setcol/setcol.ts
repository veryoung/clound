import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ColumnType, TableConfigType, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { Store } from "@store/store";
import { vm, EventBus, CONSTANT } from "@utils/event";

require("./setcol.styl");
@Component({
    name: "setcol",
    template: require("./setcol.html"),
    props: {
        keyName: {
            type: String,
            default: "label"
        },
        moduleName: {
            type: String
        }
    },
    computed: {
        ...mapGetters([
            "tableConfig"
        ])
    },
})
export class SetCol extends Vue {
    // init computed
    public tableConfig: TableConfigType;
    // init props
    public moduleName: string;
    public keyName: Array<any>;
    // init data
    public columns: Array<ColumnType> = new Array<ColumnType>();
    public unwatch: Function;
    // initial data
    // lifecircle hook
    created() {
        let that = this;
        EventBus.register(new Date().getTime() + "", CONSTANT.TABLEALL, (event: string, info: any) => {
            that.columns = (<any>Object).assign({}, that.tableConfig[that.moduleName].columns);
        });
        this.unwatch = vm.$watch(() => {
            return this.columns;
        }, (val, oldval) => {
            Store.dispatch(TABLECONFIG.CHANGECOLUMNS, { moduleName: this.moduleName, columns: val });
        }, {
            deep: true
        });
    }
    beforeDestroy() {
        EventBus.unRegister(CONSTANT.TABLEALL);
        TableServer.setConfig(this.tableConfig[this.moduleName]);
        this.unwatch();
    }
    // method

}