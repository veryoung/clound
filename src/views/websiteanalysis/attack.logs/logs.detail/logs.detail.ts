import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import { WebsiteAnalysisServer } from "@server/website.analysis";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { ListBaseClass } from "@views/base/base.class";
require("./logs.detail.styl");

@Component({
    name: "logsdetail",
    components: {
        ModuleTitle
    },
    template: require("./logs.detail.html"),
})


export class LogsDetail extends ListBaseClass {
    // props

    // propss
    public currentWebsite: string = "攻击详情";
    public titles: Array<string> = [this.currentWebsite];
    public ColumnArray: Array<ColumnArrayType> = [
        {
            label: "时间",
            props: "datetime",
        },
        {
            label: "目的IP",
            props: "dst_ip",
        },
        {
            label: "目的端口",
            props: "dst_port",
        },
        {
            label: "网站地址",
            props: "host",
        },
        {
            label: "被攻击URI",
            props: "uri",
        },
        {
            label: "源IP",
            props: "src_ip",
        },
        {
            label: "源端口",
            props: "src_port",
        },
        {
            label: "请求头",
            props: "request_header",
        },
        {
            label: "请求体",
            props: "request_body",
        },
        {
            label: "响应头",
            props: "response_header",
        },
        {
            label: "响应体",
            props: "response_body",
        },
        {
            label: "客户端",
            props: "user_agent",
        },
        {
            label: "Referer",
            props: "referer",
        },
        {
            label: "处理结果",
            props: "action",
        },
        {
            label: "威胁等级",
            props: "severity",
        },
        {
            label: "匹配",
            props: "rule_math",
        },
        {
            label: "响应码",
            props: "response_code",
        },
        {
            label: "请求标识",
            props: "unique_id",
        },
        {
            label: "请求长度",
            props: "content_length",
        },
    ];
    public filter: ColumnType = (<any>Object).assign({}, filterData);
    // lifehook
    created() {
        let routerParams: any = this.$route.params;
        let uri = this.$route.query.uri;
        routerParams.uri = uri;
        console.log(this.$route.query);
        console.log(typeof routerParams);
        WebsiteAnalysisServer.getAttackLogDetail(routerParams).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            if (res.status === "suc") {
                this.filter = res.data;
            }
        });
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
    action: string;
    asg_id: string;
    content_length: string;
    datetime: string;
    dst_ip: string;
    dst_port: string;
    host: string;
    id: string;
    in_db_time: string;
    ip_location: string;
    member_id: string;
    policy_id: string;
    referer: string;
    request_body: string;
    request_header: string;
    response_body: string;
    response_code: string;
    response_header: string;
    rule_id: string;
    rule_match: string;
    severity: string;
    site_id: string;
    src_ip: string;
    src_port: string;
    unique_id: string;
    uri: string;
    user_agent: string;
}

export const filterData: ColumnType = {
    action: "",
    asg_id: "",
    content_length: "",
    datetime: "",
    dst_ip: "",
    dst_port: "",
    host: "",
    id: "",
    in_db_time: "",
    ip_location: "",
    member_id: "",
    policy_id: "",
    referer: "",
    request_body: "",
    request_header: "",
    response_body: "",
    response_code: "",
    response_header: "",
    rule_id: "",
    rule_match: "",
    severity: "",
    site_id: "",
    src_ip: "",
    src_port: "",
    unique_id: "",
    uri: "",
    user_agent: "",
};
