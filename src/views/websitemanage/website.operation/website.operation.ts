import { UpdateDiploma } from "./dialogbox/update.diploma";
import { FormRuleType } from "@utils/form.validator";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import ElementUI from "element-ui";


import { ModuleTitle } from "@components/title/module.title";
import FormType from "@views/websitemanage/website.operation/website.operation.attachement";


require("./website.operation.styl");
@Component({
    name: "websiteoperation",
    template: require("./website.operation.html"),
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
        UpdateDiploma 
    }
})
export class WebsiteOperation extends Vue {
    // init props
    public operation: "add" | "editor";

    // init computed


    // init data
    public form: FormType = {
        cid: "",
        domain: "",
        http_port: [],
        https_port: [],
        industry: "金融",
        name: "",
        open_waf: 1,
        source_info: [],
        source_type: "A",
    };

    public inputVisible: any = false;
    // 协议类型复选框
    public httpTpye: boolean = false;
    public httpsTpye: boolean = false;
    // 回源方式单选框
    public sourceIP: number = 0; // 0 表示 IP 1 表示域名
    public sourceInfo: string = "";
    public showTag: boolean = true;
    // 上传证书
    public dialogVisibleDiploma: boolean = false;
    // 表单验证
    public rules: FormRuleType = {
        name: [
            { required: true, message: "请填写网站名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        role: [
            { required: true, message: "请添加用户角色", trigger: "blur" },
        ],

    }; 


    
    // init lifecircle hook
    created() {
        console.log(this.form);
     
    }

    destroyed() {
    
    }



    // init methods

    handle(type: "updateDiploma") {
        if (type === "updateDiploma") {
            this.dialogVisibleDiploma = true;
        }
    }

    handleClose(tag: any) {
        this.form.source_info.splice(this.form.source_info.indexOf(tag), 1);
        if (this.form.source_info.length > 3) {
            this.showTag = false;
        } else {
            this.showTag = true;
        }
    }

    showInput() {
        this.inputVisible = true;
        // this.$nextTick( _  => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
    }

    handleInputConfirm() {
        let inputValue = this.sourceInfo;
        if (inputValue) {
          this.form.source_info.push(inputValue);
        }
        console.log(this.form.source_info.length);
        if (this.form.source_info.length > 3) {
            this.showTag = false;
        } else {
            this.showTag = true;
        }
        this.inputVisible = false;
        this.sourceInfo = "";
    }

    // "formbasic","formserver"
    submitForm(formBasic: string, formServer: string) {
        console.log(this.form);
    }

    back() {
        this.$router.go(-1);
    }

    // 协议类型复选框
    changeSoure(val: any) {
        if ( val === 0) {
            this.form.source_type = "A";
        } else {
            this.form.source_type = "CNAME";
        }
    }

    // 关闭窗口
    closeDiploma() {
        this.dialogVisibleDiploma = false;
    }
}