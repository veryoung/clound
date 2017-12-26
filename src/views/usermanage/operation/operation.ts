import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import ElementUI from "element-ui";


import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, USER, UserCenterType } from "@store/user.center.type";
import { OrganizationTreeType, Organization } from "@store/organization.type";
import { FromValidator, FormRuleType } from "@utils/form.validator";
import { AddOrganizationFrame } from "@views/usermanage/dialogbox/add.organization.frame";
import { TissueTree } from "@components/tissuetree/tree";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { AxiosResponse } from "axios";


interface RoleType {
    name: string;
    role_id: number;
}

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
            "personInfo"
        ])
    },
    components: {
        ModuleTitle, AddOrganizationFrame, TissueTree
    }
})
export class UserOperation extends Vue {
    // init props
    public dialogVisible: boolean = false;
    public operation: "add" | "editor";

    // init computed
    public personInfo: UserCenterType;
    public form: UserMessageType;

    /**
     * {
        uid: string;
        user_name: string;
        pwd?: string;
        role?: string;
        role_id?: string;
        cperson: string;
        ctime: string;
        state: string;
        company: string;
        phone: string;
        email: string;
        remark: string;
        used_domain_num: string;
        max_domain_num: string;
        waf_enable: string;
        ads_enable: string;
        mirror_enable: string;
        cdn_enable: string;
        expiry_date: string;
    }
     */
    // init data
    public roles: Array<RoleType> = new Array<RoleType>();
    public rules: FormRuleType = {
        user_name: [
            { required: true, message: "真实姓名不能为空", trigger: "blur" },
            { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        phone: [
            { required: true, message: "手机号码不能为空", trigger: "blur" },
            { validator: FromValidator.tel, trigger: "blur", message: "请填写正确手机号码" }
        ],
        email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { validator: FromValidator.email, trigger: "blur", message: "请填写正确邮箱" }
        ],
        company: [
            { required: true, message: "企业名称不能为空", trigger: "blur" },
        ],
        pwd: [
            { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        expiry_date: [
            { required: true, message: "请填写到期日期", trigger: "blur" },
        ]
    };



    // init lifecircle hook
    created() {
        let id = this.$route.params.id;
        if (id) {
            this.form = this.personInfo[id];
        } else {
            this.form = this.personInfo.init;
        }
        UserServer.getUserRole().then((res: ResType & any) => {
            switch (res.status) {
                case "suc":
                    this.roles = res.data;
                    break;
                default:
                    break;
            }
        });
    }



    // init methods
    importNode(node: OrganizationTreeType) {
        this.form.company = node.name;
        this.dialogVisible = false;
    }
    addOrganization() {
        this.dialogVisible = true;
    }
    close() {
        this.dialogVisible = false;
    }
    // 'formbasic','formserver'
    submitForm(formBasic: string, formServer: string) {
        let temp: any = this.$refs[formBasic];
        temp.validate((valid: any) => {
            if (valid) {
                UserServer.addUser(this.form).then((res: ResType & any) => {
                    switch (res.status) {
                        case "suc":
                            ElementUI.Message({
                                message: "添加用户成功",
                                type: "success"
                            });
                            break;
                        default:
                            break;
                    }
                });
            } else {
                ElementUI.Message({
                    message: "表单格式不正确",
                    type: "error"
                });
                return false;
            }
        });
    }

    back() {
        this.$router.go(-1);
    }
}