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
    public data: any;

    // init data
    public form: DenfenType = {
        waf_hotlink_white: [""],
    };
    public defalutUrl: Array<string>;
    
    created() {
        this.defalutUrl = this.data.waf_hotlink_white;
        console.log(this.defalutUrl);
    }
    getTags(tags: string[]) {
        this.form.waf_hotlink_white = tags;
    }

    submit(formName: string) {
        let id = this.$route.params.id;
        let params = {
            sid: id,
            waf_hotlink_white: this.form.waf_hotlink_white,
        };
        MywebsiteServer.BWlist(params).then( (response: AxiosResponse<ResType>) => {
            console.log(response);
            this.cancel();
        });
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface DenfenType {
    waf_hotlink_white: Array<string>;
}