import Vue from "vue";
import { session } from "@utils/sessionstorage";
import { PermissionConfig } from "@directives/p.config";
import { Store } from "@store/store";

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

export const PermissionsSet: string[] = [
    // 系统管理
    // 用户管理
    // 显示用户详情
    "SystemManagement.userManagement.Detail",
    // 添加用户
    "SystemManagement.userManagement.Add",
    // 删除用户
    "SystemManagement.userManagement.Delete",
    // 编辑用户
    "SystemManagement.userManagement.Edit",
    // 导入用户信息列表
    "SystemManagement.userManagement.Check",
    // 导出选中用户信息列表
    "SystemManagement.userManagement.ExportSelection",
    // 导出当前过滤条件用户信息列表
    "SystemManagement.userManagement.ExportAll",
    "SystemManagement.userManagement.ResetPassword",
    // 组织机构
    // 显示组织详情
    "SystemManagement.Organization.Check",
    // 添加组织信息
    "SystemManagement.Organization.Add",
    // 删除组织信息
    "SystemManagement.Organization.Delete",
    // 更新组织信息
    "SystemManagement.Organization.Edit",
    // 个人中心
    // 公告通知
    // 查看
    "Personal.Announcement.Check",
    // 修改
    "Personal.Announcement.Modify",
    // 网站管理
    // 我的网站
    // 查看
    "WebsiteManagement.MyWebsite.Check",
    // 添加
    "WebsiteManagement.MyWebsite.Add",
    // 开启防御
    "WebsiteManagement.MyWebsite.OpenDefense",
    // 批量回源
    "WebsiteManagement.MyWebsite.BatchReturn",
    // 导出选中
    "WebsiteManagement.MyWebsite.ExportSelection",
    // 设置
    "WebsiteManagement.MyWebsite.Set",
    // 详情
    "WebsiteManagement.MyWebsite.Details",
    // 编辑
    "WebsiteManagement.MyWebsite.Edit",
    // 删除
    "WebsiteManagement.MyWebsite.Delete"
];


export class PermissionsObj {
    constructor() {
        // PermissionConfig
    }

    /**
     * @param value string
     * @param 返回值 true 表示有权限
     *              false 表示无权限
     */
    public collect(sources: string[]): string[] {
        let target: string[] = [];
        sources.map((source, $index) => {
            let reg: RegExp = new RegExp(`^${source}$`);
            PermissionsSet.map((item, i) => {
                if (reg.test(item)) {
                    target.push(item);
                }
            });
        });
        return target;
    }




    public judge(value: string): boolean {
        let permissions: string[] = session.getItem("pcode");
        if (permissions === null) {
            return false;
        }
        for (let permission of permissions) {
            if (permission.indexOf(value) !== -1) {
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
