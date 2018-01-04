import { Module } from "vuex";
import { UserCenterType, UserStoreType, UserMessageType, USER, RoleType, UserListType } from "./user.center.type";
import { UserServer } from "@server/user";
import { ResType } from "@server/index";
import { session, vm } from "@utils/index";
import { Store } from "@store/store";
import { TABLECONFIG } from "@store/table.type";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";
import * as moment from "moment";


export const UserCenterStore: Module<UserStoreType, any> = {
    state: (): UserStoreType => {
        let now = new Date();
        now.setFullYear(now.getFullYear() + 1);
        let roleList: RoleType[] = [{
            name: "",
            role_id: "",
            ufcode: ""
        }];
        let message: UserMessageType = {
            uid: "",
            user_name: "",
            pwd: "",
            role: "",
            role_id: "",
            cperson: "",
            ctime: "",
            is_active: "",
            company_id: "",
            phone: "",
            email: "",
            remark: "",
            used_domain_num: "",
            max_domain_num: "",
            waf_enable: "1",
            ads_enable: "1",
            mirror_enable: "1",
            cdn_enable: "1",
            expiry_date: moment(now).format("YYYYMMDD") + "",
        };
        let personInfo: UserCenterType = {
            "init": message
        };
        let personCache = session.getItem("personInfo");
        let userlist: UserListType = {
            "init": {
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
            }
        };
        return {
            personInfo: personCache !== null ? personCache : personInfo,
            userlist: userlist,
            roleList: roleList,
        };
    },

    mutations: {
        [USER.ADDUSERMESSAGE]: (state: UserStoreType, payload) => {
            state.personInfo[payload.uid] = payload.message;
        },
        [USER.DEFAULTUSER]: (state: UserStoreType, payload) => {
            state.personInfo["default"] = payload.message;
            session.setItem("personInfo", state.personInfo);
        },
        [USER.GETOTHERUSER]: (state: UserStoreType, payload) => {
            if (state.personInfo[payload.uid]) {
                state.personInfo[payload.uid] = (<any>Object).assign({}, state.personInfo[payload.uid], payload.message);
            } else {
                state.personInfo[payload.uid] = (<any>Object).assign({}, payload.message);
            }
            session.setItem("personInfo", state.personInfo);
        },
        [USER.GETUSERLIST]: (state: UserStoreType, payload) => {
            if (!state.userlist[payload.ori_id]) {
                state.userlist[payload.ori_id] = {};
            }
            if (!state.userlist[payload.ori_id][Math.floor(payload.page) - 1]) {
                state.userlist[payload.ori_id][Math.floor(payload.page) - 1] = [];
            }
            state.userlist[payload.ori_id][Math.floor(payload.page) - 1] = [].concat(payload.message.data);
        },
        [USER.GETUSERROLES]: (state: UserStoreType, payload) => {
            state.roleList = payload;
        }
    },
    actions: {
        [USER.ADDUSERMESSAGE]: ({ state, commit, rootState }, payload) => {
            UserServer.getPersonInfo(payload.uid).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                commit(USER.ADDUSERMESSAGE, { uid: payload.uid, message: res.data });
            });
        },
        [USER.DEFAULTUSER]: ({ state, commit, rootState }, payload) => {
            UserServer.getPersonInfo(payload.uid).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                commit(USER.DEFAULTUSER, { uid: payload.uid, message: res.data });
                EventBus.doNotify(CONSTANT.DEFAULTUSER);
            });
        },
        [USER.GETOTHERUSER]: ({ state, commit, rootState }, payload) => {
            if (payload.uid in state.personInfo) {
                EventBus.doNotify(CONSTANT.GETOTHERUSER);
            }
            if (payload.operation && payload.operation === "editor") {
                UserServer.getPersonEdit(payload.uid).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    commit(USER.GETOTHERUSER, { uid: payload.uid, message: res.data });
                    EventBus.doNotify(CONSTANT.GETOTHERUSER);
                });
            } else {
                UserServer.getPersonInfo(payload.uid).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    commit(USER.GETOTHERUSER, { uid: payload.uid, message: res.data });
                    EventBus.doNotify(CONSTANT.GETOTHERUSER);
                });
            }
        },
        [USER.GETUSERLIST]: ({ state, commit, rootState }, payload) => {
            if (payload.ori_id in state.userlist) {
                if ((Math.floor(payload.page) - 1) in state.userlist[payload.ori_id]) {
                    EventBus.doNotify(CONSTANT.GETUSERLIST, { id: payload.ori_id });
                }
            }
            UserServer.getUserList(payload).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(USER.GETUSERLIST, { ori_id: payload.ori_id, page: payload.page, message: res.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "usertable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETUSERLIST, { id: payload.ori_id });
                        break;
                    default:
                        break;
                }
            });
        },
        [USER.GETUSERROLES]: ({ state, commit, rootState }, payload) => {
            UserServer.getUserRole().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(USER.GETUSERROLES, res.data);
                        EventBus.doNotify(CONSTANT.GETUSERROLES);
                        break;
                    default:
                        break;
                }
            });
        },
        [USER.GETUSERFILTERROLES]: ({ state, commit, rootState }, payload) => {
            UserServer.getRoles().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(USER.GETUSERROLES, res.data);
                        EventBus.doNotify(CONSTANT.GETUSERFILTERROLES);
                        break;
                    default:
                        break;
                }
            });
        },
    },
    getters: {
        personInfo: function (state) {
            return state.personInfo;
        },
        userlist: function (state) {
            return state.userlist;
        },
        roleList: function (state) {
            return state.roleList;
        }
    }
};