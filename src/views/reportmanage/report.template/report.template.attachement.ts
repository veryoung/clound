import ElementUI from "element-ui";
import { Store } from "@store/store";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { MywebsiteServer } from "@server/mywebsite";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";


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

export class ReportTemplateManager {
    handleDel(row: ReportTemplateColumnType, opt: any) {
        ElementUI.MessageBox.confirm("删除网站后，网站不再提供防御服务，将有攻击风险，是否继续删除？", "提示").then(() => {
            MywebsiteServer.delWebsite(row.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        ElementUI.Notification({
                            title: "提示",
                            message: "删除成功",
                            type: "success"
                        });
                        Store.dispatch(MYWEBSITEEVENT.GETLISTMESSAGE, opt);
                        break;
                    default:
                        break;
                }
            });
        }).catch(() => {

        });
    }
}

export const ReportTemplateController = new ReportTemplateManager();