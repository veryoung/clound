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
    public upLoadData: any = {
        cid: ""
    };
    // lifecycle hook
    created() { }

    // init method

    importUser() {
        let temp: any = this.$refs.Crtupload;
        console.log(temp);
        temp.submit();
    }
    // 证书验证
    Crtuploader(file: any) {
        const extension = file.name.split(".")[1] === "crt";
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!extension) {
            this.$message({ message: "上传文件格式只能支持pem格式", type: "info" });
        }
        if (!isLt1M) {
            this.$message({ message: "请导入指定的模板文件", type: "info" });
        }
        return extension && isLt1M;
    }
    // 密匙验证
    Keyuploader(file: any) {
        const extension = file.name.split(".")[1] === "key";
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!extension) {
            this.$message({ message: "上传文件格式只能支持pem格式", type: "info" });
        }
        if (!isLt1M) {
            this.$message({ message: "请导入指定的模板文件", type: "info" });
        }
        return extension && isLt1M;
    }

    uploaderDone(response: ResType, file: any, fileList: any) {
        this.upLoadData.cid === response.data.cid;
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