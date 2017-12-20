import Component from "vue-class-component";
import Vue from "vue";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { ImportUserFrame } from "@views/usermanage/dialogbox/import.user";


import { test, columns } from "./user.manage.attachement";


require("./user.manage.styl");
@Component({
    name: "usermanagement",
    template: require("./user.manage.html"),
    components: {
        ModuleTitle, TissueTree, CloudTable, SetCol, ImportUserFrame
    }
})
export class UserManagement extends Vue {
    // init data
    public dialogVisible: boolean = false;
    public checked: boolean = true;
    public datas: any = test;
    public columns: any = columns;
    public formInline: any = {
        user: "",
        region: ""
    };
    // init method
    go(type: "add" | "editor" | "changepwd" | "del", rowObj?: any) {
        if (type === "del") {
            return;
        }
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.replace(`/SystemManagement/${row.id}`);
            } else if (type === "changepwd") {
                this.$router.replace(`/usercenter/ChangPwd`);
            }
            return;
        }
        if (type === "add") {
            this.$router.replace(`/SystemManagement/add`);
        }
    }

    importUser() {
        this.dialogVisible = true;
    }

    close() {
        this.dialogVisible = false;
    }

    onSubmit() {
        console.log("submit!");
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