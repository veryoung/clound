import Vue from "vue";
import { session } from "@utils/sessionstorage";
import { PermissionConfig } from "@directives/p.config";

/**
 * user_manage_all = "SystemManagement.userManagement.*"
show_user_details = "SystemManagement.userManagement.Check"#显示用户详情
add_user_info = "SystemManagement.userManagement.Add"#添加用户
del_user_info = "SystemManagement.userManagement.Delete"#删除 用户
update_user_info = "SystemManagement.userManagement.Edit"#编辑用户
import_user_list = "SystemManagement.userManagement.Check"#导入用户信息列表
export_select_user_list = "SystemManagement.userManagement.ExportSelection"#导出选中用户信息列表
export_filter_user_list = "SystemManagement.userManagement.ExportAll"#导出当前过滤条件用户信息列表
reset_pwd = "SystemManagement.userManagement.ResetPassword
 */

export const PermissionsSet: any = {
    SystemManagement: {
        userManagement: {
            // 显示用户详情
            Detail: "SystemManagement.userManagement.Detail",
            // 添加用户
            Add: "SystemManagement.userManagement.Add",
            // 删除用户
            Delete: "SystemManagement.userManagement.Delete",
            // 编辑用户
            Edit: "SystemManagement.userManagement.Edit",
            // 导入用户信息列表
            Check: "SystemManagement.userManagement.Check",
            // 导出选中用户信息列表
            ExportSelection: "SystemManagement.userManagement.ExportSelection",
            // 导出当前过滤条件用户信息列表
            ExportAll: "SystemManagement.userManagement.ExportAll",
            ResetPassword: "SystemManagement.userManagement.ResetPassword"
        },
        Organization: {
            // 显示组织详情
            Check: "SystemManagement.Organization.Check",
            // 添加组织信息
            Add: "SystemManagement.Organization.Add",
            // 删除组织信息
            Delete: "SystemManagement.Organization.Delete",
            // 更新组织信息
            Edit: "SystemManagement.Organization.Edit"
        },
        // 个人中心
        Personal: {
            // 公告通知
            Check: "Personal.Announcement.Check",
            Modify: "Personal.Announcement.Modify"
        }
    }
};


export class PermissionsObj {
    constructor() {
        // PermissionConfig
    }

    /**
     * @param value string
     * @param 返回值 true 表示有权限
     *              false 表示无权限
     */
    public trans(permissions: string[]): string[] {
        let result: string[] = Array<string>();
        for (let permission of permissions) {
            if (permission.indexOf("*") !== -1) {
                result = result.concat(this.collect(permission.split(".")));
            } else {
                result.push(permission);
            }
        }
        return result;
    }

    private collect(prePermissions: string[]): string[] {
        let Obj: any = "";
        let str: string[] = new Array<string>();
        for (let i = 0, len = prePermissions.length; i < len; i++) {
            if (i === 0) {
                Obj = (<any>Object).assign({}, PermissionsSet[prePermissions[i]]);
                continue;
            }
            if (prePermissions[i] === "*") {
            } else {
                Obj = Obj[prePermissions[i]];
            }
        }
        for (let $index in Obj) {
            str.push(Obj[$index]);
        }
        return str;
    }


    public judge(value: string): boolean {
        let permissions: string[] = session.getItem("pcode");
        for (let permission of permissions) {
            if (value === permission) {
                return true;
            }
        }
        return false;
    }
}

export const Permissions = new PermissionsObj();

export class PermissionsDirective {
    constructor() {
        this.init();
    }

    init() {
        // 注册
        Vue.directive("permissions", {
            bind: function (el: any, binding: any, vnode: any) {
                if (!Permissions.judge(binding.value)) {
                    el.style.display = "none";
                }
            },
            inserted: function () { },
            update: function () { },
            componentUpdated: function () { },
            unbind: function () { }
        });
    }
}
