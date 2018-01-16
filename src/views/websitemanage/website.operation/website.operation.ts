import { WebEditType } from "@store/mywebsite.type";
import { EventBus, CONSTANT } from "@utils/event";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { UpdateDiploma } from "./dialogbox/update.diploma";
import { FormRuleType, RegValidate } from "@utils/form.validator";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { MywebsiteServer } from "@server/mywebsite";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { Auxiliary } from "@utils/auxiliary";
import { FormType, TagType } from "@views/websitemanage/website.operation/website.operation.attachement";
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

    // 标题
    public titles: string[] = [];



    // 协议类型复选框
    public httpTpye: boolean = true;
    public httpsTpye: boolean = false;
    // 协议类型 输入框控制
    public httpTags: TagType[] = [];
    public httpsTags: TagType[] = [];
    // 回源方式单选框
    public sourceIP: number = 0; // 0 表示 IP 1 表示域名
    public sourceInputVisible: boolean = false;
    public sourceIPData: Array<string> = [];
    public sourceDomainData: Array<string> = [];
    public ipTags: Array<TagType> = [];
    public domainTags: Array<TagType> = [];


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
            // 判断回源类型所属框
            let sourceArray: Array<TagType> = [];
            for ( let key in that.form.source_info) {
                sourceArray.push({
                    title: that.form.source_info[key],
                    type: "" 
                });
            }
            if (that.form.source_type === "A") {
                that.sourceIP = 0;
                that.sourceIPData = that.form.source_info;
                that.ipTags = sourceArray;
            } else {
                that.sourceIP = 1;
                that.domainTags = sourceArray;
            }

            console.log(that.form);
        });
        Aux.insertId(eventId);
    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
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


    getsourceIPTags(tagVal: string, done: Function) {
        if (RegValidate.ip(tagVal)) {
            done(true);
            this.sourceIPData.push(tagVal);
            return;
        }
        this.$message({
            message: "输入格式不正确",
            type: "warning"
        });
        done();
    }

    getsourceDomainTags(tagVal: string, done: Function) {
        if (RegValidate.domain(tagVal)) {
            done(true);
            this.sourceDomainData.push(tagVal);
            return;
        }
        this.$message({
            message: "输入格式不正确",
            type: "warning"
        });
        done();
    }

    gethttpTags(tagVal: string, done: Function) {
        if (RegValidate.port(tagVal)) {
            done(true);
            if (this.form.http_port) this.form.http_port.push(parseInt(tagVal));
            return;
        }
        this.$message({
            message: "输入格式不正确",
            type: "warning"
        });
        done();
    }

    gethttpsTags(tagVal: string, done: Function) {
        if (RegValidate.port(tagVal)) {
            done(true);
            if (this.form.https_port) this.form.https_port.push(parseInt(tagVal));
            return;
        }
        this.$message({
            message: "输入格式不正确",
            type: "warning"
        });
        done();
    }


    // "formbasic","formserver"
    submitForm(formBasic: string, formServer: string) {
        let temp: any = this.$refs[formBasic];
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
        console.log(this.form.source_info);
        // 验证回源域名问题
        if (this.sourceIP === 0) {
            this.form.source_info = this.sourceIPData;
        } else {
            this.form.source_info = this.sourceDomainData;
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

    // 错误提示
    httpError(res: any) {
        this.$message({
            message: res.message,
            type: "warning"
        });
    }
}