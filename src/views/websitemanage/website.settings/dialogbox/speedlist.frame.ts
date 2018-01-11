import { MywebsiteServer } from "@server/mywebsite";
import { CustomTags } from "@components/customtags/custom.tags";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";


require("./speedlist.frame.styl");
@Component({
    name: "speedlistframe",
    template: require("./speedlist.frame.html"),
    props: {
        dialogVisible: Boolean,
        types: String,
    },
    components: {
        CustomTags
    }
})
export class SpeedListFrame extends Vue {
    // init props
    public types: string;
    // init data
    public form: SpeedListType = {
        cache_url_black: [""],
    };

    getTags(tags: string[]) {
        this.form.cache_url_black = tags;
    }

    submit(formName: string) {
        let id = this.$route.params.id;
        let params = {
            sid: id,
            cache_url_black: this.form.cache_url_black,
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

export interface SpeedListType {
    cache_url_black: Array<string>;
}