import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, USERMESSAGE } from "@store/user.center.type";
import { FromValidator } from "@utils/form.validator";
import { AddOrganizationFrame } from "@views/usermanage/dialogbox/add.organization.frame";




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
        ...mapGetters({
            form: "init"
        })
    },
    components: {
        ModuleTitle, AddOrganizationFrame
    }
})
export class UserOperation extends Vue {
    // init props
    public dialogVisible: boolean = false;
    public operation: "add" | "editor";
    // init computed
    public form: UserMessageType;
    // init data
    public rules: any = {
        username: [
            { required: true, message: "请输入真实用户名", trigger: "blur" },
            { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        tel: [
            { required: true, message: "请填写正确手机号码", trigger: "blur" },
            { validator: () => { FromValidator.tel; }, trigger: "blur" }
        ],
        email: [
            { required: true, message: "请填写正确邮箱", trigger: "blur" },
            { validator: () => { FromValidator.email; }, trigger: "blur" }
        ],
        DUEDATE: [
            { required: true, message: "请填写到期日期", trigger: "blur" },
        ]
    };
    /**
     *     <!--     
        userId: string;
        username: string;
        pwd: string;
        role: string;
        companyName: string;
        tel: number | "";
        email: string;
        usedNetwork: number | "";
        totalNetwork: number | "";
        WEB: boolean;
        ADS: boolean;
        SITEMIRROR: boolean;
        ACCELERATE: boolean;
        DUEDATE: Date; -->
     */



    // init lifecircle hook
    created() {
        this.$store.dispatch(USERMESSAGE.GETMESSAGE, {
            id: "init"
        });
    }



    // init methods

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
        window.history.go(-1);
        // this.$router.go(-1);
        // let temp: any = this.$refs[formBasic];
        // temp.resetFields();
    }
}