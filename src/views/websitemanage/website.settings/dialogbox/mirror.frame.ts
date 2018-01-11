import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";



require("./mirror.frame.styl");
@Component({
    name: "mirrorframe",
    template: require("./mirror.frame.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: String
        },
        data: Array,
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
    public data: any;
    public mirrcyc: Number;
    // init data
    public form: MirrorType = {
        mirror_urls: [""],
    };
    public defalutUrl: Array<string>;


    created() {
        this.defalutUrl = this.data;
    }

    getTags(tags: string[]) {
        this.form.mirror_urls = tags;
    }

    submit(formName: string) {
        let id = this.$route.params.id;
        let params = { 
            sid: id,
            urls: this.form.mirror_urls,
            interval: this.mirrcyc
        };
        // 提交成功后将数据传给父组件
        this.$emit("MirrorData", this.form.mirror_urls);
        MywebsiteServer.mirror(params).then( (response: AxiosResponse<ResType>) => {
            console.log(response);
            this.cancel();

        });
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface MirrorType {
    mirror_urls: Array<string>;
}