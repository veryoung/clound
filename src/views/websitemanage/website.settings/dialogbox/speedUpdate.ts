import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./speedUpdate.styl");
@Component({
    name: "speedupdateframe",
    template: require("./speedUpdate.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
    }
})
export class SpeedUpdateFrame extends Vue {
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