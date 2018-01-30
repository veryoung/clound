import { RichTextEditor } from "@components/richtexteditor/editor";
import { ModuleTitle } from "@components/title/module.title";
import { EventBus, CONSTANT } from "@utils/event";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import { Auxiliary } from "@utils/auxiliary";
import { FormRuleType } from "@utils/form.validator";


const Aux = new Auxiliary<string>();
require("./public.notice.operation.styl");
@Component({
    name: "publicnoiceoperation",
    template: require("./public.notice.operation.html"),
    props: {
    },
    computed: {
        ...mapGetters([
            "websiteEdit"
        ])
    },
    components: {
        ModuleTitle,
        RichTextEditor
    }
})

export class PublicNoiceOperation extends Vue {
    // init props

    // init computed


    // init data
    public form: PublicNoticeFormType = {
        cotent: "",
        title: "",
    };

    // 标题
    public titles: string[] = ["写公告"];

    // 表单验证
    public rules: FormRuleType = {
        name: [
            { required: true, message: "请填写公告标题", trigger: "blur" },
            { min: 1, max: 40, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        content: [
            { required: true, message: "请添加公告内容", trigger: "blur" },
        ],
    };



    // init lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            // this.$store.dispatch(MYWEBSITEEVENT.GETWEBEDIT, { website_id: id, operation: this.operation });
        }
        let eventId = EventBus.register(CONSTANT.GETWEBEDIT, function (event: string, info: any) {
       
        });
        Aux.insertId(eventId);
    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
    }

    // init methods

    submitForm(formBasic: string) {

    }

    back() {
        this.$router.go(-1);
    }

    content(val: string) {
        this.form.cotent = val;
    }

}


export interface PublicNoticeFormType {
    cotent: string;
    title: string;
}