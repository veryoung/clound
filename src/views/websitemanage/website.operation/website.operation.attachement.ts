// 变量名	含义	类型	备注 cid	证书密钥id	string	这个由上传证书获得 domain	网站域名	string	eg:
// test.baidu.com http_port	http端口	array<number>	http 端口数组 eg: [80, 8080]
// https_port	https 端口	array<number>	https 端口数组 eg: [443, 445]
// industry	行业	string	直接传显示值 name	网站名	string open_waf	是否开启防御	string	0-关闭;-开启
// source_info	源ip或源域名	array<string>	IP或域名数组 eg: ["a.baidu.com", "b.baidu.com"]
// source_type	回源类型	string	A/CNAME

export default interface FormType {
    cid: string;
    domain: string;
    http_port: Array < number >;
    https_port: Array < number >;
    industry: string;
    name: string;
    open_waf: number;
    source_info: Array < string >;
    source_type: string;
}
