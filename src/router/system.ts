import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { notifyRouter } from "./notify.manage";
import { Organization } from "@views/organization/organization";
import { UserManagement } from "@views/usermanage/user.manage";
import { UserOperation } from "@views/usermanage/operation/operation";
import { userManageRouter } from "./user.manage";

// /SystemManagement/UserManagement/
export const systemRouter: RouteConfig[] = [
    {
        path: "UserManagement",
        name: "用户管理",
        meta: {
            icon: "icon-yonghuguanli",
        },
        component: UserManagement,
        // children: userManageRouter
    },
    {
        path: "/SystemManagement/Organization",
        name: "组织机构",
        component: Organization,
        meta: {
            icon: "icon-zuzhijigou"
        }
    },
    {
        path: "/SystemManagement/WebsiteAnalysis",
        name: "角色管理",
        meta: {
            icon: "icon-jiaoseguanli"
        }
    },
    {
        path: "/SystemManagement/WebsiteManagement",
        name: "日志审计",
        meta: {
            icon: "icon-rizhishenji"
        }
    },
    {
        path: "/SystemManagement/ReportManagement",
        name: "通知管理",
        children: notifyRouter,
        meta: {
            icon: "icon-tongzhiguanli"
        }
    },
    {
        path: "UserManagement/add",
        name: "添加用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "add"
        },
        component: UserOperation,
    },
    {
        path: "UserManagement/editor/:id",
        name: "编辑用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "editor"
        },
        component: UserOperation,
    },
    {
        path: "UserManagement/look/:id",
        name: "编辑用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: UserOperation,
    },
];