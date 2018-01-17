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
        return /^(?:\w[-_\w]{0,61}\.){1,}(?:com\.cn|net\.cn|org\.cn|gov\.cn|net|org|com|cn|cc|me|tel|mobi|asia|biz|info|name|tv|hk|公司|中国|网络)$/.test(value);
    }
    // 支持80、443、[3000-35000]，但3071、5989、10050端口除外
    public port(val: string) {
        let value: number;
        value = parseInt(val);
        if (value === 80 || value === 443 || ((value > 2999 && value < 34999) && value !== 3071 && value !== 5989 && value !== 10050)) {
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