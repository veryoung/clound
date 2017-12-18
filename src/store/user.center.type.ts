

export interface UserPwdType {
    userId: string;
    username?: string;
    oldpwd: string;
    newpwd: string;
    newpwd1: string;
}

export interface UserMessageType {
    userId: string;
    role: string;
    companyName: string;
    tel: number;
    email: string;
    usedNetwork: number;
    totalNetwork: number;
    WEB: boolean;
    ADS: boolean;
    SITEMIRROR: boolean;
    ACCELERATE: boolean;
    DUWDATE: Date;
}

export interface UserCenterType {
    [extra: string]: {
        pwd: UserPwdType,
        message: UserMessageType
    };
}

export enum USERPWD {
    CHANGEPWD = "changepwd"
}
export enum USERMESSAGE {
    GETMESSAGE = "getmessage"
}

