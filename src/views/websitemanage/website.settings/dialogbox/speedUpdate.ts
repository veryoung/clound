import { ResType } from "@server/index";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { AxiosResponse } from "axios";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";
import { DiplomaBaseClass } from "@views/base/base.class";


require("./speedUpdate.styl");
@Component({
    name: "speedupdateframe",
    template: require("./speedUpdate.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
        data: Object,
    },
    components: {
        CustomTags
    } 
})
export class SpeedUpdateFrame extends DiplomaBaseClass {
    // init props
    public types: string;
    public data: FormType;

    // init data
    public form: SpeedUpdateType = {
        url: [""],
    };
    public defalutUrl: Array<string>;
    public UrlState: boolean = true;

    created() {
        this.defalutUrl = this.data.cache_urls;
    }

    submit(formName: string) {
        let params = {
            sid: this.$route.params.id,
            url: this.defalutUrl,
        };
        if (!this.UrlState) {
            this.UrlState = true;
            return;
        }
        this.$confirm("是否对指定URL进行刷新？", "指定URL刷新", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            MywebsiteServer.cache(params).then( (response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                console.log(res);
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.$notify({
                            title: "提示",
                            type: "success",
                            message: "刷新成功!"
                        });
                        this.cancel();
                        break;
                    case "error":
    
                        break;
                }
            });
        }).catch(() => {

        });
    }

    getTags(tagVal: string, type: string, done: Function) {
        if ( type === "del") {
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

    cancel() {
        this.close();
    }

    error(res: any) {
        this.$notify({
            title: "提示",
            message: res.message,
            type: "warning"
        });
        this.UrlState = false;
    }
}

export interface SpeedUpdateType {
    url: Array<string>;
}