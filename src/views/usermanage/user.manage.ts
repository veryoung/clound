import Component from "vue-class-component";
import Vue from "vue";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { CloudTable } from "@components/cloudtable/table";

import { test, columns } from "./user.manage.attachement";


require("./user.manage.styl");
@Component({
    name: "usermanagement",
    template: require("./user.manage.html"),
    components: {
        ModuleTitle, TissueTree, CloudTable
    }
})
export class UserManagement extends Vue {
    // init data
    public title1: Array<string> = ["组织机构列表"];
    public title2: Array<string> = ["企业详情", "test"];

    public datas: any = test;
    public columns: any = columns;
    public formInline: any = {
        user: "",
        region: ""
    };

    // init method
    onSubmit() {
        console.log("submit!");
    }
    handleEdit(a: any, b: any) {
        console.log(a, b);
    }

    handleSizeChange(val: number) {
        this.$emit("handleSizeChange", val);
        console.log(`每页 ${val} 条`);
    }
    handleCurrentChange(val: number) {
        this.$emit("handleCurrentChange", val);
        console.log(`当前页: ${val}`);
    }

    handleSelectionChange(options: any) {
        this.$emit("handleSelectionChange", options);
        console.log(options);
    }
}