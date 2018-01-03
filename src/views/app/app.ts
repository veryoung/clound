import Component from "vue-class-component";
import Vue from "vue";

import { Custom } from "@components/custom/custom";


require("./app.styl");
@Component({
    name: "entry",
    components: { 
        Custom, 
    },
    template: require("./app.html"),
})
export class Entry extends Vue {
}