import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";

import { TableConfigType, Config, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";


const Aux = new Auxiliary<string>();
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
        this.$store.dispatch(TABLECONFIG.TABLEALL, { moduleName: this.moduleName });
        let that = this;
        let id = EventBus.register(CONSTANT.TABLEALL, (event: string, info: any) => {
            that.obj = that.tableConfig[that.moduleName];
        });
        Aux.insertId(id);
    }

    beforeDestroy() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
        TableServer.setConfig({ code: this.moduleName, value: this.tableConfig[this.moduleName] });
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

    sortChange(opt: any) {
        this.$emit("sortChange", opt);
    }
}

