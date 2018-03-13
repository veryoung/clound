import ElementUI from "element-ui";
import { Store } from "@store/store";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { MywebsiteServer } from "@server/mywebsite";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { ReportService } from "@server/report";
import { REPORTEVENT } from "@store/report.type";


export default interface ReportTemplateSearchType {
    name: string;
    count_cycle: string;
    run_status: string;
    create_time: Array<string>;
    count_range: string;
}

export const filterData: ReportTemplateSearchType = {
    name: "",
    count_cycle: "",
    run_status: "",
    create_time: ["", ""],
    count_range: "",
};

export interface ReportTemplateColumnType {
    create_time: string;
    cycle: string;
    domain_names: string;
    id: string;
    name: string;
    status: boolean;
}
