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
        Vue.filter(
            "times",
            function (value: number) {
                if (value > 9999) {
                    let n = 0;
                    n = Math.round((value / 10000) * 100) / 100;
                    return n + "万";
                } else {
                    return value;
                }
            }
        );
        Vue.filter(
            "flow",
            function (limit: number) {
                // console.log(value);
                // if (value === 0) return "0 B";
                // let k = 1024, // or 1024  
                //     sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                //     i = Math.floor(Math.log(value) / Math.log(k));

                // console.log((value / Math.pow(k, i)).toPrecision(3) + " " + sizes[i]);    
                // return (value / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
                let size = "";
                if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B  
                    size = limit.toFixed(2) + "B";
                } else if (limit < 0.1 * 1024 * 1024) {// 如果小于0.1MB转化成KB  
                    size = (limit / 1024).toFixed(2) + "KB";
                } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB  
                    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
                } else { // 其他转化成GB  
                    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
                }

                let sizestr = size + "";
                let len = sizestr.indexOf("\.");
                let dec = sizestr.substr(len + 1, 2);
                if (dec === "00") {// 当小数点后为00时 去掉小数部分  
                    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
                }
                return sizestr;
            }
        );
    }
}