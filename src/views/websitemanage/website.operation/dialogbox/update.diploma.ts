import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";

const style = require("./update.m.css");

@Component({
    name: "updatediploma",
    template: require("./update.diploma.html"),
    props: {
        dialogVisible: Boolean,
        uid: {
            type: String
        }
    }
})
export class UpdateDiploma extends Vue {
    // init data
    public dialogVisible: boolean;
    public loading: boolean = false;
    // lifecycle hook
    created() { }

    // init method

    importUser() {
        let temp: any = this.$refs.upload;
        temp.submit();
    }

    uploader(file: any) {
        if (/\.xls$/.test(file.name) || /\.xlsx$/.test(file.name)) {
            this.loading = true;
        } else {
            this.$message({ message: "请导入指定的模板文件", type: "info" });
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
        this.$msgbox.alert(`<div>${message}</div>`, "提示", { dangerouslyUseHTMLString: true }).then(() => {
            if (response.status === "suc") { } else if (response.status === "error") { }
        });

    }
    cancel(done: Function) {
        this.$emit("close", false);
    }
}

export interface ResetType {
    pwd: string;
    pwd1: string;
}