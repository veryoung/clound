import Component from "vue-class-component";
import Vue from "vue";
import { PreviewReport } from "@views/reportmanage/previewreport/preview.report";



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