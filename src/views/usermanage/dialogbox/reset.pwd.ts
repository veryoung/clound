import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import ElementUI from "element-ui";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./reset.pwd.styl");
@Component({
    name: "resetpwd",
    template: require("./reset.pwd.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: Number
        }
    }
})
export class ResetPwd extends Vue {
    // init props
    public uid: number;
    // init data
    public form: ResetType = {
        pwd1: "",
        pwd: ""
    };
    /**
     *     required?: boolean;
    message?: string;
    trigger?: string;
    validator?: Function;
    min?: number;
    max?: number;
     */
    public rules: FormRuleType = {
        pwd: [
            { required: true, message: "密码不能为空" },
            { validator: FromValidator.pwd, message: "密码不符合规则" }
        ],
        pwd1: [
            { required: true, message: "密码不能为空" },
            { validator: this.npwdAgain }
        ]
    };
    // init methods
    npwdAgain(rule: FormRuleType, value: string, callback: Function) {
        if (value !== this.form.pwd1) {
            callback(new Error("两次输入密码不一致"));
        } else {
            callback();
        }
    }
    submit(formName: string) {
        let temp: any = this.$refs[formName];
        temp.validate((valid: any) => {
            if (valid) {
                UserServer.resetPwd({ uid: this.uid + "", pwd: this.form.pwd }).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            ElementUI.Message({
                                message: "修改成功",
                                type: "success"
                            });
                            break;
                        default:
                            break;
                    }
                });
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface ResetType {
    pwd: string;
    pwd1: string;
}