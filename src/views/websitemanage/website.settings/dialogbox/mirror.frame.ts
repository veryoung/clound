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



require("./mirror.frame.styl");
@Component({
    name: "mirrorframe",
    template: require("./mirror.frame.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: String
        },
        data: Object,
        mirrcyc: Number,

    },
    components: {
        CustomTags
    },
    computed: {
    }
})
export class MirrorFrame extends Vue {
    // init props
    public uid: string;
    public data: FormType;
    public mirrcyc: Number | "";
    // init data
    public form: MirrorType = {
        mirror_urls: [""],
    };
    public defalutUrl: Array<string>;


    created() {
        this.defalutUrl = this.data.mirror_urls;
    }
    getTags(tagVal: string, type: string, done: Function) {
        if (type === "del") {
            let index = this.defalutUrl.indexOf(tagVal);
            this.defalutUrl.splice(index, 1);
            done(true);
        } else {
            done(true);
            this.defalutUrl.push(tagVal);
            return;
        }
    }


    submit(formName: string) {
        let id = this.$route.params.id;
        // if (this.mirrcyc === -1) {
        //     this.mirrcyc = "";
        // }
        let params = {
            sid: id,
            urls: this.defalutUrl,
            interval: this.mirrcyc
        };
        // 提交成功后将数据传给父组件
        this.$emit("MirrorData", this.defalutUrl);
        MywebsiteServer.mirror(params).then((response: AxiosResponse<ResType>) => {
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
        this.$emit("close", false);
    }
}

export interface MirrorType {
    mirror_urls: Array<string>;
}