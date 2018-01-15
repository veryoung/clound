export class Validator {
    constructor() {

    }

    public pwd(rule: FormRuleType, value: string, callback: Function) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/.test(value)) {
            callback();
        } else {
            callback(new Error("密码不符合规范"));
        }
    }

    public tel(rule: FormRuleType, value: string, callback: Function) {
        if (/^1[34578]\d{9}$/.test(value)) {
            callback();
        } else {
            callback(new Error("手机号码格式有误"));
        }
    }

    public email(rule: FormRuleType, value: string, callback: Function) {
        if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
            callback();
        } else {
            callback(new Error("邮箱格式有误"));
        }
    }
}

export const FromValidator = new Validator();


export interface SingleRule {
    required?: boolean;
    message?: string;
    trigger?: string;
    validator?: Function;
    min?: number;
    max?: number;
    type?: string;
}
export interface FormRuleType {
    [extra: string]: SingleRule[];
}



class Reg {
    constructor() { }

    public ip(value: string) {
        return /^(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2})$/.test(value);
    }


    public domain(value: string) {
        return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(value);
    }
    // 端口支持80、443、2000-65535，其中2812、3071、5141、5989、44366、49258端口除外
    public port(value: string) {
        if (value === "80" || value === "443" || (value > "1999" && value < "65536" && value !== "2812" && value !== "3017" && value !== "5141" && value !== "5989" && value !== "44366" && value !== "49258")) {
            return true;
        } else {
            return false;
        }
    }

    public uri(value: string) {
        if (value.indexOf("www.") !== -1 && value.indexOf(".com") !== -1) {
            return true;
        } else {
            return false;
        }
    }

}


export const RegValidate = new Reg();