import Component from "vue-class-component";
import Vue from "vue";


import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";


require("./organization.styl");
@Component({
    name: "organization",
    template: require("./organization.html"),
    watch: {
        filterText(val: any) {
            let temp: any = this.$refs.tree;
            temp.filter(val);
        }
    },
    components: {
        ModuleTitle, TissueTree
    }
})
export class Organization extends Vue {
    // init data
    public title1: Array<string> = ["组织机构列表"];
    public title2: Array<string> = ["企业详情"];
    public form: any = {
        sname: "",
        babel: "",
        desc: ""
    };

    public rules: any = {
        label: [
            { required: true, message: "请输入组织名称", trigger: "blur" },
        ],
        sname: [
            { required: true, message: "请输入组织简称", trigger: "change" }
        ]
    };



    // lifecycle hook


    // init methods


    onSubmit(form: string) {
        let temp: any = this.$refs[form];
        temp.validate((valid: any) => {
            if (valid) {
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    resetForm(form: string) {
        let temp: any = this.$refs[form];
        temp.resetFields();
    }
}