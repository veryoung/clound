import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { TipBox } from "@views/organization/dialogbox/tip.box";
import { vm, FormRuleType } from "@utils/index";
import { OrganizationTreeType, Organization, MessageType, ORGANIZATION } from "@store/organization.type";
import { OrganizationServer } from "@server/organization";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { create } from "domain";
import { Permissions } from "@directives/permissions";
import { SubmitBtn } from "@components/submit/submit";


const Aux = new Auxiliary<string>();
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
export class OrganizationComponent extends Vue {
    // init data
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
        ],
        sname: [
            { required: true, message: "请输入组织简称", trigger: "change" }
        ]
    };
    // init computed
    public OrganizationMessage: Organization;


    // lifecycle hook
    created() {
        let that = this;
        let id = EventBus.register(CONSTANT.ADDORGANIZATIONMESSAGE, function (event: string, info: any) {
            if (info.id !== "") {
                that.form = that.OrganizationMessage[info.id];
                that.create = true;
            } else {
                that.form = that.OrganizationMessage.init;
                that.create = false;
            }
        });
        Aux.insertId(id);
    }
    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
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
                        this.$message({
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
                            this.$message({
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
                console.log("error submit!!");
                return false;
            }
        });
    }
}