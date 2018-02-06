import Vue from "vue";
import * as moment from "moment";


export class StatusFilter {
    constructor() {
        Vue.filter(
            "status",
            function (value: boolean) {
                return value === true ? "成功" : "失败";
            }
        );
    }
}