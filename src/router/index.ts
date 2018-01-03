import Vue from "vue";
import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { systemRouter } from "@router/system";


import { HeaderComponent } from "@components/layout/header/header";
import { SiderComponent } from "@components/layout/sider/sider";
import { ViewContainer } from "@views/container/container";
import { userCenterRouter } from "@router/user.center";
import { Login } from "@views/login/login";
import { Route } from "vue-router/types/router";
import { session } from "@utils/sessionstorage";
import { GeneralServer } from "@server/general";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { USER } from "@store/user.center.type";
import { Store } from "@store/store";
import { UserStatus } from "@utils/monitor";
import { WiteManageRouter } from "@router/wite.manage";


Vue.use(Router);

export const entry: RouteConfig[] = [
    {
        path: "/",
        // redirect: "/login",
        meta: {
            hidden: true
        },
        beforeEnter(to: Route, from: Route, next: Function) {
            new UserStatus(next);
        }
    },
    {
        path: "/login",
        meta: {
            hidden: true
        },
        component: Login
    },
    {
        path: "/home",
        name: "首页",
        components: {
            header: HeaderComponent,
            // sider: SiderComponent,
            main: ViewContainer
        },
    },
    {
        path: "/OperationAnalysis",
        name: "运营分析",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: systemRouter
            }
        }
    },
    {
        path: "/WebsiteAnalysis",
        name: "网站分析",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
    },
    {
        path: "/WebsiteManagement",
        redirect: "/WebsiteManagement/myWite",
        name: "网站管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: WiteManageRouter 
            }
        },
        meta: {
            hidden: false,
        },
        children: WiteManageRouter
    },
    {
        path: "/ReportManagement",
        name: "报告管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
    },
    {
        path: "/MochaITOM",
        name: "运维管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
    },
    {
        path: "/SystemManagement",
        redirect: "/SystemManagement/UserManagement",
        name: "系统管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: systemRouter
            }
        },
        children: systemRouter
    },
    {
        path: "/SituationalAwareness",
        name: "态势感知",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
    },
    {
        path: "/usercenter",
        redirect: "/usercenter/PersonalMessage",
        name: "个人中心",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        meta: {
            hidden: true
        },
        props: {
            sider: {
                menus: userCenterRouter
            }
        },
        children: userCenterRouter,
    }
];

export const entryRouter = new Router({
    routes: entry
});
