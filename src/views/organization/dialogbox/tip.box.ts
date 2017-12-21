import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { MessageType, Organization } from "@store/organization.type";
import { FormRuleType } from "@utils/form.validator";


require("./tip.box.styl");
@Component({
    name: "tipbox",
    template: require("./tip.box.html"),
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            "OrganizationMessage"
        ])
    }
})
export class TipBox extends Vue {
    // init props
    public dialogVisible: boolean;
    // init computed
    public OrganizationMessage: Organization;

    public form: MessageType;

    // lifecircle hook
    created() {
        this.form = this.OrganizationMessage.init;
    }

    public rules: FormRuleType = {
        label: [
            { required: true, message: "请输入组织名称", trigger: "blur" },
        ],
        sname: [
            { required: true, message: "请输入组织简称", trigger: "change" }
        ]
    };

    // init methods
    cancel() {
        this.$emit("close", false);
    }
}