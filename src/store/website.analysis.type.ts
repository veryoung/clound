export const WEBSITEANALYSISEVENT = {
    GETWEBSITEPANDECTDATA: "获取网站总览列表数据",
    GETWEBSITEPANDECTDETAIL: "获取网站总览详情",
    GETATTACKLOGDATA: "获取攻击日志列表数据",
    GETATTACKLOGDATADETAIL: "获取攻击日志详情",
    GETPANDECTDETAILATTACK: "获取总览详情攻击部分",
    GETPANDECTDETAILACCESS: "获取总览详情访问部分",
};

export interface WebsiteAnalysisType {
    AttackLogtableData: {
        [extra: string]: AttackLogTableType[];
    };
    WebsitePandecttableData: {
        [extra: string]: WebsitePandectTableType[];
    };
    WebsitePandectDetailattackData: {
        [extra: string]: WebsitePandectattackDetailType[];
    };
    WebsitePandectDetailaccessData: {
        [extra: string]: WebsitePandectaccessDetailType[];
    };
}

interface AttackLogTableType {
    aim_IP: string;
    aim_port: string;
    attcked_url: string;
    client: string;
    id: string;
    mate: string;
    referer: string;
    req_ID: string;
    req_body: string;
    req_header: string;
    req_length: string;
    res_code: string;
    res_header: string;
    resbody: string;
    results: string;
    source_IP: string;
    source_port: string;
    threat_level: string;
    time: string;
    trig_rule: string;
    website_add: string;
}

interface WebsitePandectTableType {
    ads_flux: string;
    ads_req: string;
    cc_attack: string;
    domain: string;
    id: string;
    level: number;
    name: string;
    web_attack: number;
}

interface WebsitePandectattackDetailType {
    level: string;
    tendency_attack: Object;
    top_ip: Array<Object>;
    top_location: Array<Object>;
    top_type: Array<Object>;
    total_cc: string;
    total_web: string;
}

interface WebsitePandectaccessDetailType {
    tendency_ip: Object;
    tendency_req_flow: Array<Object>;
    tendency_req_num: Array<Object>;
    top_location: Array<Object>;
    total_hit_flow: string;
    total_hit_num: string;
}

