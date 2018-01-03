import Component from "vue-class-component";
import Vue from "vue";


require("./footer.styl");
@Component({
    name: "headercomponent",
    template: require("./footer.html"),
    props: {
        message: {
            type: String,
            default: "© 2016-2017 中国电子科技网络信息安全有限公司 版权所有"
        }
    }
})
export class FooterComponent extends Vue {
    // init props
    public message: string = "© 2016-2017 中国电子科技网络信息安全有限公司 版权所有";
}