import { EventType } from "@store/store";

export const MYWEBSITEEVENT: EventType = {
    GETLISTMESSAGE: "获取我的网站列表数据",
    GETWEBMESSAGE: "获取网站详情",
    GETWEBEDIT: "获取网站编辑信息"
};

export interface MyWebsiteType {
    tableData: WebsiteTableType;
    websiteMessage: WebType;
    websiteEdit: WebEditType;
}

export interface WebType {
    [extra: string]: WebMessageType;
}

export interface WebEditType {
    [extra: string]: WebEditMessageType;
}

interface WebEditMessageType {
    id?: string;
    // 别名	string	@mock=bcf30118.waf
    cname: string;
    // 创建人	string	
    cperson: string;
    // 接入时间	string	@mock=17-12-19 15:48:51
    ctime: string;
    // 防御状态	
    defense_state: string;
    // 域名	string	@mock=test.test.com	
    domain: string;
    // industry
    industry: string;
    // 网站名称	string	@mock=test_name		
    label: string;
    //     http_port	http端口	array<string>	
    // https_port	https端口	array<string>	
    port: PortType;
    // remark	备注	string	
    remark: string;
    service: ServerType;
    // 回源地址	array<string>	@mock=www.baidu.com
    source_info: string[];
    // 回源类型	string	@mock=CNAME
    source_type: string;
    // 接入状态
    state: string;
}
interface WebMessageType {
    // 别名	string	@mock=bcf30118.waf
    cname: string;
    // 创建人	string	
    cperson: string;
    // 接入时间	string	@mock=17-12-19 15:48:51
    ctime: string;
    // 防御状态	
    defense_state: string;
    // 域名	string	@mock=test.test.com	
    domain: string;
    // industry
    industry: string;
    // 网站名称	string	@mock=test_name		
    label: string;
    //     http_port	http端口	array<string>	
    // https_port	https端口	array<string>	
    port: PortType;
    // remark	备注	string	
    remark: string;
    service: ServerType;
    // 回源地址	array<string>	@mock=www.baidu.com
    source_info: string[];
    // 回源类型	string	@mock=CNAME
    source_type: string;
    // 接入状态
    state: string;
}

interface WebsiteTableType {
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