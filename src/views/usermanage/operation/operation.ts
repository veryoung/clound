import Component from "vue-class-component";
import Vue from "vue";



import { ModuleTitle } from "@components/title/module.title";



require("./operation.styl");
@Component({
    name: "useroperation",
    template: require("./operation.html"),
})
export class UserOperation extends Vue {
    // init data
    ruleForm: any = {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
    };

    rules: any = {
        name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
            { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
            { type: "date", required: true, message: "请选择日期", trigger: "change" }
        ],
        date2: [
            { type: "date", required: true, message: "请选择时间", trigger: "change" }
        ],
        type: [
            { type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }
        ],
        resource: [
            { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [
            { required: true, message: "请填写活动形式", trigger: "blur" }
        ]
    };

    // init methods
    submitForm(formName: string) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }
    
    resetForm(formName: string) {
        this.$refs[formName].resetFields();
    }
}