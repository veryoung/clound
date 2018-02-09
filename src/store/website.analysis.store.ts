import { Module } from "vuex";
import { CONSTANT, EventBus } from "@utils/event";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { LogAuditService } from "@server/log.audit";
import { TABLECONFIG } from "@store/table.type";
import { Store } from "@store/store";
import { WebsiteAnalysisType, WEBSITEANALYSISEVENT } from "@store/website.analysis.type";

export const LogsAuditStore: Module<WebsiteAnalysisType, any> = {
    state: (): WebsiteAnalysisType => {
        return {
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
            }
        };
    },
    mutations: {
        [WEBSITEANALYSISEVENT.GETATTACKLOGDATA]: (state, payload) => {
            if (!state.AttackLogtableData[Math.floor(payload.page) - 1]) {
                state.AttackLogtableData[Math.floor(payload.page) - 1] = [];
            }
            state.AttackLogtableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        }
    },
    actions: {
        [WEBSITEANALYSISEVENT.GETATTACKLOGDATA]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.AttackLogtableData) {
                EventBus.doNotify(CONSTANT.GETATTACKLOGDATA);
            }
            // LogAuditService.GETATTACKLOGDATA(payload).then((response: AxiosResponse<ResType>) => {
            //     let res: ResType = response.data;
            //     switch (res.status) {
            //         case "suc":
            //             commit(WEBSITEANALYSISEVENT.GETATTACKLOGDATA, { page: payload.page, message: res.data });
            //             Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "logautdittable", total: res.data.total });
            //             EventBus.doNotify(CONSTANT.GETATTACKLOGDATA);
            //             break;
            //         default:
            //             break;
            //     }
            // });
        }
    },
    getters: {
        "logAuditAttackLogtableData": function (state) {
            return state.AttackLogtableData;
        }
    }
};