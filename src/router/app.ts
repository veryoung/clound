import Router from "vue-router";
import { RouteConfig } from "vue-router";


export const appRouter: RouteConfig[] = [
    {
        path: "/home",
        name: "首页",
        // component: Layout,
    },
    {
        path: "/OperationAnalysis",
        name: "运营分析"
    },
    {
        path: "/WebsiteAnalysis",
        name: "网站分析"
    },
    {
        path: "/WebsiteManagement",
        name: "网站管理"
    },
    {
        path: "/ReportManagement",
        name: "报告管理"
    },
    {
        path: "/MochaITOM",
        name: "运维管理"
    },
    {
        path: "/SystemManagement",
        name: "系统管理"
    },
    {
        path: "/SituationalAwareness",
        name: "态势感知"
    }
];