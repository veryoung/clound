import { Store } from "@store/store";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { Module } from "vuex";
import { LogsAduitType, LOGSADUITEVENT } from "@store/logsaduit.type";
import { LogauditServer } from "@server/systemManage/logsaudit";

export const LogsAuditStore: Module <LogsAduitType, any> = {
    state: (): LogsAduitType => {
        return {
            tableData: {
                "": [{
                    email: "",
                    ip: "",
                    op_detail: "",
                    op_ret: "",
                    op_time: "",
                    op_type: "",
                    user: "",
                }]
            },
            logsaduitConfig: {
                "init": {
                    email: "",
                    ip: "",
                    op_detail: "",
                    op_ret: "",
                    op_time: "",
                    op_type: "",
                    user: "",
                }
            }
        };
    },
    mutations: {
        [LOGSADUITEVENT.GETLOGSADUITCONFIG]: (state, payload) => {
            state.logsaduitConfig[payload.website_id] = payload.message;
        },
    },
    actions: {
        // [LOGSADUITEVENT.GETLISTMESSAGE]: ({ state, commit, rootState }, payload) => {
        //     if ((Math.floor(payload.page) - 1) in state.tableData) {
        //         EventBus.doNotify(CONSTANT.GETLISTMESSAGE);
        //     }
        //     LogauditServer.getList(payload).then((response: AxiosResponse<ResType>) => {
        //         let res: ResType = response.data;
        //         switch (res.status) {
        //             case "suc":
        //                 commit(MYWEBSITEEVENT.GETLISTMESSAGE, { page: payload.page, message: res.data.data });
        //                 Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "mywebsitetable", total: res.data.total });
        //                 EventBus.doNotify(CONSTANT.GETLISTMESSAGE);
        //                 break;
        //             default:
        //                 break;
        //         }
        //     });
        // },
        [LOGSADUITEVENT.GETWEBSITECONFIG]: ({ state, commit, rootState }, payload) => {
            LogauditServer.getLogsauditConfig(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        // commit(MYWEBSITEEVENT.GETWEBSITECONFIG, { website_id: payload.website_id, message: res.data });
                        // EventBus.doNotify(CONSTANT.GETWEBSITECONFIG, { website_id: payload.website_id });
                        break;
                    default:
                        break;
                }
            });
        },

    },
};