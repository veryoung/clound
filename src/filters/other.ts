import Vue from "vue";
import * as moment from "moment";


export class OtherFilter {
    constructor() {
        Vue.filter(
            "send_type",
            function (value: string) {
                switch (value) {
                    case "auto":
                        return "系统发送";
                    case "manual":
                        return "人工发送";
                    default:
                        return "";
                }
            }
        );
    }
}