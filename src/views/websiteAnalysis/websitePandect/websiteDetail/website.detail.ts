import { LineComponent } from "@components/echarts/line/line";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";

require("./website.detail.styl");
@Component({
    name: "websitedetail",
    components: {
        ModuleTitle,
        LineComponent,
    },
    template: require("./website.detail.html"),
})

export class WebsiteDetail extends Vue {
    // init computed
    // init data
    public titles: string[] = ["安全评级"];

    public form: any = {
        datePicker: "今天",
    };
    // lifecircle hook 
    created() {

    }
    // 选择方法
    exportChoose() {
        
    }
}