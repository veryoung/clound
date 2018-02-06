import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { FormRuleType } from "@utils/form.validator";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { Auxiliary } from "@utils/auxiliary";
import { FormType, TagType } from "@views/websitemanage/website.operation/website.operation.attachement";
import { CustomTags } from "@components/customtags/custom.tags";
import { DiplomaBaseClass } from "@views/base/base.class";


const Aux = new Auxiliary<string>();
require("./report.operation.styl");
@Component({
    name: "websiteoperation",
    template: require("./report.operation.html"),
    props: {
        operation: {
            type: String,
            default: "add"
        }
    },
    computed: {
        ...mapGetters([
        ])
    },
    components: {
        ModuleTitle,
        CustomTags
    }
})

export class ReportOperation extends DiplomaBaseClass {
    // init props
    public operation: "add" | "editor";

    // init computed


    // init data
    public titles = ["添加模板"];
    public form: FormType = {
        cid: "",
        domain: "",
        http_port: [80],
        https_port: [443],
        industry: "金融",
        name: "",
        open_waf: "1",
        source_info: [],
        source_type: "A",
        remark: "",
        id: "",
    };


    // 上传证书
    public dialogVisibleDiploma: boolean = false;
    // 表单验证
    public rules: FormRuleType = {
        name: [
            { required: true, message: "请填写网站名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        domain: [
            { required: true, message: "请添加网站域名", trigger: "blur" },
        ],

    };



    // init lifecircle hook
    created() {

    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            this.EventBus.unRegister(id);
        });
    }

    // init methods


    // "formbasic","formserver"
    submitForm(formBasic: string) {
        switch (this.operation) {
            case "add":

                break;
            case "editor":

            default:
                break;
        }
    }
}






