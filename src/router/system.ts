import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { notifyRouter } from "./notify.manage";
import { Organization } from "@views/organization/organization";


export const systemRouter: RouteConfig[] = [
    {
        path: "home",
        name: "用户管理",
        meta: {
            icon: "icon-yonghuguanli"
        }
        // component: Layout,
    },
    {
        path: "Organization",
        name: "组织机构",
        component: Organization,
        meta: {
            icon: "icon-zuzhijigou"
        }
    },
    {
        path: "WebsiteAnalysis",
        name: "角色管理",
        meta: {
            icon: "icon-jiaoseguanli"
        }
    },
    {
        path: "WebsiteManagement",
        name: "日志审计",
        meta: {
            icon: "icon-rizhishenji"
        }
    },
    {
        path: "ReportManagement",
        name: "通知管理",
        children: notifyRouter,
        meta: {
            icon: "icon-tongzhiguanli"
        }
    },
];