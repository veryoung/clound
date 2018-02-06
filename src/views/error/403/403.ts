import Component from "vue-class-component";
import { DetailBaseClass } from "@views/base/base.class";

const imgurl = require("../../../resource/images/403.svg");
require("../error.styl");
@Component({
    template: require("./403.html"),
    name: "forbidden"
})
export class Forbidden extends DetailBaseClass {
    get imgurl() {
        return imgurl;
    }
}