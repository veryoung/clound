import Vue from "vue";
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
import { PreviewReport } from "@views/reportmanage/preview.report/preview.report";
import { Permissions } from "@directives/permissions";
import { PublicNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/public.notice.detail";
import { Home } from "@views/home/home";
import { Forbidden } from "@views/error/403/403";
import { NotFound } from "@views/error/404/404";
import { DynamicRoute } from "@utils/dynamic.route";
import { get } from "http";

const websiteRouterPermission = new DynamicRoute(WebsiteAnalysisRouter).getRoute();
const websiteManagerPermission = new DynamicRoute(WebsiteManageRouter).getRoute();
const CountReportRouterPermission = new DynamicRoute(CountReportRouter).getRoute();
const systemRouterPermission = new DynamicRoute(systemRouter).getRoute();
const userCenterRouterPermission = new DynamicRoute(userCenterRouter).getRoute();


const levelOne: RouteConfig[] = [
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
    //         permission: "",
    //         hidden: true
    //     }
    // },
];
if (websiteRouterPermission.length !== 0) {
    levelOne.push({
        path: "/WebsiteAnalysis",
        redirect: `/WebsiteAnalysis/${websiteRouterPermission[0].path}`,
        // redirect: "/WebsiteAnalysis/WebsitePandect",
        name: "网站分析",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: websiteRouterPermission
            }
        },
        meta: {
            hidden: false,
            permission: "WebsiteAnalysis"
        },
        children: websiteRouterPermission,

    });
}
if (websiteManagerPermission.length !== 0) {
    levelOne.push({
        path: "/WebsiteManagement",
        redirect: `/WebsiteManagement/${websiteManagerPermission[0].path}`,
        // redirect: "/WebsiteManagement/myWebsite",
        name: "网站管理",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        props: {
            sider: {
                menus: websiteManagerPermission
            }
        },
        meta: {
            hidden: false,
            permission: "WebsiteManagement"
        },
        children: websiteManagerPermission,
    });
}
if (CountReportRouterPermission.length !== 0) {
    levelOne.push(
        {
            path: "/ReportManagement",
            name: "统计报告",
            redirect: `/ReportManagement/${CountReportRouterPermission[0].path}`,
            // redirect: "/ReportManagement/MyReport",
            components: {
                header: HeaderComponent,
                sider: SiderComponent,
                main: ViewContainer
            },
            props: {
                sider: {
                    menus: CountReportRouterPermission
                }
            },
            meta: {
                permission: "ReportManagement"
            },
            children: CountReportRouterPermission,
        },
    );
}

if (systemRouterPermission.length !== 0) {
    levelOne.push(
        {
            path: "/SystemManagement",
            redirect: `/SystemManagement/${systemRouterPermission[0].path}`,
            // redirect: "/SystemManagement/UserManagement",
            name: "系统管理",
            components: {
                header: HeaderComponent,
                sider: SiderComponent,
                main: ViewContainer
            },
            props: {
                sider: {
                    menus: systemRouterPermission
                }
            },
            children: systemRouterPermission,
            meta: {
                permission: "SystemManagement"
            }
        },
    );
}
if (userCenterRouterPermission.length !== 0) {
    levelOne.push(
        {
            path: "/usercenter",
            redirect: `/usercenter/${userCenterRouterPermission[0].path}`,
            // redirect: "/usercenter/PersonalMessage",
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
                    menus: userCenterRouterPermission
                }
            },
            children: userCenterRouterPermission
        },
    );
}
levelOne.push(
    {
        path: "/SituationalAwareness",
        name: "态势感知",
        components: {
            header: HeaderComponent,
            sider: SiderComponent,
            main: ViewContainer
        },
        meta: {
            permission: "SituationalAwareness"
        }
    },
);
// [
    // {
    //     path: "/MochaITOM",
    //     name: "运维管理",
    //     components: {
    //         header: HeaderComponent,
    //         sider: SiderComponent,
    //         main: ViewContainer
    //     },
    //     meta: {
    //         permission: "",
    //         hidden: true
    //     }
    // },
// ];
const levelOnePermission = new DynamicRoute(levelOne).getRoute();
export const entry: RouteConfig[] = levelOnePermission.concat([
    {
        path: "/",
        redirect: `${levelOnePermission[0].path}`,
        meta: {
            hidden: true,
            permission: ""
        },
    },
    {
        path: "/login",
        meta: {
            hidden: true,
            permission: ""
        },
        component: Login
    },
    {
        path: "/report",
        name: "统计报告",
        meta: {
            hidden: true,
            permission: "ReportManagement.Reporttemplate.Check"
        },
        component: PreviewReport
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
            permission: ""
        },
    },
    {
        path: "/403",
        name: "403",
        meta: {
            hidden: true,
            permission: ""
        },
        components: {
            header: HeaderComponent,
            main: Forbidden
        },
    },
    {
        path: "**",
        name: "404",
        meta: {
            hidden: true,
            permission: ""
        },
        components: {
            header: HeaderComponent,
            main: NotFound
        },
    },
]);



export const entryRouter = new Router({
    routes: entry
});

entryRouter.beforeEach((
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
        // console.log("222222");
    if (Permissions.judge(to.meta.permission)) {
        next();
    } else {
        next("/403");
    }
});



Vue.use(Router);