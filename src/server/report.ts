import { Restful } from "@server/index";

class Report extends Restful {
    constructor() {
        super();
    }


    delMyReport(id: string) {
        return this.del({
            url: "/api/v20/report/data/",
            params: {
                id: id
            }
        });
    }

    public reportData(opt: {
        report_id: string;
    }) {
        return this.get({
            url: `/middleware/create`,
            params: opt
        });
    }

    public createReport(opt: {
        // 报告id
        report_id?: string;
        // 报告模版id
        report_tmp_id?: string;
    }) {
        return this.get({
            url: `/middleware/create`,
            // url: `/api/v20/report/data/detail/`,
            params: Object.assign({
                // 攻击次数趋势			
                tendency_attack: "1",
                // ip访问次数趋势		
                tendency_ip: "1",
                // ip访问个数趋势
                tendency_pv: "1",
                // 引用趋势
                tendency_quote: "1",
                // 访问流量趋势		
                tendency_req_flow: "1",
                // 访问次数趋势
                tendency_req_num: "1",
                // 攻击IP分布 默认降序, 传数字代表top, "-"负号表示升序			
                top_ip: 10,
                // 攻击地域分布 默认降序, 传数字代表top, "-"负号表示升序
                top_att_location: 10,
                // 地域访问次数	
                top_acc_location: 10,
                // 被攻击网站次数分布
                top_site: 10,
                // 攻击类型分布 默认降序, 传数字代表top, "-"负号表示升序		
                top_type: 10,
                // cc攻击总数
                total_cc: "1",
                // 加速流量		
                total_hit_flow: "1",
                // 加速次数		
                total_hit_num: "1",
                // 拦截IP个数
                total_ip: "1",
                // 请求流量总数		
                total_req_flow: "1",
                // 访问总数
                total_req_num: "1",
                // web攻击总数		cc+web=总数
                total_web: "1"
            }, opt)
        });
    }

    public getReportList(opt: {
        count_cycle: string;
        count_obj: any;
        count_time: string[];
        name: string;
        pro_time: string[];
        rid: string;
    }) {
        return this.get({
            url: `/api/v20/report/data/`,
            params: opt
        });
    }

    public getTemplateList(opt: {
        create_time?: Array<string>;
        cycle?: string;
        keyword?: string;
        name?: string;
        run_status?: string;
    }) {
        return this.get({
            url: `/api/v20/report/`,
            params: opt
        });
    }

    public getReportTemplateDetail(opt: {
        id: string;
    }) {
        return this.get({
            url: `/api/v20/report/detail/`,
            params: {
                id: opt.id
            }
        });
    }

    public AddReport(opt: {
        cycle: string;
        cycle_range: Array<string>;
        indicators: Array<string>;
        name: string;
    }) {
        return this.post({
            url: `/api/v20/report/`,
            params: opt
        });
    }

    public DelReport(id: string) {
        return this.del({
            url: `/api/v20/report/`,
            params: {
                id: id
            }
        });
    }

    public EditReport(opt: {
        id: string;
        cycle: string;
        cycle_range: Array<string>;
        indicators: Array<string>;
        name: string;
    }) {
        return this.put({
            url: `/api/v20/report/`,
            params: opt
        });
    }
}

export const ReportService = new Report();