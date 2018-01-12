import { ResType } from "@server/index";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


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
    public data: any;

    // init data
    public form: SpeedUpdateType = {
        url: [""],
    };
    public defalutUrl: Array<string>;

    /**
     *     required?: boolean;
    message?: string;
    trigger?: string;
    validator?: Function;
    min?: number;
    max?: number;
     */

    // init methods

    created() {
        this.defalutUrl = this.data.cache_urls;
        console.log(this.defalutUrl);

    }

    submit(formName: string) {
        let params = {
            sid: this.$route.params.id,
            url: this.form.url,
        };
        this.$confirm("是否对指定URL进行刷新？", "指定URL刷新", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            MywebsiteServer.cache(params).then( (response: AxiosResponse<ResType>) => {
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
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消刷新"
            });
        });
    }

    getTags(tags: string[]) {
        this.form.url = tags;
    }


    cancel() {
        this.$emit("close", false);
    }
}

export interface SpeedUpdateType {
    url: Array<string>;
}