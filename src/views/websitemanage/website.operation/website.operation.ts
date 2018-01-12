import { WebEditType } from "@store/mywebsite.type";
import { EventBus, CONSTANT } from "@utils/event";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { UpdateDiploma } from "./dialogbox/update.diploma";
import { FormRuleType } from "@utils/form.validator";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { MywebsiteServer } from "@server/mywebsite";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { Auxiliary } from "@utils/auxiliary";
import { FormType } from "@views/websitemanage/website.operation/website.operation.attachement";
import { CustomTags } from "@components/customtags/custom.tags";


const Aux = new Auxiliary<string>();
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
            "websiteEdit"
        ])
    },
    components: {
        ModuleTitle,
        UpdateDiploma,
        CustomTags
    }
})

export class WebsiteOperation extends Vue {
    // init props
    public operation: "add" | "editor";

    // init computed
    public websiteEdit: WebEditType;

    // init data
    public form: FormType = {
        cid: "",
        domain: "",
        http_port: [80],
        https_port: [443],
        industry: "金融",
        name: "",
        open_waf: 0,
        source_info: [],
        source_type: "A",
        remark: "",
        id: "",
    };
    public unwatch: Function = () => { };

    // 标题
    public titles: string[] = [];



    // 协议类型复选框
    public httpTpye: boolean = true;
    public httpsTpye: boolean = false;
    // 协议类型 输入框控制
    public showHttpTag: boolean = true;
    public HttpInfo: string = "";
    public HttpInputVisible: any = false;


    public showHttpsTag: boolean = true;
    public HttpsInfo: string = "";
    public HttpsInputVisible: any = false;



