import { Module } from "vuex";

import { ORGANIZATION, OrganizationType, OrganizationTreeType, Organization } from "./organization.type";
import { ResType } from "server";
import { OrganizationServer } from "@server/organization";
import { treeAttchment } from "@components/tissuetree/tree.attachment";
import { vm, ORGANIZATIONEVENT } from "@utils/index";
import { AxiosResponse } from "axios";




export const OrganizationStore: Module<OrganizationType, any> = {
    state: (): OrganizationType => {
        let organization: Array<OrganizationTreeType> = [
            {
                id: "",
                name: "全部组织机构",
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
        [ORGANIZATION.ADDORGANIZATION]: (state: OrganizationType, payload) => {
            console.log(state);
            // treeAttchment.addNode
        },
        [ORGANIZATION.INITORGANIZATIONTREE]: (state: OrganizationType, payload) => {
            state.tree[0].nodes = payload.data;
        },
        [ORGANIZATION.ADDORGANIZATIONMESSAGE]: (state: OrganizationType, payload) => {
            state.message[payload.id] = payload.data;
        },
    },
    actions: {
        [ORGANIZATION.ADDORGANIZATION]: ({ state, commit, rootState }, payload) => {
            commit(ORGANIZATION.ADDORGANIZATION, payload);
        },
        [ORGANIZATION.INITORGANIZATIONTREE]: ({ state, commit, rootState }) => {
            OrganizationServer.getTree().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(ORGANIZATION.INITORGANIZATIONTREE, { data: res.data });
                        break;
                    default:
                        break;
                }
            });
        },
        [ORGANIZATION.ADDORGANIZATIONMESSAGE]: ({ state, commit, rootState }, payload) => {
            if (payload.id in state.message) {
                vm.$emit(ORGANIZATIONEVENT.GETORGANIZATION, payload.id);
                return false;
            }
            OrganizationServer.getOrganizationInfo(payload.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                commit(ORGANIZATION.ADDORGANIZATIONMESSAGE, { id: payload.id, data: res.data });
                vm.$emit(ORGANIZATIONEVENT.GETORGANIZATION, payload.id);
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