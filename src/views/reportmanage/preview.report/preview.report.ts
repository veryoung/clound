import Component from "vue-class-component";
import Vue from "vue";
import { BarComponent } from "@components/echarts/bar/bar";
import { PieComponent } from "@components/echarts/pie/pie";
import { LineComponent } from "@components/echarts/line/line";
import * as config from "./preview.report.attachment";





require("./preview.report.styl");
@Component({
    name: "PreviewReport",
    template: require("./preview.report.html"),
    components: {
        BarComponent, PieComponent, LineComponent
    }
})
export class PreviewReport extends Vue {
    // init computed
    get barConfig() {
        return config.barConfig;
    }

    get lineConfig() {
        return config.lineConfig;
    }

    get pieConfig() {
        return config.pieConfig;
    }
}