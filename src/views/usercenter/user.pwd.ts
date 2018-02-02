import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { UserCenterType, DefaultUserType, USER } from "@store/user.center.type";
import { FormRuleType, FromValidator } from "@utils/index";
import { UserServer } from "@server/user";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";


interface MiniUserMessageType {
    user_name: string;
    role: string;
    compay: string;
}

require("./user.pwd.styl");
@Component({
    name: "userpwd",
    template: require("./user.pwd.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters([
            "personInfo",
            "defaultUser"
        ])
    }
})
export class UserPwd extends Vue {
    // init computed
    public personInfo: UserCenterType;
    public defaultUser: DefaultUserType;

    // init data
    public form = {
        opwd: "",
        npwd: "",
        npwdAgain: ""
    };

    public rules: FormRuleType = {
        opwd: [
            { required: true, message: "原始密码不能为空", trigger: "blur" },
            // { message: "密码不符合要求", validator: FromValidator.pwd, trigger: "blur" }
        ],
        npwd: [
            { required: true, message: "新密码不能为空", trigger: "blur" },
            { message: "密码不符合要求", validator: FromValidator.pwd, trigger: "blur" }
        ],
        npwdAgain: [
            { required: true, message: "确认密码不能为空", trigger: "blur" },
            { message: "与密码不符合", validator: this.npwdAgain, trigger: "blur" }
        ]
    };
    public userMessage: MiniUserMessageType = {
        user_name: "",
        role: "",
        compay: ""
    };


    // lifecircle hook 
    created() {
        let that = this;
        this.$store.dispatch(USER.DEFAULTUSER, { uid: this.defaultUser.uid });
        let PersonInfoId = EventBus.register(CONSTANT.DEFAULTUSER, function (event: string, info: any) {
            that.userMessage = (<any>Object).assign({}, that.personInfo[that.defaultUser.uid]);
        });
        this.userMessage = (<any>Object).assign({}, this.personInfo[this.defaultUser.uid]);
    }

    // init methods
    npwdAgain(rule: FormRuleType, value: string, callback: Function) {
        if (value !== this.form.npwd) {
            callback(new Error("两次输入密码不一致"));
        } else {
            callback();
        }
    }
    submitForm(formName: string) {
        let temp: any = this.$refs[formName];
        temp.validate((valid: boolean) => {
            if (valid) {
                UserServer.changePwd(this.form).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            this.$notify({
                                title: "提示",
                                message: res.message || "修改密码成功",
                                type: "success"
                            });
                            this.resetForm(formName);
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

    resetForm(formName: string) {
        let temp: any = this.$refs[formName];
        temp.resetFields();
    }
}