import Component from "vue-class-component";
import Vue from "vue";



require("./module.title.styl");
@Component({
    name: "module.title",
    template: require("./module.title.html"),
    props: {
        title: {
            type: String,
            default: "默认标题"
        }
    }
})
export class ModuleTitle extends Vue {
    // init props
    public title: string;
}