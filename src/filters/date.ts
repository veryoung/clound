import Vue from "vue";
import * as moment from "moment";


export class DateFilter {
    constructor() {
        Vue.filter(
            "date",
            function (value: string) {
                if (value === "") return value;
                return moment(value).format("YYYY-MM-DD");
            }
        );
        Vue.filter(
            "dateRange",
            function (value: Array<string>) {
                let stime = moment(value[0]).format("YYYY-MM-DD");
                let etime = moment(value[1]).format("YYYY-MM-DD");
                return stime + " 至 " + etime;
            }
        );
    }
}