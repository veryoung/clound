export const PermissionConfig: any = {
    // 主页
    "Home": [
        "AccessUsersTotal", // 接入企业用户总数    
        "AccessSitesTotal", // 接入网站总数
        "ServiceReminding", // 服务到期提醒
        "AddWebsiteLast7", // 最近7天添加网站
        "TodayHighRiskWebsite", // 今日高危网站
        "ExitWebsiteLast7" // 最近7天退出网站    
    ],
    // 网站分析
    "WebsiteAnalysis": {
        // 网站总览
        "WebOverview": [
            "SecurityRating", // 安全评级
            "TrendOfAttack", // 攻击次数趋势
            "AttackTypeDistribution", // 攻击类型分布
            "AttackSourceRegionTOP10", // 攻击源地域TOP10
            "AttackIPTOP10", // 攻击IPTOP10
            "AccessTrafficTrend", // 访问流量趋势
            "AccessTimesTrend", // 访问次数趋势
            "AccessIPTrend", // IP访问次数趋势
            "regionalVisitsTOP10", // 地域访问次数TOP10
            "SiteTrafficTOP10" // 地域网站流量TOP10  
        ],
        // 攻击日志
        "AttackLog": [
            "Check", // 查看
            "ExportSelection", // 导出选中
            "ExportAll", // 导出所有
            "AttackDetails" // 攻击详情
        ]
    },
    // 网站管理
    "WebsiteManagement": {
        // 我的网站
        "MyWebsite": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 开启防御
            "OpenDefense",
            // 批量回源
            "BatchReturn",
            // 导出选中
            "ExportSelection",
            // 设置
            "Set",
            // 详情
            "Details",
            // 编辑
            "Edit",
            // 删除
            "Delete"
        ],
        // 网站策略
        "Website Strategy": [
            // 查看
            // 添加
            "Add",
            // 编辑
            "Edit",
            // 删除
            "Delete"
        ],
        // 全局黑白名单
        "GlobalBlackWhiteList": [
            // 查看
            "Check",
            // 保存（包含增删改）
            "Save"
        ]
    },
    // 报告管理
    "ReportManagement": {
        // 我的报告
        "My report": [
            // 查看
            "Check",
            // 下载
            "Download",
            // 删除
            "Delete"
        ],
        // 报告模板
        "Report template": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 编辑
            "Edit",
            // 删除
            "Delete",
            // 生成报告
            " GenerationReport"
        ]
    },
    // 运维管理
    "OperationsManagement": {
        // 我的节点
        "MyNode": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 编辑
            "Edit",
            // 删除
            "Delete"
        ],
        // 节点状态
        "NodeState": [
            // 节点服务状态
            "NodeServiceState",
            // 节点资产状态
            "NodeAssetsState"
        ]
    },
    // 系统管理
    "SystemManagement": {
        // 用户管理
        "userManagement": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete",
            // 编辑
            "Edit",
            // 导入
            "Import",
            // 导出选中
            "ExportSelection",
            // 导出所有
            "ExportAll",
            // 重置密码
            "ResetPassword"
        ],
        // 组织机构
        "Organization": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete",
            // 编辑
            "Edit"
        ],
        // 角色管理
        "RoleManagement": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete",
            // 编辑
            "Edit",
            // 权限查看
            "PermissionView"
        ],
        // 日志审计
        "LogAudit": [
            // 查看
            "Check",
            // 下载
            "Download"
        ],
        // 站内公告
        "Notice": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete",
            // 编辑
            "Edit"
        ],
        // 邮件通知
        "MailNotification": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete"
        ],
        // 短信通知
        "SMSNotification": [
            // 查看
            "Check",
            // 添加
            "Add",
            // 删除
            "Delete"
        ]
    },
    // 态势感知
    "SituationalAwareness": [
        // 概括
        "Generalization",
        // 网站态势
        "WebsiteSituation",
        // 攻击趋势
        "AttackTrend",
        // 被攻击网站TOP5
        "AttackedWebsiteTOP5",
        // 攻击源地域TOP5
        "AttackSourceRegionTOP5",
        // 地图
        "Map",
        // 实时攻击信息
        "RealTimeAttackInformation"
    ],
    // 个人中心
    "Personal": {
        // 公告通知
        "Announcement": [
            // 查看
            "Check",
            // 修改密码
            "Modify"
        ]
    }
};