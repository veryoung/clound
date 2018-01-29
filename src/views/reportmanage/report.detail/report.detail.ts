import { PreviewReport } from "@views/reportmanage/preview.report/preview.report";
import Component from "vue-class-component";
import Vue from "vue";



require("./report.detail.styl");
@Component({
    name: "ReportDetail",
    template: require("./report.detail.html"),
    components: {
        PreviewReport
    }
})
export class ReportDetail extends Vue {

} 