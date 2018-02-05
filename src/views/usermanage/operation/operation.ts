import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, USER, UserCenterType, RoleType, DefaultUserType } from "@store/user.center.type";
import { OrganizationTreeType, Organization } from "@store/organization.type";
import { FromValidator, FormRuleType } from "@utils/form.validator";
import { AddOrganizationFrame } from "@views/usermanage/dialogbox/add.organization.frame";
import { TissueTree } from "@components/tissuetree/tree";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { roleDict } from "@utils/role.fn";
import { SubmitBtn } from "@components/submit/submit";


const Aux = new Auxiliary<string>();

require("./operation.styl");
@Component({
    name: "useroperation",
    template: require("./operation.html"),
    props: {
        operation: {
            type: String,
            default: "add"
        }
    },
    computed: {
        ...mapGetters([
            "personInfo",
            "roleList",
            "defaultUser"
        ])
    },
    components: {
        ModuleTitle, AddOrganizationFrame, TissueTree, SubmitBtn
    }
})
export class UserOperation extends Vue {
    // init props
    public operation: "add" | "editor";

    // init computed
    public personInfo: UserCenterType;
    public roleList: RoleType[];
    public defaultUser: DefaultUserType;

    // init data
    public roleType: string = "";
    public titles: string[] = [];
    public defaultTime: Date = new Date();
    public unwatch: Function = () => { };
    public roles: RoleType[] = new Array<RoleType>();
    public dialogVisible: boolean = false;
    public form: UserMessageType = {
        uid: "",
        user_name: "",
        pwd: "",
        role: "",
        role_id: "",
        cperson: "",
        ctime: "",
        is_active: "",
        company_id: "",
        company: "",
        phone: "",
        email: "",
        remark: "",
        used_domain_num: "",
        max_domain_num: "",
        waf_enable: "",
        ads_enable: "",
        mirror_enable: "",
        cdn_enable: "",
        expiry_date: "",
    };
    public rules: FormRuleType = {
        user_name: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        role: [
            { required: true, message: "请添加用户角色", trigger: "blur" },
        ],
        phone: [
            { required: true, message: "手机号码不能为空", trigger: "blur" },
            { validator: FromValidator.tel, trigger: "blur", message: "请填写正确手机号码" }
        ],
        email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { validator: FromValidator.email, trigger: "blur", message: "请填写正确邮箱" }
        ],
        pwd: [
            { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        expiry_date: [
            { required: true, message: "请填写到期日期", trigger: "blur" },
        ],
    };
    public expiryOption: any = {
        disabledDate(time: any) {
            return time.getTime() <= new Date(new Date().getTime() - 86400000);
        },
    };
    // init lifecircle hook
    created() {
        this.titles = this.operation === "add" ? ["添加用户"] : ["编辑用户"];
        let that = this;
        let id = this.$route.params.id;
        this.$store.dispatch(USER.GETUSERROLES);
        if (id) {
            this.$store.dispatch(USER.GETUSER, { uid: id, operation: this.operation });
        } else {
            this.form = (<any>Object).assign({}, this.personInfo.init, {
                waf_enable: this.defaultUser.service.waf_enable ? "1" : "0",
                ads_enable: this.defaultUser.service.ads_enable ? "1" : "0",
                mirror_enable: this.defaultUser.service.mirror_enable ? "1" : "0",
                cdn_enable: this.defaultUser.service.cdn_enable ? "1" : "0",
            });
            this.stringToBoolean();
        }
        let eventId = EventBus.register(CONSTANT.GETUSER, function (event: string, info: any) {
            that.form = (<any>Object).assign({}, that.personInfo[id]);
            that.stringToBoolean();
        });
        Aux.insertId(eventId);


        let eventId1 = EventBus.register(CONSTANT.GETUSERROLES, function () {
            that.roles = that.roleList;
        });
        Aux.insertId(eventId1);

        this.unwatch = vm.$watch(() => {
            if (that.form.role) {
                return roleDict.ufcode(that.form.role);
            } else {
                return that.form.role;
            }
        }, (val, oldVal) => {
            if (val) {
                this.changeRules(val);
            }
        });
    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
        this.unwatch();
    }



    // init methods
    changeRules(val: string) {
        if (val !== "sm" && val !== "om" && val !== "am") {
            this.rules.company = [];
            this.rules.company.push({ required: true, message: "企业名称不能为空", trigger: "blur" });
        } else {
            delete this.rules.company;
        }

        if (val !== "am") {
            this.rules.max_domain_num = [];
            this.rules.max_domain_num = [
                { required: true, message: "网站总数不能为空", trigger: "blur" },
                { type: "number", message: "网站总数必须为数字值", trigger: "blur" },
                { validator: this.GE, message: "网站总数必须大于等于0", trigger: "blur" },
            ];
        } else {
            delete this.rules.max_domain_num;
        }
        this.roleType = val;
    }

    stringToBoolean() {
        this.form.ads_enable = this.form.ads_enable === "1" ? true : false;
        this.form.cdn_enable = this.form.cdn_enable === "1" ? true : false;
        this.form.waf_enable = this.form.waf_enable === "1" ? true : false;
        this.form.mirror_enable = this.form.mirror_enable === "1" ? true : false;
    }

    booleanToString() {
        this.form.ads_enable = this.form.ads_enable === true ? "1" : "0";
        this.form.cdn_enable = this.form.cdn_enable === true ? "1" : "0";
        this.form.waf_enable = this.form.waf_enable === true ? "1" : "0";
        this.form.mirror_enable = this.form.mirror_enable === true ? "1" : "0";
    }
    GE(rule: FormRuleType, value: string, callback: Function) {
        if (parseInt(value) >= 0) {
            callback();
        } else {
            callback(new Error("总数必须大于等于0"));
        }
    }
    importNode(node: OrganizationTreeType) {
        this.form.company_id = node.id;
        this.form.company = node.tree_label;
        this.dialogVisible = false;
    }
    addOrganization() {
        this.dialogVisible = true;
    }
    close() {
        this.dialogVisible = false;
    }
    // "formbasic","formserver"
    submitForm(formBasic: string, formServer: string) {
        let temp: any = this.$refs[formBasic];
        let temp1: any = this.$refs[formServer];
        let flag: boolean = false;
        let flag1: boolean = false;
        for (let item of this.roleList) {
            if (item.ufcode === this.form.role) {
                this.form.role_id = item.role_id;
            }
        }
        temp.validate((valid: any) => {
            flag = valid;
        });
        temp1.validate((valid: boolean) => {
            flag1 = valid;
        });
        if (flag && flag1) {
            this.booleanToString();
            switch (this.operation) {
                case "add":
                    UserServer.addUser(this.form).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "添加用户成功",
                                    type: "success"
                                });
                                this.$router.push("/SystemManagement/UserManagement");
                                break;
                            default:
                                this.stringToBoolean();
                                break;
                        }
                    });
                    break;
                case "editor":
                    UserServer.editUser(this.form).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "编辑用户成功",
                                    type: "success"
                                });
                                this.$router.push("/SystemManagement/UserManagement");
                                break;
                            default:
                                this.stringToBoolean();
                                break;
                        }
                    });
                default:
                    break;
            }
        }
    }

    back() {
        this.$router.go(-1);
    }
}