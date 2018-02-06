import Component from "vue-class-component";
import { DetailBaseClass } from "@views/base/base.class";

const imgurl = require("../../../resource/images/404.svg");
require("../error.styl");
@Component({
    template: require("./404.html"),
    name: "notfound"
})
export class NotFound extends DetailBaseClass {
    get imgurl() {
        return imgurl;
    }
}