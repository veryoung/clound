import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./reset.pwd.styl");
@Component({
    name: "resetpwd",
    template: require("./reset.pwd.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: String
        }
    }
})
export class ResetPwd extends Vue {
    // init props
    public uid: string;
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
            { required: true, message: "密码不能为空", trigger: "blur" },
            { validator: FromValidator.pwd, message: "密码不符合规则", trigger: "blur" }
        ],
        pwd1: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { validator: this.npwdAgain, message: "两次密码不一致", trigger: "blur" }
        ]
    };
    // init methods
    npwdAgain(rule: FormRuleType, value: string, callback: Function) {
        if (value !== this.form.pwd) {
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
                            this.$notify({
                                title: "提示",
                                message: "修改成功",
                                type: "success"
                            });
                            this.cancel();
                            break;
                        default:
                            break;
                    }
                });
            } else {
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