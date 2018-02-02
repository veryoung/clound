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
    /************************* 系统管理 ****************************/
    // # 系统管理
    // ## 用户管理
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
    // ## 组织机构
    // 显示组织详情
    "SystemManagement.Organization.Check",
    // 添加组织信息
    "SystemManagement.Organization.Add",
    // 删除组织信息
    "SystemManagement.Organization.Delete",
    // 更新组织信息
    "SystemManagement.Organization.Edit",
    // ## 角色管理
    // 查看
    "SystemManagement.RoleManagement.Check",
    // 添加
    "SystemManagement.RoleManagement.Add",
    // 删除
    "SystemManagement.RoleManagement.Delete",
    // 编辑
    "SystemManagement.RoleManagement.Edit",
    // 权限查看
    "SystemManagement.RoleManagement.PermissionView",
    // ## 日志审计
    // 查看
    "SystemManagement.LogAudit.Check",
    // 下载
    "SystemManagement.LogAudit.Download",
    // ## 站内公告
    // 查看
    "SystemManagement.NoticeManagement.Notice.Check",
    // 添加
    "SystemManagement.NoticeManagement.Notice.Add",
    // 删除
    "SystemManagement.NoticeManagement.Notice.Delete",
    // 编辑
    "SystemManagement.NoticeManagement.Notice.Edit",
    // ## 邮件通知
    // 查看
    "SystemManagement.NoticeManagement.MailNotification.Check",
    // 添加
    "SystemManagement.NoticeManagement.MailNotification.Add",
    // 删除
    "SystemManagement.NoticeManagement.MailNotification.Delete",
    // ## 短信通知
    // 查看
    "SystemManagement.NoticeManagement.SMSNotification.Check",
    // 添加
    "SystemManagement.NoticeManagement.SMSNotification.Add",
    // 删除
    "SystemManagement.NoticeManagement.SMSNotification.Delete",
    /*******************************态势感知*************************/
    // # 态势感知
    // 概括
    "SituationalAwareness.Generalization",
    // 网站态势
    "SituationalAwareness.WebsiteSituation",
    // 攻击趋势
    "SituationalAwareness.AttackTrend",
    // 被攻击网站TOP5
    "SituationalAwareness.AttackedWebsiteTOP5",
    // 攻击源地域TOP5
    "SituationalAwareness.AttackSourceRegionTOP5",
    // 地图
    "SituationalAwareness.Map",
    // 实时攻击信息
    "SituationalAwareness.RealTimeAttackInformation",
    /************************个人中心****************************/
    // # 个人中心
    // ## 公告通知
    // 查看
    "Personal.Announcement.Check",
    // 修改
    "Personal.Announcement.Modify",
    /********************************网站管理************************* */
    // # 网站管理
    // ## 我的网站
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
    "WebsiteManagement.MyWebsite.Delete",
    /*************************主页*********************/
    // # 主页
    // 接入企业用户总数 
    "Home.AccessUsersTotal",
    // 接入网站总数
    "Home.AccessSitesTotal",
    // 服务到期提醒
    "Home.ServiceReminding",
    // 最近7天添加网站
    "Home.AddWebsiteLast7",
    // 今日高危网站
    "Home.TodayHighRiskWebsite",
    // 最近7天退出网站  
    "Home.ExitWebsiteLast7",
    /************************网站分析************************/
    // # 分析
    // ## 网站总览
    "WebsiteAnalysis.WebOverview.SecurityRating", // 安全评级
    "WebsiteAnalysis.WebOverview.TrendOfAttack", // 攻击次数趋势
    "WebsiteAnalysis.WebOverview.AttackTypeDistribution", // 攻击类型分布
    "WebsiteAnalysis.WebOverview.AttackSourceRegionTOP10", // 攻击源地域TOP10
    "WebsiteAnalysis.WebOverview.AttackIPTOP10", // 攻击IPTOP10
    "WebsiteAnalysis.WebOverview.AccessTrafficTrend", // 访问流量趋势
    "WebsiteAnalysis.WebOverview.AccessTimesTrend", // 访问次数趋势
    "WebsiteAnalysis.WebOverview.AccessIPTrend", // IP访问次数趋势
    "WebsiteAnalysis.WebOverview.regionalVisitsTOP10", // 地域访问次数TOP10
    "WebsiteAnalysis.WebOverview.SiteTrafficTOP10", // 地域网站流量TOP10
    /************************攻击日志************************/
    // # 攻击日志
    "AttackLog.Check", // 查看
    "AttackLog.ExportSelection", // 导出选中
    "AttackLog.ExportAll", // 导出所有
    "AttackLog.AttackDetails", // 攻击详情
    /************************报告管理************************/
    // # 报告管理
    // ## 我的报告
    // 查看
    "ReportManagement.Myreport.Check",
    // 下载
    "ReportManagement.Myreport.Download",
    // 删除
    "ReportManagement.Myreport.Delete",
    // ## 报告模板
    // 查看
    "ReportManagement.Reporttemplate.Check",
    // 添加
    "ReportManagement.Reporttemplate.Add",
    // 编辑
    "ReportManagement.Reporttemplate.Edit",
    // 删除
    "ReportManagement.Reporttemplate.Delete",
    // 生成报告
    "ReportManagement.Reporttemplate.GenerationReport",
    /************************运维管理************************/
    // # 运维管理
    // ## 我的节点
    // 查看
    "OperationsManagement.MyNode.Check",
    // 添加
    "OperationsManagement.MyNode.Add",
    // 编辑
    "OperationsManagement.MyNode.Edit",
    // 删除
    "OperationsManagement.MyNode.Delete",
    // ## 节点状态
    // 节点服务状态
    "OperationsManagement.NodeState.NodeServiceState",
    // 节点资产状态
    "OperationsManagement.NodeState.NodeAssetsState"


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
