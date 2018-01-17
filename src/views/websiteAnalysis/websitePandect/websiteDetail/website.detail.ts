import Vue from "vue";
import Component from "vue-class-component";

require("./website.detail.styl");
@Component({
    name: "websitedetail",
    components: {

    },
    template: require("./website.detail.html"),
})

export class WebsiteDetail extends Vue {
    // init computed
    // init data
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