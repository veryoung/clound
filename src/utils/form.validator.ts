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