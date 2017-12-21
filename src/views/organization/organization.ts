import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { TipBox } from "@views/organization/dialogbox/tip.box";
import { EventBus } from "@utils/event";
import { TREECOMPONENT } from "@utils/event.type";
import { OrganizationTreeType, Organization, MessageType } from "@store/organization.type";
import { FormRuleType } from "@utils/form.validator";



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
    public dialogVisible: boolean = false;
    public create: boolean = false;
    public form: MessageType;
    public eventIds: string[] = [];

    public rules: FormRuleType = {
        label: [
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
        this.form = this.OrganizationMessage.init;
        // let id1 = EventBus.register(TREECOMPONENT.ADDNODE, () => {
        //     this.dialogVisible = true;
        // });

        // let id2 = EventBus.register(TREECOMPONENT.CLICKNODE, (node: OrganizationTreeType, event: TREECOMPONENT) => {
        //     console.log(node.id);
        //     // this.form = this.OrganizationMessage[node.id];
        //     return;
        // });
        // this.eventIds.push(id1);
        // this.eventIds.push(id2);
    }
    destroyed() {
        // for (let val of this.eventIds) {
        //     EventBus.unRegister(val);
        // }
    }

    // init methods
    addNode() {

    }

    clickNode() {

    }

    close() {
        this.dialogVisible = false;
    }

    onSubmit(form: string) {
        let temp: any = this.$refs[form];
        temp.validate((valid: any) => {
            if (valid) {
                alert("submit!");
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