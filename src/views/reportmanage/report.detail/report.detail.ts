import Component from "vue-class-component";
import Vue from "vue";
import { ListBaseClass, DetailBaseClass } from "@views/base/base.class";
const pdfjs = require("pdfjs-dist");



require("./report.detail.styl");
@Component({
    name: "ReportDetail",
    template: require("./report.detail.html"),
})
export class ReportDetail extends DetailBaseClass {
    // lifecircle hook
    mounted() {
        let id = this.$route.params.id;
        let name = this.$route.params.name;
        let report_url = `/cache/report/${id}/${name}.pdf`;
        let loadingTask = pdfjs.getDocument(report_url);
        loadingTask.promise.then(function (pdf: any) {
            // Fetch the first page
            let pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page: any) {
                let scale = 1.5;
                let viewport = page.getViewport(scale);

                // Prepare canvas using PDF page dimensions
                let canvas: any = document.getElementById("the-canvas");
                let context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                let renderTask = page.render(renderContext);
                renderTask.then(function () {
                });
            });
        }, function (reason: string) {
            // PDF loading error
        });
    }
} 