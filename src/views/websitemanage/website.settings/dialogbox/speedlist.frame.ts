import { RegValidate } from "./../../../../utils/form.validator";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";
import { DiplomaBaseClass } from "@views/base/base.class";


require("./speedlist.frame.styl");
@Component({
    name: "speedlistframe",
    template: require("./speedlist.frame.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
        data: Object,
    },
    components: {
        CustomTags
    }
})
export class SpeedListFrame extends DiplomaBaseClass {
    // init props
    public types: string;
    public data: FormType;

    // init data
    public form: SpeedListType = {
        cache_url_black: [""],
    };
    public defalutUrl: Array<string>;
    public UrlState: boolean = true;

    created() {
        this.defalutUrl = this.data.cache_url_black;
    }

    getTags(tagVal: string, type: string, done: Function) {
        if ( type === "del") {
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
            this.UrlState = false;
        }
    }


    submit(formName: string) {
        let id = this.$route.params.id;
        let params = {
            sid: id,
            cache_url_black: this.defalutUrl,
        };
        if (!this.UrlState) {
            this.UrlState = true;
            return;
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
        this.close();
    }

    error(res: any) {
        this.$message({
            message: res.message,
            type: "warning"
        });
        this.UrlState = false;
    }
}

export interface SpeedListType {
    cache_url_black: Array<string>;
}