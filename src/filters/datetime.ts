import Vue from "vue";
import * as moment from "moment";


export class DateTimeFilter {
    constructor() {
        Vue.filter(
            "datetime",
            function (value: string) {
                if (value === "") return value;
                let tmp = value.substring(0, 8);
                let estr = value.substring(8, value.length);
                value = tmp + " " + estr;
                // console.log(moment("20180304 111213").format("YYYY-MM-DD hh:mm:ss"));
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            }
        );
    }
}