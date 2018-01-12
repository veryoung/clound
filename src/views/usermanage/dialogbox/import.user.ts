import Component from "vue-class-component";
import Vue from "vue";
import { ResType } from "server";

require("./import.user.styl");
@Component({
    name: "imopotmodel",
    template: require("./import.user.html"),
    props: {
        dialogVisible: Boolean,
    },
})
export class ImportUserFrame extends Vue {
    // init data
    public dialogVisible: boolean;
    public loading: boolean = false;
    // lifecycle hook
    created() {

    }

    // init method
    exportTemplate() {
        let a = document.createElement("a");
        a.target = "_black";
        if (process.env.PLATFORM === "operation") {
            a.href = "/download/users_template_opc.xlsx";
        } else {
            a.href = "/download/users_template_portal.xls";
        }
        a.click();
    }


    importUser() {
        let temp: any = this.$refs.upload;
        temp.submit();
    }

    uploader(file: any) {
        if (/\.xls$/.test(file.name) || /\.xlsx$/.test(file.name)) {
            this.loading = true;
        } else {
            this.$message({
                message: "请导入指定的模板文件",
                type: "info"
            });
            return false;
        }
    }

    success(response: ResType) {
        let message: string = "";
        switch (response.status) {
            case "suc":
                message = `
                    <p style="max-height:100px;overflow:auto;">导入成功${response.data.success}条</p>
                    <p style="max-height:100px;overflow:auto;">导入失败${response.data.error}条</p>
                    <p style="max-height:100px;overflow:auto;">${response.data.error_info}</p>
                `;
                this.loading = false;
                break;
            case "error":
                message = "失败";
                this.loading = false;
            default:
                break;
        }
        let temp: any = this.$refs.upload;
        this.$msgbox.alert(`<div>${message}</div>`, "提示", {
            dangerouslyUseHTMLString: true,
            beforeClose: (action, instance, done) => {
                done();
            }
        }).then(() => {
            temp.clearFiles();
            if (response.status === "suc") {
            } else if (response.status === "error") {
            }
        }).catch(() => {
            temp.clearFiles();
        });

    }
    handleClose(done: Function) {
        this.$emit("close", false);
    }

}