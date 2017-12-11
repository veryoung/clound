import Component from "vue-class-component";
import Vue from "vue";


import { Custom } from "@components/custom/custom";


@Component({
    name: "entry",
    components: { Custom },
    template: require("./entry.html")
})
export class Entry extends Vue {

}