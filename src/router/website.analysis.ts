import { LogsDetail } from "@views/websiteAnalysis/AttackLogs/logsDetail/logs.detail";
import { AttackLogs } from "@views/websiteAnalysis/AttackLogs/attack.logs";
import { WebsitePandect } from "@views/websiteAnalysis/websitePandect/website.pandect";
import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { WebsiteDetail } from "@views/websiteAnalysis/websitePandect/websiteDetail/website.detail";


export const WebsiteAnalysisRouter: RouteConfig[] = [
    {
        path: "WebsitePandect",
        name: "网站总览",
        meta: {
            icon: "icon-yonghuguanli",
        },
        component: WebsitePandect
    },
    {
        path: "AttackLog",
        name: "攻击日志",
        meta: {
            icon: "icon-zuzhijigou"
        },
        component: AttackLogs
    },
    {
        path: "WebsitePandect/look/:id",
        name: "网站详情",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: WebsiteDetail,
    },
    {
        path: "AttackLog/look/:id",
        name: "攻击详情",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: LogsDetail,
    },
];