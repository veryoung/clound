import { RegValidate } from "./../../../../utils/form.validator";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./defen.frame.styl");
@Component({
    name: "denfenframe",
    template: require("./defen.frame.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: String
        },
        data: Object,
    },
    components: {
        CustomTags
    }
})
export class DenfenFrame extends Vue {
    // init props
    public uid: string;
    public data: FormType;

    // init data
    public form: DenfenType = {
        waf_hotlink_white: [""],
    };
    public defalutUrl: Array<string>;
    
    created() {
        this.defalutUrl = this.data.waf_hotlink_white;
        console.log(this.defalutUrl);
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

    submit(formName: string) {
        let id = this.$route.params.id;
        let params = {
            sid: id,
            waf_hotlink_white: this.defalutUrl,
        };
        MywebsiteServer.BWlist(params).then( (response: AxiosResponse<ResType>) => {
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
                    this.$message({
                        type: "error",
                        message: res.message
                    });
                    break;
                case "red":
                    break;
            }
        });
    }

    cancel() {
        this.$emit("close", false);
    }

    error(res: any) {
        this.$message({
            message: res.message,
            type: "warning"
        });
    }
}

export interface DenfenType {
    waf_hotlink_white: Array<string>;
}