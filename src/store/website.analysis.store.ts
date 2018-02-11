import { WebsiteAnalysisServer } from "@server/website.analysis";
import { Module } from "vuex";
import { CONSTANT, EventBus } from "@utils/event";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { LogAuditService } from "@server/log.audit";
import { TABLECONFIG } from "@store/table.type";
import { Store } from "@store/store";
import { WebsiteAnalysisType, WEBSITEANALYSISEVENT } from "@store/website.analysis.type";

export const WebsiteAnalysisStore: Module<WebsiteAnalysisType, any> = {
    state: (): WebsiteAnalysisType => {
        return {
            WebsitePandecttableData: {
                "": [{
                    ads_flux: "",
                    ads_req: "",
                    cc_attack: "",
                    domain: "",
                    id: "",
                    level: 0,
                    name: "",
                    web_attack: 0,
                }]
            },
            AttackLogtableData: {
                "": [{
                    aim_IP: "",
                    aim_port: "",
                    attcked_url: "",
                    client: "",
                    id: "",
                    mate: "",
                    referer: "",
                    req_ID: "",
                    req_body: "",
                    req_header: "",
                    req_length: "",
                    res_code: "",
                    res_header: "",
                    resbody: "",
                    results: "",
                    source_IP: "",
                    source_port: "",
                    threat_level: "",
                    time: "",
                    trig_rule: "",
                    website_add: "",
                }]
            },
            WebsitePandectDetailattackData: {
                "": [{
                    level: "",
                    tendency_attack: {},
                    top_ip: [],
                    top_location: [],
                    top_type: [],
                    total_cc: "",
                    total_web: "",
                }]    
            },
            WebsitePandectDetailaccessData: {
                "": [{
                    tendency_ip: {},
                    tendency_req_flow: [],
                    tendency_req_num: [],
                    top_location: [],
                    total_hit_flow: "",
                    total_hit_num: "",
                }]    
            }

        };
    },
    mutations: {
        [WEBSITEANALYSISEVENT.GETATTACKLOGDATA]: (state, payload) => {
            if (!state.AttackLogtableData[Math.floor(payload.page) - 1]) {
                state.AttackLogtableData[Math.floor(payload.page) - 1] = [];
            }
            state.AttackLogtableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA]: (state, payload) => {
            if (!state.WebsitePandecttableData[Math.floor(payload.page) - 1]) {
                state.WebsitePandecttableData[Math.floor(payload.page) - 1] = [];
            }
            state.WebsitePandecttableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK]: (state, payload) => {
            state.WebsitePandectDetailattackData[payload.id] = payload.message;

        },
        [WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS]: (state, payload) => {
            state.WebsitePandectDetailaccessData[payload.id] = payload.message;

        },
    },
    actions: {
        [WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.AttackLogtableData) {
                EventBus.doNotify(CONSTANT.GETWEBSITEPANDECTDATA);
            }
            WebsiteAnalysisServer.getWebsitePandect(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(WEBSITEANALYSISEVENT.GETWEBSITEPANDECTDATA, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "websitepandecttable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETWEBSITEPANDECTDATA);
                        break;
                    default:
                        break;
                }
            });
        },
        [WEBSITEANALYSISEVENT.GETATTACKLOGDATA]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.AttackLogtableData) {
                EventBus.doNotify(CONSTANT.GETATTACKLOGDATA);
            }
            WebsiteAnalysisServer.getAttackLog(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, { page: payload.page, message: res.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "attacklogtable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETATTACKLOGDATA);
                        break;
                    default:
                        break;
                }
            });
        },
        [WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK]: ({ state, commit, rootState }, payload) => {
            console.log(payload);
            WebsiteAnalysisServer.getAttackDetail(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK, { id: payload.site, message: res.data });
                        EventBus.doNotify(CONSTANT.GETPANDECTDETAILATTACK);
                        break;
                    default:
                        break;
                }
            });
        },
        [WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS]: ({ state, commit, rootState }, payload) => {
            WebsiteAnalysisServer.getAccessDetail(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS, { id: payload.site, message: res.data });
                        EventBus.doNotify(CONSTANT.GETPANDECTDETAILACCESS);
                        break;
                    default:
                        break;
                }
            });
        },

    },
    getters: {
        "logAuditAttackLogtableData": function (state) {
            return state.AttackLogtableData;
        },
        "WebsitePandecttableData": function (state) {
            return state.WebsitePandecttableData;
        },
        "WebsitePandectDetailattackData": function (state) {
            return state.WebsitePandectDetailattackData;
        },
        "WebsitePandectDetailaccessData": function (state) {
            return state.WebsitePandectDetailaccessData;
        }
    }
};