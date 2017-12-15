import Router from "vue-router";
import { RouteConfig } from "vue-router";



import { UserMessage } from "@views/usercenter/user.message";



export const userCenterRouter: RouteConfig[] = [
    {
        path: "/usercenter/PersonalMessage",
        name: "个人信息",
        component: UserMessage,
        meta: {
            icon: "icon-gerenxinxi"
        }
    },
    {
        path: "/usercenter/ChangPwd",
        name: "修改密码",
        meta: {
            icon: "icon-xiugaimima"
        }
    },
];