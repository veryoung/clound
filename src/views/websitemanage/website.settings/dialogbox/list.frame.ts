import { ResType } from "@server/index";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Component from "vue-class-component";
import { AxiosResponse } from "axios";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";
import { DiplomaBaseClass } from "@views/base/base.class";


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
export class ListFrame extends DiplomaBaseClass {
    // init props
    public types: string;
    public data: FormType;
    // init data
    public form: {
        ip: string[];
        url: string[];
    } = {
        ip: [""],
        url: [""]
    };
    public defalutUrl: string[] = [];
    public defalutIP: string[] = [];
    public UrlState: boolean = true;
    public ipState: boolean = true;


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
            if (this.RegValidate.uri(tagVal)) {
                done(true);
                this.defalutUrl.push(tagVal);
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            this.UrlState = false;
            done();
        }
    }

    getIpTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.defalutIP.indexOf(tagVal);
            this.defalutIP.splice(index, 1);
            done(true);
        } else {
            if (this.RegValidate.ip(tagVal)) {
                done(true);
                this.defalutIP.push(tagVal);
                return;
            }
            this.$notify({
                title: "提示",
                message: "输入格式不正确",
                type: "warning"
            });
            this.ipState = false;
            done();
        }
    }

    submit(formName: string) {
        let id = this.$route.params.id;
        let params: {
            sid: string;
            waf_ip_white?: string[];
            waf_url_white?: string[];
            waf_ip_black?: string[];
            waf_url_black?: string[];
        } = {
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

        if (!this.UrlState) {
            this.UrlState = true;
            return;
        }
        if (!this.ipState) {
            this.ipState = true;
            return;
        }
        MywebsiteServer.BWlist(params).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            // Do something with response data
            switch (res.status) {
                // "suc" | "error" | "red"
                case "suc":
                    this.$notify({
                        title: "提示",
                        type: "success",
                        message: "设置成功!"
                    });
                    this.cancel();
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
        this.close();
    }

    Urlerror(res: any) {
        this.$notify({
            title: "提示",
            message: res.message,
            type: "warning"
        });
        this.UrlState = false;
    }
    Iperror(res: any) {
        this.$notify({
            title: "提示",
            message: res.message,
            type: "warning"
        });
        this.ipState = false;
    }
}
