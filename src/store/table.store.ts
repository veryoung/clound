import { Module } from "vuex";
import { TableConfigType, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { ResetType } from "@views/usermanage/dialogbox/reset.pwd";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { systemTable } from "@store/table.store.attchment";



export const TableConfigStore: Module<TableConfigType, any> = {
    state: (): TableConfigType => {
        return systemTable;
    },

    mutations: {
        [TABLECONFIG.CHANGECOLUMNS]: (state: TableConfigType, payload) => {
            state[payload.moduleName].columns = payload.columns;
        },
        [TABLECONFIG.CHANGEPAGE]: (state: TableConfigType, payload) => {
            state[payload.moduleName].page = payload.page;
        },
        [TABLECONFIG.CHANGEPAGESIZE]: (state: TableConfigType, payload) => {
            state[payload.moduleName].page_size = payload.page_size;
        },
        [TABLECONFIG.TOTAL]: (state: TableConfigType, payload) => {
            state[payload.moduleName].total = payload.total;
        },
        [TABLECONFIG.TABLEALL]: (state: TableConfigType, payload) => {
            if (payload.all === "") {
                return false;
            } else {
                state[payload.moduleName] = (<any>Object).assign({}, payload.all, state[payload.moduleName]);
            }

        },
    },
    actions: {
        [TABLECONFIG.CHANGECOLUMNS]: ({ state, commit, rootState }, payload) => {
            commit(TABLECONFIG.CHANGECOLUMNS, { moduleName: payload.moduleName, columns: payload.columns });
        },
        [TABLECONFIG.CHANGEPAGE]: ({ state, commit, rootState }, payload) => {
            commit(TABLECONFIG.CHANGEPAGE, { moduleName: payload.moduleName, page: payload.page });
        },
        [TABLECONFIG.CHANGEPAGESIZE]: ({ state, commit, rootState }, payload) => {
            commit(TABLECONFIG.CHANGEPAGESIZE, { moduleName: payload.moduleName, page_size: payload.page_size });
        },
        [TABLECONFIG.TOTAL]: ({ state, commit, rootState }, payload) => {
            commit(TABLECONFIG.TOTAL, { moduleName: payload.moduleName, total: payload.total });
        },
        [TABLECONFIG.TABLEALL]: ({ state, commit, rootState }, payload) => {
            TableServer.getConfig(payload.moduleName).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(TABLECONFIG.TABLEALL, { moduleName: payload.moduleName, all: res.data });
                        EventBus.doNotify(CONSTANT.TABLEALL);
                        break;
                    default:
                        break;
                }
            });

        },
    },
    getters: {
        tableConfig: function (state) {
            return state;
        }
    }
};