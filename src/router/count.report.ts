import Router from "vue-router";
import { RouteConfig } from "vue-router/types/router";
import { MyReport } from "@views/reportmanage/my.report/my.report";
import { ReportDetail } from "@views/reportmanage/report.detail/report.detail";
import { ReportTemplate } from "@views/reportmanage/report.template/report.template";
import { ReportOperation } from "@views/reportmanage/report.operation/report.operation";


export const CountReportRouter: RouteConfig[] = [
    {
        path: "MyReport",
        name: "我的报告",
        meta: {
            icon: "icon-yonghuguanli",
            permission: "ReportManagement.MyReport"
        },
        component: MyReport
    },
    {
        path: "RreviewReport/:id",
        name: "报告详情",
        meta: {
            icon: "icon-yonghuguanli",
            hidden: true,
            permission: "ReportManagement.MyReport.Check"
        },
        component: ReportDetail
    },
    {
        path: "ReportTemplate",
        name: "报告模板",
        meta: {
            icon: "icon-yonghuguanli",
            permission: "ReportManagement.ReportTemplate"
        },
        component: ReportTemplate,
    },
    {
        path: "ReportTemplate/add",
        name: "添加模板",
        meta: {
            icon: "icon-yonghuguanli",
            hidden: true,
            permission: "ReportManagement.ReportTemplate.Add"
        },
        props: {
            operation: "add"
        },
        component: ReportOperation,
    },
    {
        path: "ReportTemplate/editor/:id",
        name: "编辑模板",
        meta: {
            icon: "icon-yonghuguanli",
            hidden: true
        },
        props: {
            operation: "editor"
        },
        component: ReportOperation,
    }
];