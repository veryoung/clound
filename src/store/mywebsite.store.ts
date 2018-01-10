import { Module } from "vuex";
import { MYWEBSITEEVENT, MyWebsiteType } from "@store/mywebsite.type";
import { TableServer } from "@server/table";
import { MywebsiteServer } from "@server/mywebsite";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { Store } from "@store/store";
import { EventBus, CONSTANT } from "@utils/event";
import { TABLECONFIG } from "@store/table.type";





export const MyWebsiteStore: Module<MyWebsiteType, any> = {
    state: (): MyWebsiteType => {
        return {
            websiteEdit: {
                "init": {
                    id: "",
                    // 别名	string	@mock=bcf30118.waf
                    cname: "",
                    // 创建人	string	
                    cperson: "",
                    // 接入时间	string	@mock=17-12-19 15:48:51
                    ctime: "",
                    // 防御状态	
                    open_waf: "",
                    // 域名	string	@mock=test.test.com	
                    domain: "",
                    // industry
                    industry: "",
                    // 网站名称	string	@mock=test_name		
                    name: "",
                    //     http_port	http端口	array<string>	
                    // https_port	https端口	array<string>	
                    port: {
                        // http端口	array < number > [80, 8081]
                        https_port: [0],
                        // https端口	array < number > [443]
                        http_port: [0]
                    },
                    // remark	备注	string	
                    remark: "",
                    service: {
                        ads_enable: "",
                        mirror_enable: "",
                        cdn_enable: "",
                        waf_enable: ""
                    },
                    // 回源地址	array<string>	@mock=www.baidu.com
                    source_info: [""],
                    // 回源类型	string	@mock=CNAME
                    source_type: "",
                    // 接入状态
                    state: "",
                }
            },
            websiteMessage: {
                "init": {
                    // 别名	string	@mock=bcf30118.waf
                    cname: "",
                    // 创建人	string	
                    cperson: "",
                    // 接入时间	string	@mock=17-12-19 15:48:51
                    ctime: "",
                    // 防御状态	
                    open_waf: "",
                    // 域名	string	@mock=test.test.com	
                    domain: "",
                    // industry
                    industry: "",
                    // 网站名称	string	@mock=test_name		
                    label: "",
                    //     http_port	http端口	array<string>	
                    // https_port	https端口	array<string>	
                    port: {
                        // http端口	array < number > [80, 8081]
                        http_port: [0],
                        // https端口	array < number > [443]
                        https_port: [0]
                    },
                    // remark	备注	string	
                    remark: "",
                    service: {
                        ads_enable: "",
                        mirror_enable: "",
                        cdn_enable: "",
                        waf_enable: ""
                    },
                    // 回源地址	array<string>	@mock=www.baidu.com
                    source_info: [""],
                    // 回源类型	string	@mock=CNAME
                    source_type: "",
                    // 接入状态
                    state: "",
                }
            },
            tableData: {
                "": [{
                    // cname别名	string	
                    cname: "",
                    // 创建人
                    cperson: "",
                    // 添加日期	string	yyyymmdd	
                    ctime: "",
                    // 网站域名	string	@mock=test.test.com
                    domain: "",
                    // 网站id
                    id: "",
                    // 可删除		0-关闭;1-开启	
                    is_delete: "",
                    // 可编辑		0-关闭;1-开启
                    is_update: "",
                    // 网站名称	string	@mock=test_name
                    name: "",
                    // 防御状态		直接显示
                    open_waf: "",
                    // 	所属组织	string	@mock=org
                    organization: "",
                    // 回源地址	array < string >	@mock=www.baidu.com
                    source_info: [""],
                    // 回源方式	string	@mock=CNAME
                    source_type: "",
                    // 	接入状态		直接显示
                    state: "",
                    port: {
                        http: [0],
                        https: [0]
                    },
                    service: {
                        cdn_enable: "",
                        ads_enable: "",
                        mirror_enable: "",
                        waf_enable: ""
                    }
                }]
            },
            websiteConfig: {
                "init": {
                    // CC开关	string	0-关闭;1-开启;不是该操作则不传
                    ads_enable: "",
                    // 缓存黑名单	string	@mock=cache_url_black
                    cache_url_black: "",
                    // 缓存url列表	array<string>	
                    cache_urls: [""],
                    // cdn开关	string	0-关闭;1-开启;不是该操作则不传
                    cdn_enable: "",
                    // 镜像开关	string	0-关闭;1-开启;不是该操作则不传	
                    mirror_enable: "",
                    // 	镜像周期		没有设置为-1
                    mirror_interval: -1,
                    // 镜像URL列表	array<string>	
                    mirror_urls: [""],
                    // waf开关	string	0-关闭;1-开启;不是该操作则不传
                    waf_enable: "",
                    // 防盗链白名单	array<string>	@mock=waf_hotlink_white
                    waf_hotlink_white: [""],
                    // 防火墙ip黑名单	array<string>	@mock=waf_ip_black
                    waf_ip_black: [""],
                    // 防火墙ip白名单	array<string>	@mock=waf_ip_white
                    waf_ip_white: [""],
                    // 防火墙url白名单	array<string>	@mock=waf_url_black
                    waf_url_black: [""],
                    // 防火墙url黑名单	array<string>	@mock=waf_url_white
                    waf_url_white: [""],
                }
            }
        };
    },

    mutations: {
        [MYWEBSITEEVENT.GETLISTMESSAGE]: (state, payload) => {
            if (!state.tableData[Math.floor(payload.page) - 1]) {
                state.tableData[Math.floor(payload.page) - 1] = [];
            }
            state.tableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [MYWEBSITEEVENT.GETWEBMESSAGE]: (state, payload) => {
            state.websiteMessage[payload.website_id] = payload.message;
        },
        [MYWEBSITEEVENT.GETWEBEDIT]: (state, payload) => {
            state.websiteEdit[payload.website_id] = payload.message;
        },
        [MYWEBSITEEVENT.GETWEBSITECONFIG]: (state, payload) => {
            state.websiteConfig[payload.website_id] = payload.message;
        }
    },
    actions: {
        [MYWEBSITEEVENT.GETLISTMESSAGE]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.tableData) {
                EventBus.doNotify(CONSTANT.GETLISTMESSAGE);
            }
            MywebsiteServer.getList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(MYWEBSITEEVENT.GETLISTMESSAGE, { page: payload.page, message: res.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "mywebsitetable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETLISTMESSAGE);
                        break;
                    default:
                        break;
                }
            });
        },
        [MYWEBSITEEVENT.GETWEBMESSAGE]: ({ state, commit, rootState }, payload) => {
            if (payload.website_id in state.websiteMessage) {
                EventBus.doNotify(CONSTANT.GETWEBMESSAGE, { website_id: payload.website_id });
            }
            MywebsiteServer.getWebsiteDetail(payload.website_id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(MYWEBSITEEVENT.GETWEBMESSAGE, { website_id: payload.website_id, message: res.data });
                        EventBus.doNotify(CONSTANT.GETWEBMESSAGE, { website_id: payload.website_id });
                        break;
                    default:
                        break;
                }
            });
        },
        [MYWEBSITEEVENT.GETWEBEDIT]: ({ state, commit, rootState }, payload) => {
            if (payload.website_id in state.websiteEdit) {
                EventBus.doNotify(CONSTANT.GETWEBEDIT, { website_id: payload.website_id });
            }
            MywebsiteServer.getWebsiteEditDetail(payload.website_id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(MYWEBSITEEVENT.GETWEBEDIT, { website_id: payload.website_id, message: res.data });
                        EventBus.doNotify(CONSTANT.GETWEBEDIT, { website_id: payload.website_id });
                        break;
                    default:
                        break;
                }
            });
        },
        [MYWEBSITEEVENT.GETWEBSITECONFIG]: ({ state, commit, rootState }, payload) => {
            if (payload.website_id in state.websiteConfig) {
                EventBus.doNotify(CONSTANT.GETWEBSITECONFIG, { website_id: payload.website_id });
            }
            MywebsiteServer.getWebsiteFnDate(payload.website_id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(MYWEBSITEEVENT.GETWEBSITECONFIG, { website_id: payload.website_id, message: res.data });
                        EventBus.doNotify(CONSTANT.GETWEBSITECONFIG, { website_id: payload.website_id });
                        break;
                    default:
                        break;
                }
            });
        },
    },
    getters: {
        "websiteMessage": function (state) {
            return state.websiteMessage;
        },
        "tableData": function (state) {
            return state.tableData;
        },
        "websiteEdit": function (state) {
            return state.websiteEdit;
        },
        "websiteConfig": function (state) {
            return state.websiteConfig;
        }
    }
};