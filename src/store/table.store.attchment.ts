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
                type: "website_server"
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
                prop: "访问时间",
                label: "op_time",
                show: true,
            },
            {
                prop: "访问用户",
                label: "user",
                show: true,
            },
            {
                prop: "用户邮箱",
                label: "email",
                show: true,
            },
            {
                prop: "访问IP",
                label: "ip",
                show: true,
            },
            {
                prop: "操作类型",
                label: "op_type",
                show: true,
            },
            {
                prop: "操作详情",
                label: "op_detail",
                show: true,
            },
            {
                prop: "操作结果",
                label: "op_ret",
                show: true,
            },
        ],
        pageSizes: [10, 20, 30, 40, 50],
        page_size: 10,
        page: 1,
        total: 1
    }
};
