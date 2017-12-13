import Component from "vue-class-component";
import Vue from "vue";


import { OrganizationTree } from "@views/organization/organization.attachment";


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
})
export class Organization extends Vue {
    // init data
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

    public defaultProps: any = OrganizationTree.defaultProps;
    public data: any = OrganizationTree.data;
    public filterText: string = OrganizationTree.filterText;
    // init methods



    filterNode(value: any, data: any) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }


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