import Vue from "vue";
import Component from "vue-class-component";

import { ColumnType } from "./table.attachment";

require("./table.styl");
@Component({
    name: "cloudtable",
    template: require("./table.html"),
    props: {
        columns: {
            type: Array
        },
        datas: {
            type: Array
        }
    }
})
export class CloudTable extends Vue {
    // init props
    public datas: Array<any>;
    public columns: Array<ColumnType>;

    // init computed
    get filterColums() {
        return this.columns.filter((item) => item.show);
    }
    // init data 
    public currentPage: number = 1;
    public pageSizes: number[] = [10, 20, 30, 40, 50];
    public pageSize: number = this.pageSizes[0];

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

