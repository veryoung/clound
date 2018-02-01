import { EmailDiploma } from "./dialogbox/email.diploma";
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


const Aux = new Auxiliary<string>();
require("./message.notice.operation.styl");
@Component({
    name: "messagenoiceoperation",
    template: require("./message.notice.operation.html"),
    props: {
    },
    computed: {
        ...mapGetters([
        ])
    },
    components: {
        ModuleTitle,
        RichTextEditor,
        EmailDiploma
    }
})

export class MessageNoiceOperation extends Vue {
    // init props

    // init computed


    // init data
    public form: MessagelNoticeFormType = {
        content: "",
        receiver_ids: [],
    };
    public num: number = 0;
    public chosePerson: Array<string> = [];

    // 标题
    public titles: string[] = ["写短信"];

    // 选择用户
    public dialogVisibleDiploma: boolean = false;

    // 表单验证
    public rules: FormRuleType = {
        receiver_ids: [
            { required: true, message: "请选择收件人", trigger: "blur" },
        ],
        content: [
            { required: true, message: "请添加短信内容", trigger: "blur" },
            { min: 1, max: 1000, message: "不符合字符规范，字符长度1-1000字符", trigger: "blur" }

        ],
    };



    // init lifecircle hook
    created() {

    }

    destroyed() {

    }

    // init methods

    getUser(val: Array<object>) {
        let valArray: any = val;
        for (let key in valArray) {
            this.form.receiver_ids.push(valArray[key].uid);
        }
        this.num = valArray.length;
        this.chosePerson = valArray;
        this.closeDiploma();
    }

    submitForm() {
        let temp: any = this.$refs.noticeform;
        let flag: boolean = false;
        temp.validate((valid: any) => {
            flag = valid;
        });
        if (flag) {
            NoticeServer.sendMessage(this.form).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        this.$message({
                            message: "短信填写成功",
                            type: "success"
                        });
                        this.$router.push("/SystemManagement/ReportManagement/messagenotice");
                        break;
                    case "error":
                        this.$message({
                            message: res.message || "短信填写失败",
                            type: "error"
                        });
                        break;
                    default:
                        break;
                }
            });
        }
    }
    select() {
        this.dialogVisibleDiploma = true;
    }

    back() {
        this.$router.go(-1);
    }

    content(val: string) {
        this.form.content = val;
    }

    // 关闭窗口
    closeDiploma() {
        this.dialogVisibleDiploma = false;
    }
}


export interface MessagelNoticeFormType {
    content: string;
    receiver_ids: Array<number>;
}