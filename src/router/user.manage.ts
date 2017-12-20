import Router from "vue-router";
import { RouteConfig } from "vue-router";


import { UserOperation } from "@views/usermanage/operation/operation";

export const userManageRouter: RouteConfig[] = [
    {
        path: "add",
        name: "添加用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "add"
        },
        component: UserOperation,
    },
    {
        path: "editor/:id",
        name: "编辑用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "editor"
        },
        component: UserOperation,
    },
    {
        path: "look/:id",
        name: "编辑用户",
        meta: {
            icon: "icon-quan-",
            hidden: true
        },
        props: {
            operation: "look"
        },
        component: UserOperation,
    },
];


