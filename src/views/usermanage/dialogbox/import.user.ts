import Component from "vue-class-component";
import Vue from "vue";
import { ResType } from "server";
import ElementUI from "element-ui";

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
                    <p>导入成功${response.data.success}条</p>
                    <p>导入失败${response.data.error}条</p>
                    <p>${response.data.error_info}</p>
                `;
                this.loading = false;
                break;
            case "error":
                message = "失败";
                this.loading = false;
            default:
                break;
        }
        ElementUI.MessageBox.alert(`<div>${message}</div>`, "提示", {
            dangerouslyUseHTMLString: true
        }).then(() => {
            if (response.status === "suc") {

            } else if (response.status === "error") {

            }
        });
        /**
         *         this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
          dangerouslyUseHTMLString: true
        });
         */

    }
    handleClose(done: Function) {
        this.$emit("close", false);
    }

}