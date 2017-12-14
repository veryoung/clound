import { Module } from "vuex";
import { ORGANIZATION } from "./organization.type";


export interface OrganizationTreeType {
    id: string;
    sname: string;
    nodes: Array<OrganizationTreeType>;
}

export interface MessageType {
    // 企业介绍
    desc: string;
    // 组织结构ID		
    id: string;
    // 	组织机构名称
    label: string;
    // 上级组织关系ID 根组织传空字符串或者不传
    pid: string;
    // 简称
    sname: string;
}
export interface Organization {
    [extra: string]: MessageType;
}

export interface OrganizationType {
    tree: Array<OrganizationTreeType>;
    message: Organization;
}


export const OrganizationStore: Module<OrganizationType, any> = {
    state: (): OrganizationType => {
        let organization: Array<OrganizationTreeType> = new Array<OrganizationTreeType>();
        let message: Organization = {
            "init": {
                desc: "",
                id: "",
                label: "",
                pid: "",
                sname: ""
            }
        };
        return {
            tree: organization,
            message: message
        };
    },

    mutations: {
        [ORGANIZATION.ADDORGANIZATION]: (state: OrganizationType) => {
            // state.message = {

            // }
        }
    },
    actions: {
        [ORGANIZATION.ADDORGANIZATION]: ({ state, commit, rootState }) => {

        }
    },
    // getters: { ... }
};