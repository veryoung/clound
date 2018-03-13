import { WebEditType } from "@store/mywebsite.type";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { UpdateDiploma } from "./dialogbox/update.diploma";
import { FormRuleType } from "@utils/form.validator";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { ModuleTitle } from "@components/title/module.title";
import { MywebsiteServer } from "@server/mywebsite";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { CustomTags } from "@components/customtags/custom.tags";
import { BaseLibrary } from "@views/base/base.class";


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

export class WebsiteOperation extends BaseLibrary {
    // init props
    public operation: "add" | "editor";

    // init computed
    public websiteEdit: WebEditType;

    // init data
    public Aux = new this.Auxiliary<string>();
    public form: {
        cid: string;
        domain: string;
        http_port: number[];
        https_port: number[];
        industry: string;
        name: string;
        open_waf: string;
        source_info: number | string[];
        source_type: string;
        remark: string;
        id: string;
        has_key: string;
    } = {
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
            has_key: "",
        };

    // 标题
    public titles: string[] = [];

    // 上传证书的文字提示
    public diplomaText: string = "上传证书";

    // 是否是编辑状态
    public isEdit: boolean = false;

    // 协议类型复选框
    public httpTpye: boolean = true;
    public httpsTpye: boolean = false;
    // 协议类型 输入框控制
    public httpTags: any = [80];
    public httpsTags: any = [443];
    // 回源方式单选框
    public sourceIP: number = 0; // 0 表示 IP 1 表示域名
    public sourceInputVisible: boolean = false;
    public sourceIPData: Array<string> = [];
    public sourceDomainData: Array<string> = [];


    // 上传证书
    public dialogVisibleDiploma: boolean = false;
    // 表单验证
    public Domainpass: any = (rule: string, value: string, callback: Function) => {
        if (value === "") {
            callback(new Error("请输入网站域名"));
        } else {
            let pattern = /[-_\.\w]+\.(?:com.cn|ne.cn|com.cn|net.cn|org.cn|gov.cn|net|org|com|cn|cc|me|tel|mobi|asia|biz|info|name|tv|hk)$/;
            let reg = pattern.test(value);
            if (!reg) {
                callback(new Error("请输入正确的网站域名"));
            } else {
                callback();
            }
        }


    }
    public rules: FormRuleType = {
        name: [
            { required: true, message: "请填写网站名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
        domain: [
            { validator: this.Domainpass, trigger: "blur", required: true, },
        ],

    };



    // init lifecircle hook
    created() {
        this.titles = this.operation === "add" ? ["添加网站"] : ["编辑网站"];
        this.isEdit = this.operation === "add" ? false : true;
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(MYWEBSITEEVENT.GETWEBEDIT, { website_id: id, operation: this.operation });
        }
        let eventId = this.EventBus.register(this.CONSTANT.GETWEBEDIT, function (event: string, info: any) {
            that.form.name = that.websiteEdit[id].name;
            that.form.domain = that.websiteEdit[id].domain;
            let http_porttemp: any = that.websiteEdit[id].port.http_port;
            that.form.http_port = http_porttemp;
            let https_porttemp: any = that.websiteEdit[id].port.https_port;
            that.form.https_port = https_porttemp;
            that.form.industry = that.websiteEdit[id].industry;
            that.form.source_info = that.websiteEdit[id].source_info;
            that.form.remark = that.websiteEdit[id].remark;
            that.form.source_type = that.websiteEdit[id].source_type;
            that.form.open_waf = that.websiteEdit[id].open_waf;
            that.form.has_key = that.websiteEdit[id].has_key;
            // 判断回源类型所属框
            if (that.form.source_type === "回源IP") {
                that.sourceIP = 0;
                that.sourceIPData = that.form.source_info;
            } else {
                that.sourceIP = 1;
                that.sourceDomainData = that.form.source_info;
            }
            // 判断端口值
            that.httpTags = that.form.http_port;
            that.httpsTags = that.form.https_port;
            if (that.httpsTags.length !== 0) {
                that.httpsTpye = true;
                that.diplomaText = "更新证书";
            }
            // 如果没有HTTP， 应该默认不选中
            if (that.httpTags.length === 0) {
                that.httpTpye = false;
            }
            // 判断回源
            if (that.form.open_waf === "回源") {
                that.form.open_waf = "0";
            } else {
                that.form.open_waf = "1";
            }

        });
        this.Aux.insertId(eventId);
    }

    destroyed() {
        this.Aux.getIds().map((id, $index) => {
            this.EventBus.unRegister(id);
        });
    }

    // init methods

    // 获取证书CID
    diplomaCid(id: string) {
        this.diplomaText = "更新证书";
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
            this.$notify({
                title: "提示",
                message: "协议类型必须选择一个",
                type: "warning"
            });
            this.httpTpye = true;
        }
    }


    getsourceIPTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.sourceIPData.indexOf(tagVal);
            this.sourceIPData.splice(index, 1);
            done(true);
        } else {
            if (this.RegValidate.ip(tagVal)) {
                done(true);
                this.sourceIPData.push(tagVal);
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }

    getsourceDomainTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.sourceDomainData.indexOf(tagVal);
            this.sourceDomainData.splice(index, 1);
            done(true);
        } else {
            if (this.RegValidate.domain(tagVal)) {
                done(true);
                this.sourceDomainData.push(tagVal);
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }
    containsPort(arr: Array<number>, obj: number) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    gethttpTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.httpTags.indexOf(tagVal);
            this.httpTags.splice(index, 1);
            done(true);
        } else {
            if (!/^[0-9]+$/.test(tagVal)) {
                this.$notify({
                    title: "提示",
                    message: "输入格式不正确",
                    type: "warning"
                });
                return;
            }
            let tagValNum: number = parseInt(tagVal);
            if (this.containsPort(this.httpTags, tagValNum)) {
                this.$notify({
                    title: "提示",
                    message: "请不要添加重复数据",
                    type: "warning"
                });
                return;
            }
            if (this.RegValidate.port(tagVal)) {
                done(true);
                this.httpTags.push(parseInt(tagVal));
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }

    gethttpsTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.httpsTags.indexOf(tagVal);
            this.httpsTags.splice(index, 1);
            done(true);
        } else {
            if (!/^[0-9]+$/.test(tagVal)) {
                this.$notify({
                    title: "提示",
                    message: "输入格式不正确",
                    type: "warning"
                });
                return;
            }
            let tagValNum: number = parseInt(tagVal);
            if (this.containsPort(this.httpsTags, tagValNum)) {
                this.$notify({
                    title: "提示",
                    message: "请不要添加重复数据",
                    type: "warning"
                });
                return;
            }
            if (this.RegValidate.port(tagVal)) {
                done(true);
                this.httpsTags.push(parseInt(tagVal));
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }


    // "formbasic","formserver"
    submitForm(formBasic: string) {
        let temp: any = this.$refs[formBasic];
        let flag: boolean = false;
        temp.validate((valid: any) => {
            flag = valid;
        });
        if (flag) {
            if (!this.httpsTpye) {
                this.form.cid = "";
            } else {
                if (this.form.https_port && this.form.https_port.length === 0) {
                    this.$notify({
                        title: "提示",
                        message: "请输入https端口",
                        type: "warning"
                    });

                    return;
                }
                if (this.form.cid === "" && this.form.https_port.length === 0) {
                    this.$notify({
                        title: "提示",
                        message: "请上传证书",
                        type: "warning"
                    });
                    return;
                }
            }
            // 验证回源域名问题
            if (this.sourceIP === 0) {
                this.form.source_info = this.sourceIPData;
            } else {
                this.form.source_info = this.sourceDomainData;
            }
            // 验证回源方式的问题
            if (this.form.source_type === "回源IP") {
                this.form.source_type = "A";
            } else if (this.form.source_type === "回源域名") {
                this.form.source_type = "CNAME";
            }
            let httpsTemp: any = "";
            httpsTemp = this.form.https_port;
            this.form.http_port = this.httpTags;
            this.form.https_port = this.httpsTags;
            if (this.httpsTpye === false) {
                this.form.https_port = [];
            }
            if (this.httpTpye === false) {
                this.form.http_port = [];
            }

            switch (this.operation) {
                case "add":
                    MywebsiteServer.addWebsite(this.form).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "创建网站成功",
                                    type: "success"
                                });
                                this.form.https_port = httpsTemp;
                                this.$router.push("/WebsiteManagement/myWebsite");
                                break;
                            case "error":
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
                                this.$notify({
                                    title: "提示",
                                    message: "编辑网站成功",
                                    type: "success"
                                });
                                this.form.https_port = httpsTemp;
                                this.$router.push("/WebsiteManagement/myWebsite");
                                break;
                            default:
                                break;
                        }
                    });
                default:
                    break;
            }
        }


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
    error(res: any) {
        this.$notify({
            title: "提示",
            message: res.message,
            type: "warning"
        });
    }
}