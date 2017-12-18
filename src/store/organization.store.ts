import { Module } from "vuex";
import { ORGANIZATION, OrganizationType, OrganizationTreeType, Organization } from "./organization.type";




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