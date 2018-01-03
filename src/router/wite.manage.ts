import { WiteManagement } from "@views/witemanage/wite.manage";
import Router from "vue-router";
import { RouteConfig } from "vue-router";



export const WiteManageRouter: RouteConfig[] = [
    {
        path: "myWite",
        name: "我的网站",
        meta: {
            icon: "icon-yonghuguanli",
        },
        component: WiteManagement,
    },
]; 