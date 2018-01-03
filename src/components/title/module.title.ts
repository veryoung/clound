import Component from "vue-class-component";
import Vue from "vue";



require("./module.title.styl");
@Component({
    name: "moduletitle",
    template: require("./module.title.html"),
    props: {
        titles: {
            type: Array,
            default: ["默认标题"]
        }
    }
})
export class ModuleTitle extends Vue {
    // init props
    public titles: Array<string>;
}