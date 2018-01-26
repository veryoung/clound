import Vue from "vue";
import * as moment from "moment";


export class DateTimeFilter {
    constructor() {
        Vue.filter(
            "datetime",
            function (value: string) {
                if (value === "") return value;
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            }
        );
    }
}