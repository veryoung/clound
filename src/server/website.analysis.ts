import { Restful } from "@server/index";

class WebsiteAnalysis extends Restful {
    constructor() {
        super();
    }

    public getWebsitePandect(opt: {
        domain?: Array<string>;
        level?: string;
        name?: string;
    }) {
        return this.get({
            url: `/api/v20/dashboard/overview/`,
            params: opt
        });
    }
    // 获取网站总览攻击类详细信息
    public getAttackDetail(opt: {
        dt?: string;
        level?: string;
        site?: string;
        tendency_attack?: string;
        top_ip?: string;
        top_location?: string;
        top_type?: string;
        total_cc?: string;
        total_web?: string;
    }) {
        return this.get({
            url: `/api/v20/dashboard/attack/`,
            params: opt
        });
    }
    // 获取网站总览访问类详细信息
    public getAccessDetail(opt: {
        dt?: string;
        site?: string;
        tendency_ip?: string;
        tendency_req_flow?: string;
        tendency_req_num?: string;
        top_location?: string;
        total_hit_flow?: string;
        total_hit_num?: string;
    }) {
        return this.get({
            url: `/api/v20/dashboard/access/`,
            params: opt
        });
    }
    public getAttackLog(opt: {
        attack_type?: string;
        attacked_url?: string;
        attact_ip?: string;
        attact_ip_add?: string;
        end_time?: string;
        name?: string;
        results?: string;
        safe_level?: string;
        start_time?: string;
        website_id?: string;
    }) {
        return this.get({
            url: `/api/v20/dashboard/attack_log/`,
            params: opt
        });
    }

    public getAttackLogDetail(opt: {
        datetime?: string;
        rule_id?: string;
        site_id?: string;
        uri?: string;
    }) {
        return this.get({
            url: `/api/v20/dashboard/attack_detail/`,
            params: opt
        });
    }


}

export const WebsiteAnalysisServer = new WebsiteAnalysis();