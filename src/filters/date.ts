import Vue from "vue";
import * as moment from "moment";


export class DateFilter {
    constructor() {
        Vue.filter(
            "date",
            function (value: string) {
                if (value === "") return value;
                return moment(value).format("YYYYMMDD");
            }
        );
    }
}