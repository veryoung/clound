

export interface UserPwdType {
    userId: string;
    username?: string;
    oldpwd: string;
    newpwd: string;
    newpwd1: string;
}

export interface UserMessageType {
    userId: string;
    username: string;
    pwd: string;
    role: string;
    createby: string;
    addTime: string;
    status: string;
    companyName: string;
    tel: number | "";
    email: string;
    remark: string;
    usedNetwork: number | "";
    totalNetwork: number | "";
    WEB: boolean;
    ADS: boolean;
    SITEMIRROR: boolean;
    ACCELERATE: boolean;
    DUEDATE: string;
}

export interface UserCenterType {
    [extra: string]: UserMessageType;
}

export enum USERPWD {
    CHANGEPWD = "changepwd"
}
export enum USERMESSAGE {
    GETMESSAGE = "getmessage"
}

