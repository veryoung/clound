import { EventType } from "@store/store";

export const MYWEBSITEEVENT: EventType = {
    GETLISTMESSAGE: "获取我的网站列表数据",
    GETWEBMESSAGE: "获取网站详情",
    GETWEBEDIT: "获取网站编辑信息",
    GETWEBSITECONFIG: "获取网站配置信息",
    MIRRORSETUPATE: "网站配置信息镜像配置更新"
};

export interface MyWebsiteType {
    tableData: WebsiteTableType;
    websiteMessage: WebType;
    websiteEdit: WebEditType;
    websiteConfig: WebSiteConfig;
}

export interface WebType {
    [extra: string]: WebMessageType;
}

export interface WebEditType {
    [extra: string]: WebEditMessageType;
}

export interface WebSiteConfig {
    [extra: string]: WebSiteConfigType;
}

interface WebSiteConfigType {
    // CC开关	string	0-关闭;1-开启;不是该操作则不传
    ads_enable: string;
    // 缓存黑名单	string	@mock=cache_url_black
    cache_url_black: string;
    // 缓存url列表	array<string>	
    cache_urls: string[];
    // cdn开关	string	0-关闭;1-开启;不是该操作则不传
    cdn_enable: string;
    // 镜像开关	string	0-关闭;1-开启;不是该操作则不传	
    mirror_enable: string;
    // 	镜像周期		没有设置为-1
    mirror_interval: number;
    // 镜像URL列表	array<string>	
    mirror_urls: string[];
    // waf开关	string	0-关闭;1-开启;不是该操作则不传
    waf_enable: string;
    // 防盗链白名单	array<string>	@mock=waf_hotlink_white
    waf_hotlink_white: string[];
    // 防火墙ip黑名单	array<string>	@mock=waf_ip_black
    waf_ip_black: string[];
    // 防火墙ip白名单	array<string>	@mock=waf_ip_white
    waf_ip_white: string[];
    // 防火墙url白名单	array<string>	@mock=waf_url_black
    waf_url_black: string[];
    // 防火墙url黑名单	array<string>	@mock=waf_url_white
    waf_url_white: string[];
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
    open_waf: string;
    // 域名	string	@mock=test.test.com	
    domain: string;
    // industry
    industry: string;
    // 网站名称	string	@mock=test_name		
    name: string;
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
    open_waf: string;
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

export interface WebsiteTableType {
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
    name: string;
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
    // http端口	array < string > [80, 8081]
    http_port?: number[];
    // https端口	array < string > [443]
    https_port?: number[];
    http?: number[];
    https?: number[];
}
interface ServerType {
    // cc / ddos 防御		0 - 关闭; 1 - 开启
    cdn_enable: string;
    ads_enable: string;
    mirror_enable: string;
    waf_enable: string;
}