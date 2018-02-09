export const WEBSITEANALYSISEVENT = {
    GETATTACKLOGDATA: "获取攻击日志列表数据",
    GETATTACKLOGDATADETAIL: "获取攻击日志详情",
};

export interface WebsiteAnalysisType {
    AttackLogtableData: {
        [extra: string]: AttackLogTableType[];
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


