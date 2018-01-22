import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
require("./logs.detail.styl");

@Component({
    name: "logsdetail",
    components: {
        ModuleTitle
    },
    template: require("./logs.detail.html"),
})


export class LogsDetail extends Vue {
    // props

    // propss
    public currentWebsite: string = "当前网站:" + 11;
    public titles: Array<string> = [this.currentWebsite];
    public ColumnArray: Array<ColumnArrayType> = [
        {
            label: "时间",
            props: "time",
        },
        {
            label: "目的IP",
            props: "aimIP",
        },
        {
            label: "目的端口",
            props: "aimPort",
        },
        {
            label: "网站地址",
            props: "websiteAdd",
        },
        {
            label: "被攻击URL",
            props: "attckedUrl",
        },
        {
            label: "源IP",
            props: "sourceIP",
        },
        {
            label: "源端口",
            props: "sourcePort",
        },
        {
            label: "请求头",
            props: "reqHeader",
        },
        {
            label: "请求体",
            props: "reqBody",
        },
        {
            label: "响应头",
            props: "resHeader",
        },
        {
            label: "响应体",
            props: "resBody",
        },
        {
            label: "客户端",
            props: "client",
        },
        {
            label: "Referer",
            props: "referer",
        },
        {
            label: "触发规则",
            props: "trigRule",
        },
        {
            label: "处理结果",
            props: "results",
        },
        {
            label: "威胁等级",
            props: "threatLevel",
        },
        {
            label: "匹配",
            props: "mate",
        },
        {
            label: "响应码",
            props: "resCode",
        },
        {
            label: "请求标识",
            props: "reqID",
        },
        {
            label: "请求长度",
            props: "reqLength",
        },
    ];
    public filter: ColumnType = (<any>Object).assign({}, filterData);
    // lifehook
    created() {
        console.log(this.filter);
    }

    // method
    back() {
        this.$router.go(-1);
    }
}

export interface ColumnArrayType {
    label: string;
    props: string;
}

export default interface ColumnType {
    aimIP: string;
    aimPort: string;
    attckedUrl: string;
    client: string;
    mate: string;
    referer: string;
    reqBody: string;
    reqHeader: string;
    reqID: string;
    reqLength: string;
    resBody: string;
    resCode: string;
    resHeader: string;
    results: string;
    sourceIP: string;
    sourcePort: string;
    threatLevel: string;
    time: string;
    trigRule: string;
    websiteAdd: string;
}

export const filterData: ColumnType = {
    aimIP: "",
    aimPort: "",
    attckedUrl: "",
    client: " ",
    mate: " ",
    referer: " ",
    reqBody: " ",
    reqHeader: " ",
    reqID: " ",
    reqLength: " ",
    resBody: " ",
    resCode: " ",
    resHeader: " ",
    results: " ",
    sourceIP: " ",
    sourcePort: " ",
    threatLevel: " ",
    time: "",
    trigRule: " ",
    websiteAdd: " ",
};
