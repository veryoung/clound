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
            },
            reportList: {
                "": [
                    {
                        rid: "",
                        count_cycle: "",
                        count_obj: "",
                        count_time: ["", ""],
                        name: "",
                        pro_time: ["", ""]
                    }
                ]
            },
            reportTemplateDetail: {
                "": {
                    cycle: "",
                    cycle_range: [""],
                    indicators: [""],
                    name: ""
                }
            }
        };
    },

    mutations: {
        [REPORTEVENT.GETREPORTTEMPLATELIST]: (state, payload) => {
            if (!state.tableData[Math.floor(payload.page) - 1]) {
                state.tableData[Math.floor(payload.page) - 1] = [];
            }
            state.tableData[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [REPORTEVENT.GETREPORTLIST]: (state, payload) => {
            if (!state.reportList[Math.floor(payload.page) - 1]) {
                state.reportList[Math.floor(payload.page) - 1] = [];
            }
            state.reportList[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [REPORTEVENT.GETREPORDETAIL]: (state, payload) => {
            state.reportTemplateDetail[payload.id] = payload.message;
        }
    },

    actions: {
        [REPORTEVENT.GETREPORTTEMPLATELIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.tableData) {
                EventBus.doNotify(CONSTANT.GETREPORTTEMPLATELIST);
            }
            ReportService.getTemplateList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(REPORTEVENT.GETREPORTTEMPLATELIST, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "reporttemplatetable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETREPORTTEMPLATELIST);
                        break;
                    default:
                        break;
                }
            });
        },
        [REPORTEVENT.GETREPORTLIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.reportList) {
                EventBus.doNotify(CONSTANT.GETREPORTLIST);
            }
            ReportService.getReportList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(REPORTEVENT.GETREPORTLIST, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "myreporttable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETREPORTLIST);
                        break;
                    default:
                        break;
                }
            });
        },
        [REPORTEVENT.GETREPORDETAIL]: ({ state, commit, rootState }, payload) => {
            if (payload.id in state.reportTemplateDetail) {
                EventBus.doNotify(CONSTANT.GETREPORDETAIL);
            }
            ReportService.getReportTemplateDetail(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(REPORTEVENT.GETREPORDETAIL, { id: payload.id, message: res.data });
                        EventBus.doNotify(CONSTANT.GETREPORDETAIL);
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
        },
        "reportTemplateDetail": function (state) {
            return state.reportTemplateDetail;
        },
        "reportList": function (state) {
            return state.reportList;
        }
    }


};