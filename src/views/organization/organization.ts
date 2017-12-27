import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import ElementUI from "element-ui";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { TipBox } from "@views/organization/dialogbox/tip.box";
import { vm, ORGANIZATIONEVENT, FormRuleType } from "@utils/index";
import { OrganizationTreeType, Organization, MessageType, ORGANIZATION } from "@store/organization.type";
import { OrganizationServer } from "@server/organization";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";


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
        ModuleTitle, TissueTree, TipBox
    },
    computed: {
        ...mapGetters([
            "OrganizationMessage"
        ])
    }
})
export class OrganizationComponent extends Vue {
    // init data
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
            that.form = that.OrganizationMessage[info.id];
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
        ElementUI.MessageBox.confirm("确定要删除嘛？", "提示").then(() => {
            OrganizationServer.delOrganization(opt.id).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        ElementUI.Message({
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
        if (data.id === "") {
            return false;
        }
        this.$store.dispatch(ORGANIZATION.ADDORGANIZATIONMESSAGE, { id: data.id });
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
                            ElementUI.Message({
                                message: res.message || "修改成功",
                                type: "success"
                            });
                            this.$store.dispatch(ORGANIZATION.INITORGANIZATIONTREE);
                            this.create = false;
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

    resetForm(form: string) {
        let temp: any = this.$refs[form];
        temp.resetFields();
    }
}