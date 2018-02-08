import { ResType } from "server";
import { AxiosResponse } from "axios";
import { Module } from "vuex";
import { ReportType, REPORTEVENT } from "@store/report.type";
import { ReportService } from "@server/report";
import { EventBus, CONSTANT } from "@utils/event";
import { Store } from "@store/store";
import { TABLECONFIG } from "@store/table.type";



export const ReportStore: Module<ReportType, any> = {
    state: (): ReportType => {
        return {
            tableData: {
                "": [{
                    create_time: "",
                    cycle: "",
                    domain_names: "",
                    id: "",
                    name: "",
                    status: "",
                }]
            }
        };
    },

    mutations: {
        [REPORTEVENT.GETREPORTTEMPLATELIST]: (state, payload) => {
            if (!state.tableData[Math.floor(payload.page) - 1]) {
                state.tableData[Math.floor(payload.page) - 1] = [];
            }
            state.tableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        }
    },

    actions: {
        [REPORTEVENT.GETREPORTTEMPLATELIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.tableData) {
                EventBus.doNotify(CONSTANT.GETREPORTTEMPLATELIST);
            }
            ReportService.getReportList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                         commit(REPORTEVENT.GETREPORTTEMPLATELIST, { page: payload.page, message: res.data });
                         Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "reporttemplatetable", total: res.data.total });
                         EventBus.doNotify(CONSTANT.GETREPORTTEMPLATELIST);
                        break;
                    default:
                        break;
                }

            });
        }

    },

    getters: {
        "reportTableData": function (state) {
            return state.tableData;
        }
    }


};