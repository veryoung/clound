import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import ElementUI from "element-ui";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./list.frame.styl");
@Component({
    name: "listframe",
    template: require("./list.frame.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
    }
})
export class ListFrame extends Vue {
    // init props
    public types: string;
    // init data
    public form: ResetType = {
        pwd1: "",
        pwd: ""
    };
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
    pwd: string;
    pwd1: string;
}