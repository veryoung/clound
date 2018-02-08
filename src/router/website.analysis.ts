
import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { WebsitePandect } from "@views/websiteanalysis/website.pandect/website.pandect";
import { AttackLogs } from "@views/websiteanalysis/attack.logs/attack.logs";
import { WebsiteDetail } from "@views/websiteanalysis/website.pandect/website.detail/website.detail";
import { LogsDetail } from "@views/websiteanalysis/attack.logs/logs.detail/logs.detail";


export const WebsiteAnalysisRouter: RouteConfig[] = [
    {
        path: "WebsitePandect",
        name: "网站总览",
        meta: {
            icon: "icon-yonghuguanli",
            permission: "WebsiteAnalysis.WebOverview"
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
            hidden: true,
            permission: "AttackLog.AttackDetails"
        },
        props: {
            operation: "look"
        },
        component: LogsDetail,
    },
];