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
                        disable: true,
                        nonexit: true
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
                        disable: true,
                        width: "130px"
                    },
                ],
                pageSizes: [10, 20, 30, 40, 50],
                page_size: 10,
                page: 1,
                total: 1
            },
            "mywebsitetable": {
                columns: [
                    {
                        prop: "name",
                        label: "网站名称",
                        show: true

                    },
                    {
                        prop: "domain",
                        label: "网站域名",
                        show: true

                    },
                    {
                        prop: "organization",
                        label: "所属企业",
                        show: true

                    },
                    {
                        prop: "port",
                        label: "协议类型",
                        type: "website_port",
                        show: true
                    },
                    {
                        prop: "source_type",
                        label: "回源方式",
                        show: true
                    },
                    {
                        prop: "source_info",
                        label: "回源地址",
                        show: true,
                        type: "source_info"
                    },
                    {
                        prop: "cname",
                        label: "CNAME别名",
                        show: true
                    },
                    {
                        prop: "ctime",
                        label: "创建时间",
                        show: true,
                        type: "date",
                    },
                    {
                        prop: "state",
                        label: "接入状态",
                        show: true,
                        type: "state",
                    },
                    {
                        prop: "open_waf",
                        label: "防御状态",
                        show: true,
                    },
                    {
                        prop: "service",
                        label: "服务项",
                        show: true,
                        type: "website_server"
                    },
                ],
                pageSizes: [10, 20, 30, 40, 50],
                page_size: 10,
                page: 1,
                total: 1
            }
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