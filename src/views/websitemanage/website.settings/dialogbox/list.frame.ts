import { ResType } from "@server/index";
import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


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
    public data: any;
    // init data
    public form: ListFrameType = {
        ip: [""],
        url: [""]
    };
    public defalutUrl: Array<string>;
    public defalutIP: Array<string>;


    created() {
        if (this.types === "white") {
            this.defalutIP = this.data.waf_ip_white;
            this.defalutUrl = this.data.waf_url_white;
        } else {
            this.defalutIP = this.data.waf_ip_black;
            this.defalutUrl = this.data.waf_url_black;
        }
    }
    // init methods
    getURLTags(tags: string[]) {
        this.form.url = tags;
    }

    getIpTags(tags: string[]) {
        this.form.ip = tags;
    }


    submit(formName: string) {
        let id = this.$route.params.id;
        let params = {

        };
        if (this.types === "white") {
            params = {
                sid: id,
                waf_ip_white: this.form.ip, 
                waf_url_white: this.form.url 
            };
        } else {
            params = {
                sid: id,
                waf_ip_black: this.form.ip, 
                waf_url_black: this.form.url 
            };
        }
        MywebsiteServer.BWlist(params).then( (response: AxiosResponse<ResType>) => {
            console.log(response);
            this.cancel();
        });
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface ListFrameType {
    ip: Array<string>;
    url: Array<string>;
}