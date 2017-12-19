import Component from "vue-class-component";
import Vue from "vue";



import { ColumnType } from "@components/cloudtable/table.attachment";

require("./setcol.styl");
@Component({
    name: "setcol",
    template: require("./setcol.html"),
    props: {
        columns: {
            type: Array
        },
        keyName: {
            type: String,
            default: "label"
        }
    }
})
export class SetCol extends Vue {

    // init props
    public columns: Array<ColumnType>;
    public keyName: Array<any>;
    // initial data
    // created
    // method

}