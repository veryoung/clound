import Router from "vue-router";
import { RouteConfig } from "vue-router";


export const notifyRouter: RouteConfig[] = [
    {
        path: "/home",
        name: "站内公告",
        meta: {
            icon: "icon-quan-"
        }
        // component: Layout,
    },
    {
        path: "/OperationAnalysis",
        name: "邮件通知",
        meta: {
            icon: "icon-quan-"
        }
    },
    {
        path: "/WebsiteAnalysis",
        name: "短信通知",
        meta: {
            icon: "icon-quan-"
        }
    },
];