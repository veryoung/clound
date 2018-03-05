export const REPORTEVENT = {
    GETREPORTTEMPLATELIST: "获取报告模板列表",
    GETREPORDETAIL: "获取报告模板详情数据",
    GETREPORTLIST: "获取报告列表"
};

export interface ReportType {
    tableData: {
        [extra: string]: ReportTableType[];
    };
    reportList: {
        [extra: string]: {
            count_cycle: string;
            count_obj: any;
            count_time: string[];
            name: string;
            pro_time: string[];
            rid: string;
        }[];
    };
    reportTemplateDetail: {
        [extra: string]: {
            cycle: string;
            cycle_range: string[];
            indicators: string[];
            name: string;
        }
    };
}

interface ReportTableType {
    create_time: string;
    cycle: string;
    domain_names: string;
    id?: number | string;
    name: string;
    status?: boolean | string;
}