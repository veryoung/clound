import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import ElementUI from "element-ui";
import { Store } from "@store/store";
import { ReportService } from "@server/report";

// 变量名	含义	类型	备注
// cperson	创建人	string	
// domain	域名	string	
// name	网站名	string	
// open_waf	开启防御	string	1/0 开启/关闭
// organization	组织	string	
// port	端口	number	
// protocol	协议	string	HTTP/HTTPS
// source_info	回源地址	string	
// source_type	回源类型	string	
// state	状态	string	服务中/未接入/已到期
export default interface SearchType {
    name: string;
    count_cycle: string;
    count_obj: string;
    count_time: Array<string>;
    count_range: string;
    pro_time: Array<string>;
}

export const filterData: SearchType = {
    name: "",
    count_cycle: "",
    count_obj: "",
    count_time: ["", ""],
    pro_time: ["", ""],
    count_range: "",

};


// cname	cname别名	string	
// cperson	创建人		
// ctime	添加日期	string	yyyymmdd
// domain	网站域名	string	@mock=test.test.com
// id	网站id		
// is_delete	可删除		0-关闭;1-开启
// is_update	可编辑		0-关闭;1-开启
// label	网站名称	string	@mock=test_name
// open_waf	防御状态		直接显示
// organization	所属组织	string	@mock=org
// port		array<object>	
// service		array<object>	
// source_info	回源地址	array<string>	@mock=www.baidu.com
// source_type	回源方式	string	@mock=CNAME
// state	接入状态		直接显示
export interface WebsiteListColumnType {
    cname: string;
    cperson: string;
    ctime: string;
    domain: string;
    id: string;
    is_delete: string;
    is_update: string;
    name: string;
    open_waf: string;
    organization: string;
    port: Array<PortArray>;
    service: Array<ServiceArray>;
    source_info: string;
    source_type: string;
    state: string;
}

export interface PortArray {
    http: Array<number>;
    https: Array<number>;
}

export interface ServiceArray {
    ads_enable: number;
    cdn_enable: number;
    mirror_enable: number;
    waf_enable: number;
}

export interface WebSiteCompanyListType {
    [extra: string]: WebSiteListType;
}
export interface WebSiteListType {
    data: WebSiteStructure;
    total: number;
}

export interface WebSiteStructure {
    [extra: number]: Array<WebsiteListColumnType>;
}
interface ServerType {
    // cc / ddos 防御		0 - 关闭; 1 - 开启
    cdn_enable: string;
    ads_enable: string;
    mirror_enable: string;
    waf_enable: string;
}

interface PortType {
    // cc / ddos 防御		0 - 关闭; 1 - 开启
    http_port: Array<number>;
    https_port: Array<number>;
}


export class MyReportManager {
    handleDel(row: WebsiteListColumnType, opt: any) {
        ElementUI.MessageBox.confirm("是否确认删除？", "提示").then(() => {
            ReportService.delMyReport(row.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        ElementUI.Notification({
                            title: "提示",
                            message: "删除成功",
                            type: "success"
                        });
                        break;
                    default:
                        break;
                }
            });
        }).catch(() => {

        });
    }
}

export const MyReportManagerController = new MyReportManager();
