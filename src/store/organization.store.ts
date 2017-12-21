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
        [ORGANIZATION.ADDORGANIZATION]: (state: OrganizationType, val) => {
            console.log(state);
            // state.message = {

            // }
        },
        // [ORGANIZATION.GETORGANIZATION]: (state: OrganizationType) => {

        // }
    },
    actions: {
        [ORGANIZATION.ADDORGANIZATION]: ({ state, commit, rootState }, val) => {
            commit(ORGANIZATION.ADDORGANIZATION, val);
        },
        // [ORGANIZATION.GETORGANIZATION]: ({ state, commit, rootState }) => {

        // }
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