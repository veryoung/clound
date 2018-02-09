import Vue from "vue";


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
        Vue.filter(
            "status",
            function (value: boolean) {
                if (value === true) {
                    return "成功";
                } else if (value === false) {
                    return "失败";
                } else {
                    return value;
                }
            }
        );
    }
}