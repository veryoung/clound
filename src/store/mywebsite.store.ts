import { Module } from "vuex";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { TableServer } from "@server/table";
import { MywebsiteServer } from "@server/mywebsite";
import { AxiosResponse } from "axios";
import { ResType } from "server";
import { Store } from "@store/store";
import { EventBus, CONSTANT } from "@utils/event";
import { TABLECONFIG } from "@store/table.type";





export const OrganizationStore: Module<OrganizationType, any> = {
    state: (): OrganizationType => {
        return {
        };
    },

    mutations: {
        [MYWEBSITEEVENT.GETLISTMESSAGE]: (state, payload) => {
        },
    },
    actions: {
        [MYWEBSITEEVENT.GETLISTMESSAGE]: ({ state, commit, rootState }, payload) => {
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
    },
    getters: {

    }
};