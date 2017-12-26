import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";

import { TableConfigType, ColumnType, Config, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { vm } from "@utils/event";

require("./table.styl");
@Component({
    name: "cloudtable",
    template: require("./table.html"),
    props: {
        moduleName: {
            type: String
        },
        datas: {
            type: Array
        }
    },
    computed: {
        ...mapGetters([
            "tableConfig"
        ])
    }
})
export class CloudTable extends Vue {
    // init props
    public datas: Array<any>;
    // init data
    public obj: Config | "" = "";

    // lifecircle hook
    created() {
        // this.obj = this.tableConfig[this.moduleName];
        this.$store.dispatch(TABLECONFIG.TABLEALL, { moduleName: this.moduleName });
        vm.$on(TABLECONFIG.TABLEALL, () => {
            this.obj = this.tableConfig[this.moduleName];
        });
    }

    beforeDestroy() {
        TableServer.setConfig(this.tableConfig[this.moduleName]);
    }

    // init computed
    public tableConfig: TableConfigType;
    public moduleName: string;
    // init methods

    handleSizeChange(val: number) {
        this.$emit("handleSizeChange", val);
    }
    handleCurrentChange(val: number) {
        this.$emit("handleCurrentChange", val);
    }

    handleSelectionChange(options: any) {
        this.$emit("handleSelectionChange", options);
    }

}

