export const NOTICEEVENT = {
    GETEMAILLIST: "获取邮件列表",
    GETEMAILDETAIL: "获取邮件详情",
    GETMSGLIST: "获取短信列表",
    GETMSGDETAIL: "获取短信详情",
    GETNOTICELIST: "获取公告列表"
};

export interface NoticeType {
    emailTable: {
        [extra: string]: EmailDetailType[]
    };
    emailDetail: {
        [extra: string]: EmailDetailType
    };
    msgTable: {
        [extra: string]: MsgDetailType[],
    };
    msgDetail: {
        [extra: string]: MsgDetailType
    };
    noticeTable: {
        [extra: string]: NoticeListType[]
    };
}

export interface EmailDetailType {
    content?: string;
    id: string;
    object: string;
    receiver: string;
    send_date: string;
    send_type: string;
    sender: string;
    status: string;
}

export interface MsgDetailType {
    content?: string;
    id: string;
    msg_type: string;
    receiver?: string;
    send_date: string;
    sender: string;
    status: string;
}


export interface NoticeListType {
    c_person: string;
    c_time: string;
    content: string;
    title: string;
}