import { Module } from "vuex";
import { UserCenterType, USERPWD, UserPwdType, UserMessageType } from "./user.center.type";


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
            role: "init",
            companyName: "init",
            tel: 0,
            email: "init",
            usedNetwork: 0,
            totalNetwork: 0,
            WEB: false,
            ADS: false,
            SITEMIRROR: false,
            ACCELERATE: false,
            DUWDATE: new Date()
        };
        return {
            "init": {
                pwd: userPwd,
                message: message
            }
        };
    },

    mutations: {
        [USERPWD.CHANGEPWD]: (state: UserCenterType) => {
            // state.message = {

            // }
        }
    },
    actions: {
        [USERPWD.CHANGEPWD]: ({ state, commit, rootState }) => {

        }
    },
};