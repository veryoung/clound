import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ColumnType, TableConfigType, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { Store } from "@store/store";
import { vm } from "@utils/event";

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
        this.$store.dispatch(TABLECONFIG.TABLEALL, { moduleName: this.moduleName });
        vm.$on(TABLECONFIG.TABLEALL, () => {
            this.columns = (<any>Object).assign({}, this.tableConfig[this.moduleName].columns);
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
        TableServer.setConfig(this.tableConfig[this.moduleName]);
        this.unwatch();
    }
    // method

}