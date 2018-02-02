import { RouterComponent } from "@components/router/router.component";
import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { notifyRouter } from "./notify.manage";
import { OrganizationComponent } from "@views/organization/organization";
import { UserManagement } from "@views/usermanage/user.manage";
import { UserOperation } from "@views/usermanage/operation/operation";
import { UserMessage } from "@views/usercenter/user.message";
import { LogsAudit } from "@views/systemmanage/logs.audit/logs.audit";


// /SystemManagement/UserManagement/
export const systemRouter: RouteConfig[] = [
    {
        path: "UserManagement",
        name: "用户管理",
        meta: {
            icon: "icon-yonghuguanli",
            permission: "'SystemManagement.userManagement.*'",
        },
        component: UserManagement,
    },
    {
        path: "Organization",
        name: "组织机构",
        component: OrganizationComponent,
        meta: {
            icon: "icon-zuzhijigou",
            permission: "SystemManagement.Organization.*",
        }
    },
    {
        path: "WebsiteAnalysis",
        name: "角色管理",
        meta: {
            icon: "icon-jiaoseguanli",
            permission: "SystemManagement.RoleManagement.*",
        }
    },
    {
        path: "LogAudit",
        name: "日志审计",
        meta: {
            icon: "icon-rizhishenji",
            permission: "'SystemManagement.LogAudit.*'",
        },
        component: LogsAudit,
    },
    {
        path: "ReportManagement",
        name: "通知管理",
        children: notifyRouter,
        redirect: "ReportManagement/notice",
        meta: {
            icon: "icon-tongzhiguanli",
        },
        component: RouterComponent
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
        name: "查看用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: UserMessage,
    },
];