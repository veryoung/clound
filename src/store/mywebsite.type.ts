import { EventType } from "@store/store";

export const MYWEBSITEEVENT: EventType = {
    GETLISTMESSAGE: "获取我的网站列表数据",
    GETWEBMESSAGE: "获取网站详情",
    GETWEBEDIT: "获取网站编辑信息"
};

export interface MyWebsiteType {
    tableData: TableType;
    websiteMessage: WebType;
    websiteEdit: WebEditType;
}

interface WebType {
    [extra: string]: WebMessageType;
}

interface WebEditType {
    [extra: string]: WebEditMessageType;
}

interface WebEditMessageType {
    // 防御状态
    defense_state: string;
    // 域名	string	@mock=test.test.com
    domain: string;
    // id
    id: string;
    //     行业
    industry: string;
    // 网站名称	string	@mock=test_name
    label: string;
    // port
    port: any;
    // http端口	array < string >;
    http_port: string[];
    // https端口	array < string >
    https_port: string[];
    // 	备注
    remark: string;
    // 回源地址	array < string >	@mock=www.baidu.com
    source_info: string[];
    // 回源类型	string	@mock=CNAME
    source_type: string;
}
interface WebMessageType {
    id?: string;
    // string	@mock=bcf30118.waf
    cname: string;
    // string	@mock=17-12-19 15:48:51
    domain: string;
    // 	
    service: ServerType;
    // array<number>	@mock=80
    http_port: number[];
    // array<number>	@mock=443
    https_port: number[];
    // string;
    label: string;
    organization: string;
    source_info: string;
    source_type: string;
}

interface TableType {
    [extra: string]: TableCloums[];
}
interface TableCloums {
    // cname别名	string	
    cname: string;
    // 创建人
    cperson: string;
    // 添加日期	string	yyyymmdd	
    ctime: string;
    // 网站域名	string	@mock=test.test.com
    domain: string;
    // 网站id
    id: string;
    // 可删除		0-关闭;1-开启	
    is_delete: string;
    // 可编辑		0-关闭;1-开启
    is_update: string;
    // 网站名称	string	@mock=test_name
    label: string;
    // 防御状态		直接显示
    open_waf: string;
    // 	所属组织	string	@mock=org
    organization: string;
    // 回源地址	array < string >	@mock=www.baidu.com
    source_info: string[];
    // 回源方式	string	@mock=CNAME
    source_type: string;
    // 	接入状态		直接显示
    state: string;
    port: PortType;
    service: ServerType;
}

interface ObjType {
    [extra: string]: string;
}
interface PortType {
    // http端口	array < number > [80, 8081]
    http: number[];
    // https端口	array < number > [443]
    https: number[];
}
interface ServerType {
    // cc / ddos 防御		0 - 关闭; 1 - 开启
    cdn_enable: string;
    ads_enable: string;
    mirror_enable: string;
    waf_enable: string;
}