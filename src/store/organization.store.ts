import { Module } from "vuex";

import { ORGANIZATION, OrganizationType, OrganizationTreeType, Organization } from "./organization.type";
import { ResType } from "server";
import { OrganizationServer } from "@server/organization";
import { treeAttchment } from "@components/tissuetree/tree.attachment";
import { vm } from "@utils/index";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";




export const OrganizationStore: Module<OrganizationType, any> = {
    state: (): OrganizationType => {
        let organization: OrganizationTreeType[] = [
            {
                id: "",
                tree_label: "全部组织机构",
                nodes: []
            }
        ];
        let message: Organization = {
            "init": {
                desc: "",
                id: "",
                name: "",
                // pid: "",
                sname: ""
            }
        };
        return {
            tree: organization,
            message: message
        };
    },

    mutations: {
        [ORGANIZATION.INITORGANIZATIONTREE]: (state: OrganizationType, payload) => {
            if (process.env.PLATFORM === "portal") {
                state.tree = payload.data;
            } else {
                state.tree[0].nodes = payload.data;
            }
        },
        [ORGANIZATION.ADDORGANIZATIONMESSAGE]: (state: OrganizationType, payload) => {
            state.message[payload.id] = payload.data;
        },
    },
    actions: {
        [ORGANIZATION.INITORGANIZATIONTREE]: ({ state, commit, rootState }) => {
            OrganizationServer.getTree().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(ORGANIZATION.INITORGANIZATIONTREE, { data: res.data });
                        EventBus.doNotify(CONSTANT.INITORGANIZATIONTREE);
                        break;
                    default:
                        break;
                }
            });
        },
        [ORGANIZATION.ADDORGANIZATIONMESSAGE]: ({ state, commit, rootState }, payload) => {
            if (payload.id === "") {
                EventBus.doNotify(CONSTANT.ADDORGANIZATIONMESSAGE, { id: payload.id });
                return;
            }
            if (payload.id in state.message) {
                EventBus.doNotify(CONSTANT.ADDORGANIZATIONMESSAGE, { id: payload.id });
            }
            OrganizationServer.getOrganizationInfo(payload.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                commit(ORGANIZATION.ADDORGANIZATIONMESSAGE, { id: payload.id, data: res.data });
                EventBus.doNotify(CONSTANT.ADDORGANIZATIONMESSAGE, { id: payload.id, message: state.message });
            });
        },
    },
    getters: {
        OrganizationTree: function (state) {
            return state.tree;
        },
        OrganizationMessage: function (state) {
            return state.message;
        },
    }
};