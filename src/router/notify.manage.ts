import { EmailNoiceOperation } from "@views/systemmanage/noti.manage/operation/email.notice.operation";
import Router from "vue-router";
import { RouteConfig } from "vue-router";
import { PublicNotice } from "@views/systemmanage/noti.manage/public.notice/pubilc.notice";
import { EmailsNotice } from "@views/systemmanage/noti.manage/email.notice/emails.notice";
import { MessageNotice } from "@views/systemmanage/noti.manage/message.notice/message.notice";
import { PublicNoiceOperation } from "@views/systemmanage/noti.manage/operation/public.notice.operation";
import { PublicNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/public.notice.detail";
import { MessageNoiceOperation } from "@views/systemmanage/noti.manage/operation/message.notice.operation";
import { EmailNoticeDeatil } from "@views/systemmanage/noti.manage/info.detail/email.notice.detail";





export const notifyRouter: RouteConfig[] = [
    {
        path: "notice",
        name: "站内公告",
        meta: {
            icon: "icon-quan-"
        },
        component: PublicNotice,
    },
    {
        path: "notice/add",
        name: "写公告",
        meta: {
            icon: "icon-quan-",
            hidden: true,
        },
        props: {
            operation: "add"
        },
        component: PublicNoiceOperation
    },
    {
        path: "notice/look/:id",
        name: "查看公告",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: PublicNoticeDeatil,
    },
    {
        path: "emaillnotice",
        name: "邮件通知",
        meta: {
            icon: "icon-quan-"
        },
        component: EmailsNotice,
    },
    {
        path: "emaillnotice/look/:id",
        name: "查看邮件",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: EmailNoticeDeatil,
    },
    {
        path: "emaillnotice/add",
        name: "写邮件",
        meta: {
            icon: "icon-quan-",
            hidden: true,
        },
        props: {
            operation: "add"
        },
        component: EmailNoiceOperation
    },
    {
        path: "messagenotice",
        name: "短信通知",
        meta: {
            icon: "icon-quan-"
        },
        component: MessageNotice,
    },
    {
        path: "messagenotice/add",
        name: "写短信",
        meta: {
            icon: "icon-quan-",
            hidden: true,
        },
        props: {
            operation: "add"
        },
        component: MessageNoiceOperation
    },

];