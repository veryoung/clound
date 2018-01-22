import { ModuleTitle } from "@components/title/module.title";
import { FooterComponent } from "@components/layout/footer/footer";
import  Vue  from "vue";
import  Component  from "vue-class-component";


require("./home.styl");
@Component({
    name: "home",
    components: {
        FooterComponent,
        ModuleTitle,
    },
    template: require("./home.html"),
})

export class Home extends Vue {

    // data
    public date: any =  new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

    // methods
    refresh() {

    }
}