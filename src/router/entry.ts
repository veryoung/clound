import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { systemRouter } from "@router/system";
import { HeaderComponent } from "@components/layout/header/header";
import { SiderComponent } from "@components/layout/sider/sider";
import { ViewContainer } from "@views/container/container";
import { userCenterRouter } from "@router/user.center";
import { Login } from "@views/login/login";
import { Route, RawLocation } from "vue-router/types/router";
import { GeneralServer } from "@server/general";
import { ResType } from "server";
import { WebsiteManageRouter } from "@router/website.manage";
import { WebsiteAnalysisRouter } from "@router/website.analysis";
import { CountReportRouter } from "@router/count.report";
import { PublicNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/public.notice.detail";
import { Home } from "@views/home/home";
import { Forbidden } from "@views/error/403/403";
import { NotFound } from "@views/error/404/404";
import { DynamicRoute } from "@utils/dynamic.route";


export const asyncRouter: RouteConfig[] = [
    {
        path: "/home",
        name: "首页",
        components: {
            header: HeaderComponent,
            // sider: SiderComponent,
            main: Home
        },
        meta: {
            permission: "Home"
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
            permission: "WebsiteAnalysis"
        },
        children: WebsiteAnalysisRouter,

    }, {
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
            permission: "WebsiteManagement"
        },
        children: WebsiteManageRouter,
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
        meta: {
            permission: "ReportManagement"
        },
        children: CountReportRouter,
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
        children: systemRouter,
        meta: {
            permission: "SystemManagement"
        }
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
            hidden: true,
            permission: "Personal"
        },
        props: {
            sider: {
                menus: userCenterRouter
            }
        },
        children: userCenterRouter
    },
    {
        path: "**",
        name: "404",
        meta: {
            hidden: true,
            permission: "*"
        },
        components: {
            header: HeaderComponent,
            main: NotFound
        },
    },
];
// [
// {
//     path: "/OperationAnalysis",
//     name: "运营分析",
//     components: {
//         header: HeaderComponent,
//         sider: SiderComponent,
//         main: ViewContainer
//     },
//     props: {
//         sider: {
//             menus: systemRouter
//         }
//     },
//     meta: {
//         permission: "*",
//         hidden: true
//     }
// },
// {
//     path: "/MochaITOM",
//     name: "运维管理",
//     components: {
//         header: HeaderComponent,
//         sider: SiderComponent,
//         main: ViewContainer
//     },
//     meta: {
//         permission: "*",
//         hidden: true
//     }
// },
// ];
export const staticRouter: RouteConfig[] = [
    // {
    //     path: "/",
    //     // redirect:
    //     meta: {
    //         hidden: true,
    //         permission: "*"
    //     },
    // },
    {
        path: "/login",
        meta: {
            hidden: true,
            permission: "*"
        },
        component: Login
    },
    {
        path: "/noticelook/:id",
        name: "查看公告",
        components: {
            header: HeaderComponent,
            main: PublicNoticeDeatil
        },
        meta: {
            icon: "icon-quan-",
            hidden: true,
            permission: "*"
        },
    },
    {
        path: "/403",
        name: "403",
        meta: {
            hidden: true,
            permission: "*"
        },
        components: {
            header: HeaderComponent,
            main: Forbidden
        },
    },
];