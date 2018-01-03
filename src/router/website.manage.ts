import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { WebsiteManagement } from "@views/websitemanage/website.manage";



export const WebsiteManageRouter: RouteConfig[] = [
    {
        path: "myWebsite",
        name: "我的网站",
        meta: {
            icon: "icon-yonghuguanli",
        },
        component: WebsiteManagement,
    },
]; 