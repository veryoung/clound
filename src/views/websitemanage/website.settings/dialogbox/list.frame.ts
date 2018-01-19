import { RegValidate } from "./../../../../utils/form.validator";
import { ResType } from "@server/index";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";


require("./list.frame.styl");
@Component({
    name: "listframe",
    template: require("./list.frame.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
        data: Object,
    },
    components: {
        CustomTags
    }
})
export class ListFrame extends Vue {
    // init props
    public types: string;
    public data: FormType;
    // init data
    public form: ListFrameType = {
        ip: [""],
        url: [""]
    };
    public defalutUrl: Array<string>;
    public defalutIP: Array<string>;


    created() {
        console.log(this.data);
        if (this.types === "white") {
            this.defalutIP = this.data.waf_ip_white;
            this.defalutUrl = this.data.waf_url_white;
        } else {
            this.defalutIP = this.data.waf_ip_black;
            this.defalutUrl = this.data.waf_url_black;
        }
    }
    // init methods
    getURLTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.defalutUrl.indexOf(tagVal);
            this.defalutUrl.splice(index, 1);
            done(true);
        } else {
            if (RegValidate.uri(tagVal)) {
                done(true);
                this.defalutUrl.push(tagVal);
                return;
            }
            this.$message({
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }

    getIpTags(tagVal: string, type: string, done: Function) {
        console.log(tagVal);
        if (type === "del") {
            let index = this.defalutIP.indexOf(tagVal);
            this.defalutIP.splice(index, 1);
            done(true);
        } else {
            if (RegValidate.ip(tagVal)) {
                done(true);
                this.defalutIP.push(tagVal);
                return;
            }
            this.$message({
                message: "输入格式不正确",
                type: "warning"
            });
            done();
        }
    }

    submit(formName: string) {
        let id = this.$route.params.id;
        let params: ListParamsType = {
            sid: "",
            waf_ip_white: [""],
            waf_url_white: [""],
            waf_ip_black: [""],
            waf_url_black: [""]
        };
        if (this.types === "white") {
            params = {
                sid: id,
                waf_ip_white: this.defalutIP,
                waf_url_white: this.defalutUrl
            };
        } else {
            params = {
                sid: id,
                waf_ip_black: this.defalutIP,
                waf_url_black: this.defalutUrl
            };
        }
        MywebsiteServer.BWlist(params).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            // Do something with response data
            switch (res.status) {
                // "suc" | "error" | "red"
                case "suc":
                    this.$message({
                        type: "success",
                        message: "设置成功!"
                    });
                    this.cancel();
                    break;
                case "error":
                    break;
                case "red":
                    break;
            }
        });
    }

    cancel() {
        if (this.types === "white") {
            this.form.ip = this.data.waf_ip_white;
            this.form.url = this.data.waf_url_white;
        } else {
            this.form.ip = this.data.waf_ip_black;
            this.form.url = this.data.waf_url_black;
        }
        this.$emit("close", false);
    }

    error(res: any) {
        this.$message({
            message: res.message,
            type: "warning"
        });
    }
}

export interface ListFrameType {
    ip: Array<string>;
    url: Array<string>;
}

export interface ListParamsType {
    sid: string;
    waf_ip_white?: Array<string>;
    waf_url_white?: Array<string>;
    waf_ip_black?: Array<string>;
    waf_url_black?: Array<string>;
}