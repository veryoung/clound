import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
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
})
export class ListFrame extends Vue {
    // init props
    public types: string;
    public data: any;
    // init data
    public form: ResetType = {
        ip: "",
        url: ""
    };

    

    created() { 
        if ( this.types === "white") {
            this.form.ip = "11";
            this.form.url = this.data.waf_url_white[0];
        } else {
            this.form.ip = "22";
            this.form.url = this.data.waf_url_black[0];
        }
    }
    /**
     *     required?: boolean;
    message?: string;
    trigger?: string;
    validator?: Function;
    min?: number;
    max?: number;
     */

    // init methods

    submit(formName: string) {
 
    }

    cancel() {
        this.$emit("close", false);
    }
}

export interface ResetType {
    ip: string;
    url: string;
}