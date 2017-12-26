import { Module } from "vuex";
import { UserCenterType, UserStoreType, UserMessageType, USER, UserListType, UserCompanyListType } from "./user.center.type";
import { UserServer } from "@server/user";
import { ResType } from "@server/index";
import { session, vm, USERMANAGEEVENT } from "@utils/index";
import { Store } from "@store/store";
import { TABLECONFIG } from "@store/table.type";


export const UserCenterStore: Module<UserStoreType, any> = {
    state: (): UserStoreType => {
        let message: UserMessageType = {
            uid: 0,
            user_name: "",
            pwd: "",
            role: "",
            role_id: "",
            cperson: "",
            ctime: "",
            state: "",
            company: "",
            phone: "",
            email: "",
            remark: "",
            used_domain_num: "",
            max_domain_num: "",
            waf_enable: "1",
            ads_enable: "1",
            mirror_enable: "1",
            cdn_enable: "1",
            expiry_date: new Date() + "",
        };
        let personInfo: UserCenterType = {
            "init": message
        };
        let personCache = session.getItem("personInfo");
        let userlist: UserCompanyListType = {
            "init": {
                data: {
                    "0": [{
                        company: "",
                        cperson: "",
                        ctime: "",
                        email: "",
                        expiry_date: "",
                        is_active: "",
                        is_delete: "",
                        is_edite: "",
                        phone: "",
                        role: "",
                        user_name: "",
                        uid: "",
                    }]
                },
                total: 1
            }
        };
        return {
            personInfo: personCache !== null ? personCache : personInfo,
            userlist: userlist
        };
    },

    mutations: {
        [USER.ADDUSERMESSAGE]: (state: UserStoreType, payload) => {
            if (!(payload.uid in state)) {
                state.personInfo[payload.uid] = payload.message;
            }
        },
        [USER.DEFAULTUSER]: (state: UserStoreType, payload) => {
            state.personInfo["default"] = payload.message;
            session.setItem("personInfo", state.personInfo);
        },
        [USER.GETOTHERUSER]: (state: UserStoreType, payload) => {
            state.personInfo[payload.uid] = payload.message;
            // session.setItem("personInfo", state.personInfo);
        },
        [USER.GETUSERLIST]: (state: UserStoreType, payload) => {
            if (!state.userlist[payload.ori_id]) {
                state.userlist[payload.ori_id] = { data: {}, total: 0 };
            }
            if (!state.userlist[payload.ori_id].data[Math.floor(payload.page) - 1]) {
                state.userlist[payload.ori_id].data[Math.floor(payload.page) - 1] = [];
            }
            state.userlist[payload.ori_id].data[Math.floor(payload.page) - 1] = payload.message.data;
            state.userlist[payload.ori_id].total = payload.message.total;
        }
    },
    actions: {
        [USER.ADDUSERMESSAGE]: ({ state, commit, rootState }, payload) => {
            UserServer.getPersonInfo(payload.uid).then((res: ResType & any) => {
                commit(USER.ADDUSERMESSAGE, { uid: payload.uid, message: res.data });
            });
        },
        [USER.DEFAULTUSER]: ({ state, commit, rootState }, payload) => {
            UserServer.getPersonInfo(payload.uid).then((res: ResType & any) => {
                commit(USER.DEFAULTUSER, { uid: payload.uid, message: res.data });
            });
        },
        [USER.GETOTHERUSER]: ({ state, commit, rootState }, payload) => {
            UserServer.getPersonInfo(payload.uid).then((res: ResType & any) => {
                commit(USER.GETOTHERUSER, { uid: payload.uid, message: res.data });
                vm.$emit(USERMANAGEEVENT.GETUSER);
            });
        },
        [USER.GETUSERLIST]: ({ state, commit, rootState }, payload) => {
            UserServer.getUserList(payload).then((res: ResType & any) => {
                switch (res.status) {
                    case "suc":
                        commit(USER.GETUSERLIST, { ori_id: payload.ori_id, page: payload.page, message: res.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "usertable", total: res.data.total });
                        vm.$emit(USERMANAGEEVENT.GETUSERLIST, payload.ori_id);
                        break;
                    default:
                        break;
                }

            });
        }
    },
    getters: {
        personInfo: function (state) {
            return state.personInfo;
        },
        userlist: function (state) {
            return state.userlist;
        }
    }
};