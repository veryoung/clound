import Component from "vue-class-component";
import Vue from "vue";
const pdfjs = require("pdfjs-dist");



require("./report.detail.styl");
@Component({
    name: "ReportDetail",
    template: require("./report.detail.html"),
})
export class ReportDetail extends Vue {
    // lifecircle hook
    mounted() {
        let id = this.$route.params.id;
        let name = this.$route.params.name;
        let report_url = `/templates/report/${id}/${name}.pdf`;
        let loadingTask = pdfjs.getDocument(report_url);
        loadingTask.promise.then(function (pdf: any) {
            console.log("PDF loaded");

            // Fetch the first page
            let pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page: any) {
                console.log("Page loaded");

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
                    console.log("Page rendered");
                });
            });
        }, function (reason: string) {
            // PDF loading error
            console.error(reason);
        });
    }
} 