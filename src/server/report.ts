import { Restful } from "@server/index";

class Report extends Restful {
    constructor() {
        super();
    }

    public getReportList(opt: {
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

    public AddReport(opt: {
        cycle: string;
        cycle_range: Array<string>;
        indicators: Array<string>;
        name: string;
    }) {
        return this.del({
            url: `/api/v20/report/`,
            params: opt
        });
    }

    public DelReport(opt: {
        id?: string;
    }) {
        return this.del({
            url: `/api/v20/report/`,
            params: opt
        });
    }

    public EditReport(opt: {
        id?: string;
    }) {
        return this.put({
            url: `/api/v20/report/`,
            params: opt
        });
    }
}

export const ReportService = new Report();