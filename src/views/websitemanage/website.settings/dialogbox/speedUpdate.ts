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
export class SpeedUpdateFrame extends Vue {
    // init props
    public types: string;
    public data: FormType;

    // init data
    public form: SpeedUpdateType = {
        url: [""],
    };
    public defalutUrl: Array<string>;

    created() {
        this.defalutUrl = this.data.cache_urls;
    }

    submit(formName: string) {
        let params = {
            sid: this.$route.params.id,
            url: this.defalutUrl,
        };
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
                        this.$message({
                            type: "success",
                            message: "刷新成功!"
                        });
                        this.cancel();
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消刷新"
            });
        });
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
        }
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface SpeedUpdateType {
    url: Array<string>;
}