    // 回源方式单选框
    public sourceIP: number = 0; // 0 表示 IP 1 表示域名
    public sourceInputVisible: boolean = false;

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
        this.titles = this.operation === "add" ? ["添加网站"] : ["编辑网站"];
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(MYWEBSITEEVENT.GETWEBEDIT, { website_id: id, operation: this.operation });
        }
        let eventId = EventBus.register(CONSTANT.GETWEBEDIT, function (event: string, info: any) {
            that.form.name = that.websiteEdit[id].name;
            that.form.domain = that.websiteEdit[id].domain;
            that.form.http_port = that.websiteEdit[id].port.http_port;
            that.form.https_port = that.websiteEdit[id].port.https_port;
            that.form.industry = that.websiteEdit[id].industry;
            that.form.source_info = that.websiteEdit[id].source_info;
            that.form.remark = that.websiteEdit[id].remark;
            // 判断返回状态
            if (that.websiteEdit[id].open_waf === "防御") {
                that.form.open_waf = 0;
            } else {
                that.form.open_waf = 1;
            }

            // 判断回源类型所属框
            if (that.websiteEdit[id].source_type === "回源IP") {
                that.sourceIP = 0;
            } else {
                that.sourceIP = 1;
            }
        });
        Aux.insertId(eventId);
        console.log(this.form);

    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
        this.unwatch();

    }

    // init methods

    // 获取证书CID
    diplomaCid(id: string) {
        this.form.cid = id;
    }

    handle(type: "updateDiploma") {
        if (type === "updateDiploma") {
            this.dialogVisibleDiploma = true;
        }
    }

    // 控制多选框不能少选
    chooseHttpType() {
        if (!this.httpsTpye && !this.httpTpye) {
            this.$message({
                message: "协议类型必须选择一个",
                type: "warning"
            });
            this.httpTpye = true;
        }
    }


    handleSourceInputConfirm() {
        // if (this.form.source_type === "A") {
        //     // ip
        //     let ipReg = new RegExp("^(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2}).(2[0-5]{2}|2[0-4][0-9]|1?[0-9]{1,2})$");
        //     if (!ipReg.test(inputValue)) {
        //         this.$message({
        //             message: "回源IP格式不正确",
        //             type: "warning"
        //         });
        //         return;
        //     }
        // } else {
        //     let sourceReg = new RegExp("^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$");
        //     if (!sourceReg.test(inputValue)) {
        //         console.log(sourceReg.test(inputValue));
        //         this.$message({
        //             message: "回源域名格式不正确",
        //             type: "warning"
        //         });
        //         return;
        //     }
        // }
    }


    handleHttpClose(tag: any) {
        this.form.http_port.splice(this.form.http_port.indexOf(tag), 1);
        if (this.form.http_port.length > 9) {
            this.showHttpTag = false;
        } else {
            this.showHttpTag = true;
        }
    }

    showHttpInput() {
        this.HttpInputVisible = true;
        // this.$nextTick( _  => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
    }

    handleHttpInputConfirm() {
        let inputValue = this.HttpInfo;
        console.log(this.HttpInfo);
        console.log(typeof this.form.http_port);

        let inputValueNum = parseInt(inputValue);
        if (inputValueNum) {
            this.form.http_port.push(inputValueNum);
        }
        if (this.form.http_port.length > 9) {
            this.showHttpTag = false;
        } else {
            this.showHttpTag = true;
        }
        this.HttpInputVisible = false;
        this.HttpInfo = "";
    }


    handleHttpsClose(tag: any) {
        this.form.https_port.splice(this.form.https_port.indexOf(tag), 1);
        if (this.form.https_port.length > 9) {
            this.showHttpsTag = false;
        } else {
            this.showHttpsTag = true;
        }
    }

    showHttpsInput() {
        this.HttpsInputVisible = true;
        // this.$nextTick( _  => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
    }

    handleHttpsInputConfirm() {
        let inputValue = this.HttpsInfo;
        console.log(typeof inputValue);
        let inputValueNum = parseInt(inputValue);
        if (inputValue) {
            this.form.https_port.push(inputValueNum);
        }
        console.log(this.form.https_port.length);
        if (this.form.https_port.length > 9) {
            this.showHttpsTag = false;
        } else {
            this.showHttpsTag = true;
        }
        this.HttpsInputVisible = false;
        this.HttpsInfo = "";
    }



    getTags(tags: string[]) {
        this.form.source_info = tags;
    }
    gethttpTags(tags: string[]) {
        this.form.http_port = tags;
    }
    gethttpsTags(tags: string[]) {
        this.form.https_port = tags;
    }


    // "formbasic","formserver"
    submitForm(formBasic: string, formServer: string) {
        let temp: any = this.$refs[formBasic];
        console.log(this.form.cid);
        if (!this.httpsTpye) {
            this.form.cid = "";
        } else {
            if (this.form.cid === "") {
                this.$message({
                    message: "请上传证书",
                    type: "warning"
                });
                return;
            }
        } 

        switch (this.operation) {
            case "add":
                let httpsTemp: any = "";
                httpsTemp = this.form.https_port;
                if (this.httpsTpye === false) {
                    this.form.https_port = [];
                }
                MywebsiteServer.addWebsite(this.form).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            this.$message({
                                message: "创建用户成功",
                                type: "success"
                            });
                            this.form.https_port = httpsTemp;
                            this.$router.push("/WebsiteManagement/myWebsite");
                            break;
                        case "error":
                            this.$message({
                                message: res.message,
                                type: "error"
                            });
                            break;    
                        default:
                            break;
                    }
                });
                break;
            case "editor":
                let id = this.$route.params.id;
                this.form.id = id;
                MywebsiteServer.updateWebsite(this.form).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            this.$message({
                                message: "编辑用户成功",
                                type: "success"
                            });
                            this.$router.push("/WebsiteManagement/myWebsite");
                            break;
                        default:
                            break;
                    }
                });
            default:
                break;
        }




        // 当HTTPS没被选中且有值的时候 提交表单的时候应该提交空值

    }

    back() {
        this.$router.go(-1);
    }

    // 协议类型复选框
    changeSoure(val: any) {
        if (val === 0) {
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