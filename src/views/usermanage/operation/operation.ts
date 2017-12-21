import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, USERMESSAGE, UserCenterType } from "@store/user.center.type";
import { OrganizationTreeType, Organization } from "@store/organization.type";
import { FromValidator, FormRuleType } from "@utils/form.validator";
import { AddOrganizationFrame } from "@views/usermanage/dialogbox/add.organization.frame";
import { TissueTree } from "@components/tissuetree/tree";




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
            "OrganizationMessage",
            "OrganizationTree"
        ]),
        ...mapGetters({
            form: "init"
        })
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
    public OrganizationMessage: Organization;
    public OrganizationTree: OrganizationTreeType;


    // init data
    public form: UserMessageType;
    public rules: FormRuleType = {
        username: [
            { required: true, message: "真实姓名不能为空", trigger: "blur" },
            { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        tel: [
            { required: true, message: "手机号码不能为空", trigger: "blur" },
            { validator: FromValidator.tel, trigger: "blur", message: "请填写正确手机号码" }
        ],
        email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { validator: FromValidator.email, trigger: "blur", message: "请填写正确邮箱" }
        ],
        DUEDATE: [
            { required: true, message: "请填写到期日期", trigger: "blur" },
        ]
    };



    // init lifecircle hook
    created() {
        let id = this.$route.params.id ? this.$route.params.id : "init";
        // this.form = this.personInfo.id;
    }



    // init methods
    importNode(node: OrganizationTreeType) {
        this.form.companyName = this.OrganizationMessage[node.id].sname;
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
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    back() {
        this.$router.go(-1);
    }
}