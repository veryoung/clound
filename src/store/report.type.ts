export const REPORTEVENT = {
    GETREPORTTEMPLATELIST: "获取报告模板列表",
    GETREPORTTEMPLATELISTGETLISTMESSAGE: "获取报告模板列表数据",
};

export interface ReportType {
    tableData: {
        [extra: string]: ReportTableType[];
    };
}

interface ReportTableType {
    create_time: string;
    cycle: string;
    domain_names: string;
    id?: number | string;
    name: string;
    status?: boolean| string;
}