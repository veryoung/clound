import Component from "vue-class-component";
import Vue from "vue";



import { ModuleTitle } from "@components/title/module.title";




require("./user.pwd.styl");
@Component({
    name: "userpwd",
    template: require("./user.pwd.html"),
    components: {
        ModuleTitle
    },
})
export class UserPwd extends Vue {
    // init data
    public form = {
        pass: "",
        checkPass: "",
        age: ""
    };

    rules = {
        pass: [{ validator: () => this.validatePass, trigger: "blur" }],
        checkPass: [{ validator: () => this.validatePass2, trigger: "blur" }],
        age: [{ validator: () => this.checkAge, trigger: "blur" }]
    };


    // init methods
    submitForm(formName: string) {
        let temp: any = this.$refs[formName];
        temp.validate((valid: boolean) => {
            if (valid) {
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    resetForm(formName: string) {
        let temp: any = this.$refs[formName];
        temp.resetFields();
    }

    checkAge(rule: any, value: number, callback: Function) {
        if (!value) {
            return callback(new Error("年龄不能为空"));
        }
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
            } else {
                if (value < 18) {
                    callback(new Error("必须年满18岁"));
                } else {
                    callback();
                }
            }
        }, 1000);
    }
    validatePass(rule: any, value: string, callback: Function) {
        if (value === "") {
            callback(new Error("请输入密码"));
        } else {
            if (this.form.checkPass !== "") {
                let temp: any = this.$refs.form;
                temp.validateField("checkPass");
            }
            callback();
        }
    }
    validatePass2(rule: any, value: string, callback: Function) {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.form.pass) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    }
}