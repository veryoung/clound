import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { UserOperation } from "@views/usermanage/operation/operation";


export const notifyRouter: RouteConfig[] = [
    {
        path: "/SystemManagement/ReportManagement/notice",
        name: "站内公告",
        meta: {
            icon: "icon-quan-"
        },
        component: UserOperation,
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