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
import { session } from "@utils/sessionstorage";
import { GeneralServer } from "@server/general";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { USER } from "@store/user.center.type";
import { Store } from "@store/store";
import { WebsiteManageRouter } from "@router/website.manage";
import { WebsiteAnalysisRouter } from "@router/website.analysis";
import { CountReportRouter } from "@router/count.report";
import { PreviewReport } from "@views/reportmanage/preview.report/preview.report";
import { Permissions } from "@directives/permissions";
import { PublicNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/public.notice.detail";
import { Home } from "@views/home/home";


export const entry: RouteConfig[] = [
    {
        path: "/",
        meta: {
            hidden: true,
            permission: ""
        },
        redirect: "/home"
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
        },
        meta: {
            permission: "",
            hidden: true
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
            permission: "WebsiteManagement"
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
        meta: {
            permission: "ReportManagement"
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
        meta: {
            permission: "",
            hidden: true
        }
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
        children: userCenterRouter,
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
];



export const entryRouter = new Router({
    routes: entry
});

entryRouter.beforeEach((
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
    // if (Permissions.judge(to.meta.permission)) {
    //     next();
    //     return;
    // } else {
    //     for (let item of entry) {
    //         if (Permissions.judge(item.meta.permission)) {
    //             next(item.path);
    //             break;
    //         }
    //     }
    // }
    next();
});



Vue.use(Router);