import Component from "vue-class-component";
import { mapGetters } from "vuex";


import { MessageType, Organization, ORGANIZATION } from "@store/organization.type";
import { FormRuleType } from "@utils/form.validator";
import { OrganizationServer } from "@server/organization";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { SubmitBtn } from "@components/submit/submit";
import { ListBaseClass, DiplomaBaseClass } from "@views/base/base.class";



require("./tip.box.styl");
@Component({
    name: "tipbox",
    template: require("./tip.box.html"),
    components: {
        SubmitBtn
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        pid: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapGetters([
            "OrganizationMessage"
        ])
    }
})
export class TipBox extends DiplomaBaseClass {
    // init props
    public dialogVisible: boolean;
    public pid: string;
    // init computed
    public OrganizationMessage: Organization;
    // init datas
    public form: MessageType = {
        name: "",
        sname: "",
        desc: "",
        pid: "",
        id: ""
    };

    // lifecircle hook
    created() {
        // this.form = this.OrganizationMessage.init;
    }

    public rules: FormRuleType = {
        name: [
            { required: true, message: "请输入组织名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        sname: [
            { required: true, message: "请输入组织简称", trigger: "change" }
        ]
    };

    // init methods
    addCompany() {
        this.form.pid = this.pid;
        let temp: any = this.$refs.form;
        temp.validate((valid: boolean) => {
            if (valid) {
                OrganizationServer.addOrganization(this.form).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            // 'success' | 'warning' | 'info' | 'error'
                            this.$notify({
                                title: "提示",
                                message: res.message || "组织机构添加成功",
                                type: "success"
                            });
                            this.$store.dispatch(ORGANIZATION.INITORGANIZATIONTREE);
                            this.close();
                            break;
                        default:
                            break;
                    }
                });
            } else {

            }
        });
    }

}