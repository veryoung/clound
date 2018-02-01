import { PublicNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/public.notice.detail";
import { Home } from "@views/home/home";
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
import { WebsiteManageRouter } from "@router/website.manage";
import { WebsiteAnalysisRouter } from "@router/website.analysis";
import { CountReportRouter } from "@router/count.report";
import { PreviewReport } from "@views/reportmanage/preview.report/preview.report";


Vue.use(Router);

let tempRouter: RouteConfig[] = [
    {
        path: "/",
        meta: {
            hidden: true
        },
        redirect: "/home"
    },
    // {
    //     path: "/home",
    //     name: "首页",
    //     components: {
    //         header: HeaderComponent,
    //         // sider: SiderComponent,
    //         main: Home
    //     },
    // },
    {
        path: "/noticelook/:id",
        name: "查看公告",
        components: {
            header: HeaderComponent,
            // sider: SiderComponent,
            main: PublicNoticeDeatil
        },
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
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
            main: Home
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
        redirect: "/WebsiteAnalysis/WebsitePandect",
        name: "网站分析",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: WebsiteAnalysisRouter
            }
        },
        meta: {
            hidden: false,
        },
        children: WebsiteAnalysisRouter
    },
    {
        path: "/WebsiteManagement",
        redirect: "/WebsiteManagement/myWebsite",
        name: "网站管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: WebsiteManageRouter
            }
        },
        meta: {
            hidden: false,
        },
        children: WebsiteManageRouter
    },
    {
        path: "/ReportManagement",
        name: "统计报告",
        redirect: "/ReportManagement/MyReport",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: CountReportRouter
            }
        },
        children: CountReportRouter
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
    },
    {
        path: "/report",
        name: "统计报告",
        meta: {
            hidden: true
        },
        component: PreviewReport
    }
];

export const entry: RouteConfig[] = tempRouter;

export const entryRouter = new Router({
    routes: entry
});
