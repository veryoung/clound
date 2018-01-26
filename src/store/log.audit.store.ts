import { Module } from "vuex";
import { LogAuditType, LOGADUITEVENT } from "@store/log.aduit.type";
import { CONSTANT, EventBus } from "@utils/event";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { LogAuditService } from "@server/log.audit";
import { TABLECONFIG } from "@store/table.type";
import { Store } from "@store/store";

export const LogsAuditStore: Module<LogAuditType, any> = {
    state: (): LogAuditType => {
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
            }
        };
    },
    mutations: {
        [LOGADUITEVENT.GETLIST]: (state, payload) => {
            if (!state.tableData[Math.floor(payload.page) - 1]) {
                state.tableData[Math.floor(payload.page) - 1] = [];
            }
            state.tableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        }
    },
    actions: {
        [LOGADUITEVENT.GETLIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.tableData) {
                EventBus.doNotify(CONSTANT.GETLOGAUDITLIST);
            }
            LogAuditService.getLogAuditList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(LOGADUITEVENT.GETUSERLIST, { page: payload.page, message: res.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "logautdittable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETUSERLIST);
                        break;
                    default:
                        break;
                }
            });
        }
    },
    getters: {
        "logAuditTableData": function (state) {
            return state.tableData;
        }
    }
};