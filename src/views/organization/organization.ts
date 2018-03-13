import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { TipBox } from "@views/organization/dialogbox/tip.box";
import { vm, FormRuleType } from "@utils/index";
import { OrganizationTreeType, Organization, MessageType, ORGANIZATION } from "@store/organization.type";
import { OrganizationServer } from "@server/organization";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { create } from "domain";
import { Permissions } from "@directives/permissions";
import { SubmitBtn } from "@components/submit/submit";
import { ListBaseClass } from "@views/base/base.class";


require("./organization.styl");
@Component({
    name: "organization",
    template: require("./organization.html"),
    watch: {
        filterText(val: any) {
            let temp: any = this.$refs.tree;
            temp.filter(val);
        }
    },
    components: {
        ModuleTitle, TissueTree, TipBox, SubmitBtn
    },
    computed: {
        ...mapGetters([
            "OrganizationMessage"
        ])
    }
})
export class OrganizationComponent extends ListBaseClass {
    // init data
    public Aux = new this.Auxiliary<string>();
    public add: boolean = Permissions.judge("SystemManagement.Organization.Add");
    public del: boolean = Permissions.judge("SystemManagement.Organization.Delete");
    public pid: string = "";
    public dialogVisible: boolean = false;
    public create: boolean = false;
    public form: MessageType = {
        desc: "",
        id: "",
        name: "",
        // pid: "",
        sname: ""
    };

    public rules: FormRuleType = {
        name: [
            { required: true, message: "请输入组织名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        sname: [
            { required: true, message: "请输入组织简称", trigger: "change" },
        ]
    };
    // init computed
    public OrganizationMessage: Organization;


    // lifecycle hook
    created() {
        let that = this;
        let id = this.EventBus.register(this.CONSTANT.ADDORGANIZATIONMESSAGE, function (event: string, info: any) {
            if (info.id !== "") {
                that.form = that.OrganizationMessage[info.id];
                that.create = true;
            } else {
                that.form = that.OrganizationMessage.init;
                that.create = false;
            }
        });
        this.Aux.insertId(id);
    }
    destroyed() {
        this.Aux.getIds().map((id, $index) => {
            this.EventBus.unRegister(id);
        });
    }

    // init methods
    addNode(opt: any) {
        this.pid = opt.id;
        this.dialogVisible = true;
    }

    delNode(opt: any) {
        this.$msgbox.confirm("确定要删除嘛？", "提示").then(() => {
            OrganizationServer.delOrganization(opt.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        this.$notify({
                            title: "提示",
                            message: "删除成功",
                            type: "success"
                        });
                        this.$store.dispatch(ORGANIZATION.INITORGANIZATIONTREE);
                        break;

                    default:
                        break;
                }
            });
        }).catch(() => {

        });
    }

    clickNode(data: OrganizationTreeType) {
        if (Permissions.judge("SystemManagement.Organization.Check")) {
            this.$store.dispatch(ORGANIZATION.ADDORGANIZATIONMESSAGE, { id: data.id });
        }
    }

    close() {
        this.dialogVisible = false;
    }

    onSubmit(form: string) {
        let temp: any = this.$refs[form];
        temp.validate((valid: any) => {
            if (valid) {
                OrganizationServer.editOrganizationInfo((<any>Object).assign({}, this.form)).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            this.$notify({
                                title: "提示",
                                message: res.message || "修改成功",
                                type: "success"
                            });
                            this.$store.dispatch(ORGANIZATION.INITORGANIZATIONTREE);
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
}