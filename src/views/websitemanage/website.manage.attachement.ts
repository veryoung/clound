import ElementUI from "element-ui";
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
    cperson: string;
    domain?: string;
    name: string;
    open_waf: string;
    organization: string;
    port: number;
    protocol: string;
    source_info?: string;
    source_type?: string;
    state?: string;
}

export const filterData: SearchType = {
    cperson: "",
    domain: "",
    name: "",
    open_waf: "",
    organization: "",
    port: 80,
    protocol: "",
    source_info: "",
    source_type: "",
    state: "",
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


export interface WebListColumnType {
    company: string;
    cperson: string;
    ctime: string;
    email: string;
    expiry_date: string;
    is_active: string;
    is_delete: string;
    is_edite: string;
    phone: string;
    role: string;
    user_name: string;
    uid: string;
}

export class WebsiteManager {
    handleDel(row: WebListColumnType) {
        ElementUI.MessageBox.confirm("确定要删除嘛？", "提示").then(() => {
            // UserServer.delUser(row.uid).then((response: AxiosResponse<ResType>) => {
            //     let res: ResType = response.data;
            //     switch (res.status) {
            //         case "suc":
            //             ElementUI.Message({
            //                 message: "删除成功",
            //                 type: "success"
            //             });
            //             break;
            //         default:
            //             break;
            //     }
            // });
        }).catch(() => {

        });
    }
}