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
import { NoticeServer } from "@server/notice";
import { OrganizationServer } from "@server/organization";
import { UserServer } from "@server/user";
import { SpliceTree } from "@components/splicetree/splice.tree";
import { ListBaseClass } from "@views/base/base.class";



const Aux = new Auxiliary<string>();
require("./email.notice.operation.styl");
@Component({
    name: "emailcnoiceoperation",
    template: require("./email.notice.operation.html"),
    props: {
    },
    computed: {
        ...mapGetters([
        ])
    },
    components: {
        ModuleTitle,
        RichTextEditor,
        SpliceTree
    }
})

export class EmailNoiceOperation extends ListBaseClass {
    // init props

    // init computed

    // init data
    public form: EmailNoticeFormType = {
        content: "",
        object: "",
        receiver_ids: [],
    };

    // 标题
    public titles: string[] = ["写邮件"];


    // 表单验证
    public rules: FormRuleType = {
        object: [
            { required: true, message: "请填写邮件标题", trigger: "blur" },
            { min: 1, max: 40, message: "不符合字符规范，字符长度1-40字符", trigger: "blur" }
        ],
        content: [
            { required: true, message: "请添加邮件内容", trigger: "blur" },
            { min: 1, max: 1000, message: "不符合字符规范，字符长度1-1000字符", trigger: "blur" }
        ],
        receiver_ids: [
            { required: true, message: "请选择收件人", trigger: "blur" },

        ],
    };



    // init lifecircle hook
    created() {
    }
    destroyed() {
    }

    public num: number = 0;
    public checkoutData: any = {};
    getData(targetData: any) {
        this.checkoutData = targetData;
        this.updateNum();
    }
    updateNum() {
        this.num = Object.keys(this.checkoutData).length;
        this.form.receiver_ids = (<any>Object).keys(this.checkoutData);
    }
    submitForm(formBasic: string) {
        let temp: any = this.$refs.noticeform;
        let flag: boolean = false;
        console.log(this.checkoutData);


        if (this.form.receiver_ids.length === 0) {
            this.$notify({
                title: "提示",
                message: "请选择收件人",
                type: "warning"
            });
            return;
        }
        temp.validate((valid: any) => {
            flag = valid;
        });
        if (flag) {
            NoticeServer.sendEmail(this.form).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        this.$notify({
                            title: "提示",
                            message: "邮件填写成功",
                            type: "success"
                        });
                        this.$router.push("/SystemManagement/ReportManagement/emaillnotice");
                        break;
                    case "error":
                        break;
                    default:
                        break;
                }
            });
        }
    }

    back() {
        this.$router.go(-1);
    }

    content(val: string) {
        this.form.content = val;
    }

}


export interface EmailNoticeFormType {
    content: string;
    object: string;
    receiver_ids: number[];
}