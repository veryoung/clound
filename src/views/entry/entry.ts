import Component from "vue-class-component";
import Vue from "vue";


import { Custom } from "@components/custom/custom";
import { UserStatus } from "@utils/index";
import { BaseLibrary } from "@views/base/base.class";


require("./entry.styl");
@Component({
    name: "entry",
    components: { Custom },
    template: require("./entry.html"),
})
export class Entry extends BaseLibrary {
    // lifecircle hook 
    created() {
        new UserStatus();
    }

}