import { Module } from "vuex";
import { NoticeType, NOTICEEVENT } from "@store/notice.type";
import { CONSTANT, EventBus } from "@utils/event";
import { NoticeServer } from "@server/notice";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { Store } from "@store/store";
import { TABLECONFIG } from "@store/table.type";


export const NoticeStore: Module<NoticeType, any> = {
    state: (): NoticeType => {
        return {
            msgTable: {
                "": [
                    {
                        id: "",
                        msg_type: "",
                        receiver: "",
                        send_date: "",
                        sender: "",
                        status: "",
                    }
                ]
            },
            msgDetail: {
                "": {
                    content: "",
                    id: "",
                    msg_type: "",
                    receiver: "",
                    send_date: "",
                    sender: "",
                    status: "",
                }
            },
            emailTable: {
                "": [
                    {
                        id: "",
                        object: "",
                        receiver: "",
                        send_date: "",
                        send_type: "",
                        sender: "",
                        status: "",
                    }
                ]
            },
            emailDetail: {
                "": {
                    content: "",
                    id: "",
                    object: "",
                    receiver: "",
                    send_date: "",
                    send_type: "",
                    sender: "",
                    status: "",
                }
            },
            noticeTable: {
                "": [
                    {
                        c_person: "",
                        c_time: "",
                        content: "",
                        title: "",
                    }
                ]
            }
        };
    },
    mutations: {
        [NOTICEEVENT.GETEMAILLIST]: (state, payload) => {
            if (!state.emailTable[Math.floor(payload.page) - 1]) {
                state.emailTable[Math.floor(payload.page) - 1] = [];
            }
            state.emailTable[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [NOTICEEVENT.GETMSGLIST]: (state, payload) => {
            if (!state.msgTable[Math.floor(payload.page) - 1]) {
                state.msgTable[Math.floor(payload.page) - 1] = [];
            }
            state.msgTable[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
        [NOTICEEVENT.GETEMAILDETAIL]: (state, payload) => {
            state.emailDetail[payload.id] = payload.message;
        },
        [NOTICEEVENT.GETMSGDETAIL]: (state, payload) => {
            state.msgDetail[payload.id] = payload.message;
        },
        [NOTICEEVENT.GETNOTICELIST]: (state, payload) => {
            if (!state.noticeTable[Math.floor(payload.page) - 1]) {
                state.noticeTable[Math.floor(payload.page) - 1] = [];
            }
            state.noticeTable[Math.floor(payload.page) - 1] = [].concat(payload.message);
        },
    },
    actions: {
        [NOTICEEVENT.GETEMAILLIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.emailTable) {
                EventBus.doNotify(CONSTANT.GETEMAILLIST);
            }
            NoticeServer.getEmailRecord(payload).then().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(NOTICEEVENT.GETEMAILLIST, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "emailtable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETEMAILLIST);
                        break;
                    default:
                        break;
                }
            });
        },
        [NOTICEEVENT.GETMSGLIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.msgTable) {
                EventBus.doNotify(CONSTANT.GETMSGLIST);
            }
            NoticeServer.getMessageRecord(payload).then().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(NOTICEEVENT.GETMSGLIST, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "msgtable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETMSGLIST);
                        break;
                    default:
                        break;
                }
            });
        },
        [NOTICEEVENT.GETEMAILDETAIL]: ({ state, commit, rootState }, payload) => {
            if (payload.id in state.emailDetail) {
                EventBus.doNotify(CONSTANT.GETEMAILDETAIL);
            }
            NoticeServer.getEmailDetail(payload.id).then().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(NOTICEEVENT.GETEMAILDETAIL, { page: payload.id, message: res.data.data });
                        EventBus.doNotify(CONSTANT.GETEMAILDETAIL);
                        break;
                    default:
                        break;
                }
            });
        },
        [NOTICEEVENT.GETMSGDETAIL]: ({ state, commit, rootState }, payload) => {
            if (payload.id in state.msgDetail) {
                EventBus.doNotify(CONSTANT.GETMSGDETAIL);
            }
            NoticeServer.getMessageDetail(payload.id).then().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(NOTICEEVENT.GETMSGDETAIL, { page: payload.id, message: res.data.data });
                        EventBus.doNotify(CONSTANT.GETMSGDETAIL);
                        break;
                    default:
                        break;
                }
            });
        },
        [NOTICEEVENT.GETNOTICELIST]: ({ state, commit, rootState }, payload) => {
            if ((Math.floor(payload.page) - 1) in state.msgTable) {
                EventBus.doNotify(CONSTANT.GETNOTICELIST);
            }
            NoticeServer.getNotice(payload).then().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        commit(NOTICEEVENT.GETNOTICELIST, { page: payload.page, message: res.data.data });
                        Store.dispatch(TABLECONFIG.TOTAL, { moduleName: "noticetable", total: res.data.total });
                        EventBus.doNotify(CONSTANT.GETNOTICELIST);
                        break;
                    default:
                        break;
                }
            });
        },
    },
    getters: {
        "emailTable": (state) => {
            return state.emailTable;
        },
        "emailDetail": (state) => {
            return state.emailDetail;
        },
        "msgTable": (state) => {
            return state.msgTable;
        },
        "msgDetail": (state) => {
            return state.msgDetail;
        },
        "noticeTable": (state) => {
            return state.noticeTable;
        }
    }
};
