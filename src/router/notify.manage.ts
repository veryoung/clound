import Router from "vue-router";
import { RouteConfig } from "vue-router";

import { UserOperation } from "@views/usermanage/operation/operation";
import { PublicNotice } from "@views/systemmanage/notiManage/publicNotice/pubilc.notice";
import { EmailsNotice } from "@views/systemmanage/notiManage/emailNotice/emails.notice";
import { MessageNotice } from "@views/systemmanage/notiManage/messageNotice/message.notice";


export const notifyRouter: RouteConfig[] = [
    {
        path: "/SystemManagement/ReportManagement/notice",
        name: "站内公告",
        meta: {
            icon: "icon-quan-"
        },
        component: PublicNotice,
    },
    {
        path: "/SystemManagement/ReportManagement/emaillnotice",
        name: "邮件通知",
        meta: {
            icon: "icon-quan-"
        },
        component: EmailsNotice,
    },
    {
        path: "/SystemManagement/ReportManagement/messagenotice",
        name: "短信通知",
        meta: {
            icon: "icon-quan-"
        },
        component: MessageNotice,

    },
];