import { Module } from "vuex";
import { UserCenterType, USERPWD, UserPwdType, UserMessageType, USERMESSAGE } from "./user.center.type";


export const UserCenterStore: Module<UserCenterType, any> = {
    state: (): UserCenterType => {
        let userPwd: UserPwdType = {
            userId: "init",
            oldpwd: "init",
            newpwd: "init",
            newpwd1: "init"
        };
        let message: UserMessageType = {
            userId: "init",
            username: "",
            pwd: "",
            role: "init",
            companyName: "init",
            tel: "",
            email: "init",
            remark: "",
            usedNetwork: "",
            totalNetwork: 0,
            WEB: true,
            ADS: true,
            SITEMIRROR: true,
            ACCELERATE: true,
            DUEDATE: new Date() + ""
        };
        return {
            "init": message
        };
    },

    mutations: {
        [USERPWD.CHANGEPWD]: (state: UserCenterType) => {
            // state.message = {

            // }
        },
        [USERMESSAGE.GETMESSAGE]: (state: UserCenterType) => {

        }
    },
    actions: {
        [USERPWD.CHANGEPWD]: ({ state, commit, rootState }) => {

        },
        [USERMESSAGE.GETMESSAGE]: ({ state, commit, rootState }) => {

        }
    },
    getters: {
        "init": function (state) {
            return state["init"];
        },
    }
};