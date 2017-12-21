import Component from "vue-class-component";
import Vue from "vue";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { ImportUserFrame } from "@views/usermanage/dialogbox/import.user";


import { test, columns, filterData } from "./user.manage.attachement";
import SearchType from "./user.manage.attachement";



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
    public filter: SearchType = (<any>Object).assign({}, filterData);
    // init method
    handle(type: "look" | "add" | "editor" | "changepwd" | "del", rowObj?: any) {
        if (type === "del") {
            return;
        }
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.push(`/SystemManagement/UserManagement/editor/${row.date}`);
            } else if (type === "changepwd") {
                this.$router.push(`/usercenter/ChangPwd`);
            } else if (type === "look") {
                this.$router.push(`/SystemManagement/UserManagement/look/${row.date}`);
            }
            return;
        }
        if (type === "add") {
            this.$router.push(`/SystemManagement/UserManagement/add`);
        }
    }

    importUser() {
        this.dialogVisible = true;
    }

    close() {
        this.dialogVisible = false;
    }
    clickNode() {

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