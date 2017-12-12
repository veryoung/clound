import Router from "vue-router";
import { RouteConfig } from "vue-router";


export const notifyRouter: RouteConfig[] = [
    {
        path: "/home",
        name: "站内公告",
        // component: Layout,
    },
    {
        path: "/OperationAnalysis",
        name: "邮件通知"
    },
    {
        path: "/WebsiteAnalysis",
        name: "短信通知"
    },
];