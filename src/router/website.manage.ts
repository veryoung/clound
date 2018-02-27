import { WebsiteOperation } from "@views/websitemanage/website.operation/website.operation";
import { WebsiteSettings } from "@views/websitemanage/website.settings/website.settings";
import { WebsiteManagement } from "@views/websitemanage/website.manage";
import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { WebsiteMessage } from "@views/websitemanage/website.message/webstie.message";



export const WebsiteManageRouter: RouteConfig[] = [
    {
        path: "myWebsite",
        name: "我的网站",
        meta: {
            icon: "icon-yonghuguanli",
            hidden: false,
            permission: "WebsiteManagement.MyWebsite"
        },
        component: WebsiteManagement,
    },
    {
        path: "myWebsite/add",
        name: "添加网站",
        meta: {
            icon: "icon-quan-",
            hidden: true,
            permission: "WebsiteManagement.MyWebsite.Add"
        },
        props: {
            operation: "add"
        },
        component: WebsiteOperation,
    },
    {
        path: "myWebsite/editor/:id",
        name: "编辑网站",
        meta: {
            icon: "icon-quan-",
            hidden: true,
            permission: "WebsiteManagement.MyWebsite.Edit"
        },
        props: {
            operation: "editor"
        },
        component: WebsiteOperation,
    },
    {
        path: "myWebsite/settings/:id",
        name: "服务设置",
        meta: {
            icon: "icon-quan-",
            hidden: true,
            permission: "WebsiteManagement.MyWebsite.Set"
        },
        props: {
            operation: "editor"
        },
        component: WebsiteSettings,
    },
    {
        path: "myWebsite/look/:id",
        name: "查看",
        meta: {
            icon: "icon-quan-",
            hidden: true,
            permission: "WebsiteManagement.MyWebsite.Detail"
        },
        props: {
            operation: "look"
        },
        component: WebsiteMessage,
    },
];