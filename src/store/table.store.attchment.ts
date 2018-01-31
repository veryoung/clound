import { TableConfigType } from "@store/table.type";
 
export const systemTable: TableConfigType = {
    "usertable": {
        columns: [
            {
                prop: "uid",
                label: "用户id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                prop: "user_name",
                label: "用户名",
                show: true,
                disable: true
            },
            {
                prop: "role",
                label: "用户角色",
                show: true,
                disable: true
            },
            {
                prop: "cperson",
                label: "创建人",
                show: true
            },
            {
                prop: "company",
                label: "企业名称",
                show: true
            },
            {
                prop: "phone",
                label: "手机号码",
                show: true
            },
            {
                prop: "email",
                label: "邮箱",
                show: true
            },
            {
                prop: "ctime",
                label: "创建时间",
                type: "date",
                show: true,
                sortable: "custom",
                width: "125px"
            },
            {
                prop: "expiry_date",
                label: "到期时间",
                type: "date",
                show: true,
                sortable: "custom",
                width: "125px"
            },
            {
                prop: "is_active",
                label: "状态",
                show: true,
                disable: true,
                width: "130px"
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    "mywebsitetable": {
        columns: [
            {
                prop: "name",
                label: "网站名称",
                show: true,
                disable: true,

            },
            {
                prop: "domain",
                label: "网站域名",
                show: true,
                disable: true,

            },
            {
                prop: "cperson",
                label: "创建人",
                show: true,
            },
            {
                prop: "organization",
                label: "所属企业",
                show: true

            },
            {
                prop: "port",
                label: "协议类型",
                type: "website_port",
                show: true
            },
            {
                prop: "source_type",
                label: "回源方式",
                show: true
            },
            {
                prop: "source_info",
                label: "回源地址",
                show: true,
                type: "source_info"
            },
            {
                prop: "cname",
                label: "CNAME别名",
                show: true,
                width: "105px"
            },
            {
                prop: "ctime",
                label: "创建时间",
                show: true,
                type: "date",
                sortable: "custom",
                width: "100px"
            },
            {
                prop: "open_waf",
                label: "防御状态",
                show: true,
                disable: true,
            },
            {
                prop: "service",
                label: "服务项",
                show: true,
                type: "website_server",
                width: "150px"

            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 网站总览列表
    "websitepandecttable": {
        columns: [
            {
                prop: "name",
                label: "网站名称",
                show: true

            },
            {
                prop: "domain",
                label: "网站域名",
                show: true

            },
            {
                prop: "organization",
                label: "所属企业",
                show: true

            },
            {
                prop: "organization",
                label: "安全评级",
                show: true
            },
            {
                prop: "organization",
                label: "今日Web攻击",
                show: true,
                sortable: "custom",
            },
            {
                prop: "organization",
                label: "今日CC攻击",
                show: true,
                sortable: "custom",

            },
            {
                prop: "organization",
                label: "今日加速请求",
                show: true,
                sortable: "custom",

            },
            {
                prop: "organization",
                label: "今日加速请求",
                show: true,
                sortable: "custom",

            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 攻击日志列表
    "attacklogtable": {
        columns: [{
            prop: "ctime",
            label: "时间",
            show: true,
        },
        {
            prop: "name",
            label: "网站名称",
            show: true

        },
        {
            prop: "domain",
            label: "网站域名",
            show: true

        },
        {
            prop: "attackedUrl",
            label: "被攻击URL",
            show: true

        },
        {
            prop: "attactIP",
            label: "攻击IP",
            show: true
        },
        {
            prop: "attactIPadd",
            label: "攻击IP归属地",
            show: true,
            sortable: "custom",
        },
        {
            prop: "attack_type",
            label: "攻击类型",
            show: true,
            sortable: "custom",

        },
        {
            prop: "safe_level",
            label: "安全级别",
            show: true,
            sortable: "custom",

        },
        {
            prop: "results",
            label: "处理结果",
            show: true,
            sortable: "custom",
        },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 日志审计列表
    "logautdittable": {
        columns: [
            {
                label: "访问时间",
                prop: "op_time",
                show: true,
                type: "dateTime",
                sortable: "custom",
                width: "180px",
                disable: true
            },
            {
                label: "访问用户",
                prop: "username",
                show: true,
                disable: true
            },
            {
                label: "用户邮箱",
                prop: "email",
                show: true,
            },
            {
                label: "访问IP",
                prop: "ip",
                show: true,
            },
            {
                label: "操作类型",
                prop: "op_type",
                show: true,
            },
            {
                label: "操作详情",
                prop: "op_detail",
                show: true,
                disable: true
            },
            {
                label: "操作结果",
                prop: "op_ret",
                show: true,
                disable: true
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 邮件通知列表
    "emailtable": {
        columns: [
            {
                label: "id",
                prop: "id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                label: "邮件标题",
                prop: "object",
                show: true,
            },
            {
                label: "收件人",
                prop: "receiver",
                show: true,
            },
            {
                label: "发送方式",
                prop: "send_type",
                show: true,
            },
            {
                label: "发送人",
                prop: "sender",
                show: true,
            },
            {
                label: "发送日期",
                prop: "send_date",
                show: true,
            },
            {
                label: "发送状态",
                prop: "status",
                show: true,
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 短信通知列表
    "msgtable": {
        columns: [
            {
                label: "id",
                prop: "id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                label: "邮件标题",
                prop: "object",
                show: true,
            },
            {
                label: "接收人",
                prop: "receiver",
                show: true,
            },
            {
                label: "发送日期",
                prop: "send_date",
                show: true,
            },
            {
                label: "操作类型",
                prop: "send_type",
                show: true,
            },
            {
                label: "发送人",
                prop: "sender",
                show: true,
            },
            {
                prop: "发送状态",
                label: "status",
                show: true,
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 最新公告通知列表
    "noticetable": {
        columns: [
            {
                label: "id",
                prop: "id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                label: "发布人",
                prop: "cperson",
                show: true,
            },
            {
                label: "公告内容",
                prop: "content",
                show: true,
                type: "htmlData"
            },
            {
                label: "公告标题",
                prop: "title",
                show: true,
            }
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 我的报告列表
    "myreporttable": {
        columns: [
            {
                label: "id",
                prop: "id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                label: "报告名称",
                prop: "name",
                show: true,
            },
            {
                label: "统计周期",
                prop: "count_cycle",
                show: true,
            },
            {
                label: "统计对象",
                prop: "count_obj",
                show: true,
            },
            {
                label: "统计时间",
                prop: "count_time",
                show: true,
            },
            {
                label: "生成时间",
                prop: "pro_time",
                show: true,
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    },
    // 报告模板
    "reporttemplatetable": {
        columns: [
            {
                label: "id",
                prop: "id",
                show: false,
                disable: true,
                nonexit: true
            },
            {
                label: "模板名称",
                prop: "name",
                show: true,
            },
            {
                label: "统计周期",
                prop: "count_cycle",
                show: true,
            },
            {
                label: "统计范围",
                prop: "count_range",
                show: true,
            },
            {
                label: "添加时间",
                prop: "create_time",
                show: true,
            },
            {
                label: "执行状态",
                prop: "run_status",
                show: true,
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    }
};
