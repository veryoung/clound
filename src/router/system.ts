import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { notifyRouter } from "./notify.manage";


export const systemRouter: RouteConfig[] = [
    {
        path: "/home",
        name: "用户管理",
        // component: Layout,
    },
    {
        path: "/OperationAnalysis",
        name: "组织机构"
    },
    {
        path: "/WebsiteAnalysis",
        name: "角色管理"
    },
    {
        path: "/WebsiteManagement",
        name: "日志审计"
    },
    {
        path: "/ReportManagement",
        name: "通知管理",
        children: notifyRouter
    },
];