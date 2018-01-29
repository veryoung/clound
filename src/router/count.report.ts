import Router from "vue-router";
import { RouteConfig } from "vue-router/types/router";
import { MyReport } from "@views/reportmanage/my.report/my.report";


export const CountReportRouter: RouteConfig[] = [
    {
        path: "MyReport",
        name: "我的报告",
        meta: {
            icon: "icon-yonghuguanli",
        },
        component: MyReport
    },

];