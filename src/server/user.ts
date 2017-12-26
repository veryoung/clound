import { axios, Restful } from "@server/index";
import { UserMessageType } from "@store/user.center.type";


export class User extends Restful {
    constructor() {
        super();
    }

    importUser() {
        return this.post({
            url: "/api/v20/account/user/excel/",
            params: { uid: "sdsd" }
        });
    }

    public delUser(uid: string) {
        return this.del({
            url: "/api/v20/account/user/info/",
            params: {
                uid: uid
            }
        });
    }

    public exportUser(ids: Array<number>) {
        return this.get({
            url: "/api/v20/account/user/excel/",
            params: ids
        });
    }

    public resetPwd(opts: RestPwdType) {
        return this.put({
            url: "/api/v20/account/pwd/reset/",
            params: opts
        });
    }

    public addUser(opts: UserMessageType) {
        return this.post({
            url: "/api/v20/account/user/info/",
            params: opts
        });
    }

    public getUserRole() {
        return this.get({
            url: "/api/v20/account/role/info/",
            params: {}
        });
    }

    public getUserList(opt: UserListType) {
        return this.get({
            url: "/api/v20/account/user/list/",
            params: opt
        });
    }


    public getPersonInfo(uid: string) {
        return this.get({
            url: "/api/v20/account/user/display/",
            params: {
                uid: uid
            }
        });
    }

    public changePwd(opt: ChangePwd) {
        return this.put({
            url: "/api/v20/account/pwd/new/",
            params: opt
        });
    }
}

export interface UserListType {
    ctime?: string;
    email?: string;
    expiry_date?: string;
    is_active?: string;
    name?: string;
    ori_id?: string;
    page: string;
    page_size: string;
    phone?: string;
    role_id?: string;
    sort_ctime?: boolean;
    sort_expiry_date?: boolean;
}
interface ChangePwd {
    npwd: string;
    opwd: string;
}

interface RestPwdType {
    pwd: string;
    uid: string;
}
export const UserServer = new User();