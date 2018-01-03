import { Module } from "vuex";
import { MYWEBSITEEVENT, MyWebsiteType } from "@store/mywebsite.type";
import { TableServer } from "@server/table";
import { MywebsiteServer } from "@server/mywebsite";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { Store } from "@store/store";
import { EventBus, CONSTANT } from "@utils/event";
import { TABLECONFIG } from "@store/table.type";





export const OrganizationStore: Module<MyWebsiteType, any> = {
    state: (): MyWebsiteType => {
        return {
            websiteMessage: {
                "init": {
                    id: "",
                    // string	@mock=bcf30118.waf
                    cname: "",
                    // string	@mock=17-12-19 15:48:51
                    domain: "",
                    // 	
                    service: {
                        cdn_enable: "",
                        ads_enable: "",
                        mirror_enable: "",
                        waf_enable: ""
                    },
                    // array<number>	@mock=80
                    http_port: [0],
                    // array<number>	@mock=443
                    https_port: [0],
                    // string;
                    label: "",
                    organization: "",
                    source_info: "",
                    source_type: "",
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
                    label: "",
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
                        EventBus.doNotify(CONSTANT.GETLISTMESSAGE, { website_id: payload.website_id });
                        break;
                    default:
                        break;
                }
            });
        }
    },
    getters: {
        "websiteMessage": function (state) {
            return state.websiteMessage;
        },
        "tableData": function (state) {
            return state.tableData;
        }
    }
};