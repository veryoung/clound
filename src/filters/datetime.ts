import Vue from "vue";
import * as moment from "moment";


export class DateTimeFilter {
    constructor() {
        Vue.filter(
            "datetime",
            function (value: string) {
                // 将YYYYMMDDHHmmss传入格式处理为 YYYYMMDD HHmmss
                if (value === "" || !value) return value;
                let tmp = value.substring(0, 8);
                let estr = value.substring(8, value.length);
                value = tmp + " " + estr;
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            }
        );
    }
}