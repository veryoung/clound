import { axios, Restful } from "@server/index";

export class General extends Restful {
    // private callback: Function = () => { };
    constructor() {
        super();
    }
    /**
     * @param username 
     * @param pwd 
     */
    public login(opt: LoginType) {
        const { username, pwd } = opt;
        return this.post({
            url: "/api/v20/account/auth", params: {
                username: username,
                pwd: pwd
            }
        });
    }

    public oneself() {
        return this.get({
            url: "api/v20/account/info",
            params: {}
        });
    }

    // public then(fn: Function) {
    //     this.callback = fn;
    // }
}

export const GeneralServer = new General();

/**
 * idcode	用户输入的验证码	string	
 * pwd	密码	string	
 * uid	验证码ID	string	
 * username	用户名	string	邮箱或手机
 */
export interface LoginType {
    idcode?: string;
    pwd: string;
    uid?: string;
    username: string;
}