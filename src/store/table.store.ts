import { Module } from "vuex";
import { TableConfigType, TABLECONFIG } from "@store/table.type";
import { TableServer } from "@server/table";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { ResetType } from "@views/usermanage/dialogbox/reset.pwd";
import { vm, EventBus, CONSTANT } from "@utils/event";



export const TableConfigStore: Module<TableConfigType, any> = {
    state: (): TableConfigType => {
        let systemTable: TableConfigType = {
            "usertable": {
                columns: [
                    {
                        prop: "uid",
                        label: "用户id",
                        show: false,
                        disable: true
                    },
                    {
                        prop: "user_name",
                        label: "用户名",
                        show: true,
                        disable: true
                    },
                    {
                        prop: "role",
                        label: "用户角色",
                        show: true,
                        disable: true
                    },
                    {
                        prop: "cperson",
                        label: "创建人",
                        show: true
                    },
                    {
                        prop: "company",
                        label: "企业名称",
                        show: true
                    },
                    {
                        prop: "phone",
                        label: "手机号码",
                        show: true
                    },
                    {
                        prop: "email",
                        label: "邮箱",
                        show: true
                    },
                    {
                        prop: "ctime",
                        label: "创建时间",
                        type: "date",
                        show: true,
                        sortable: "custom",
                        width: "125px"
                    },
                    {
                        prop: "expiry_date",
                        label: "到期时间",
                        type: "date",
                        show: true,
                        sortable: "custom",
                        width: "125px"
                    },
                    {
                        prop: "is_active",
                        label: "状态",
                        show: true,
                        disable: true
                    },
                ],
                pageSizes: [10, 20, 30, 40, 50],
                page_size: 10,
                page: 1,
                total: 1
            },
        };
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
            TableServer.getConfig().then((response: AxiosResponse<ResType>) => {
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