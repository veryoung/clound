import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { ResetPwd } from "@views/usermanage/dialogbox/reset.pwd";
import { ImportUserFrame } from "@views/usermanage/dialogbox/import.user";
import { USER, UserCompanyListType, UserListColumnType, UserMessageType } from "@store/user.center.type";
import { vm, USERMANAGEEVENT } from "@utils/index";
import SearchType, { filterData, UserManagerController } from "./user.manage.attachement";
import { OrganizationTreeType } from "@store/organization.type";
import { Config, TableConfigType } from "@store/table.type";
import { filterPipe } from "@utils/filters";



require("./user.manage.styl");
@Component({
    name: "usermanagement",
    template: require("./user.manage.html"),
    components: {
        ModuleTitle, TissueTree, CloudTable, SetCol, ImportUserFrame, ResetPwd
    },
    computed: {
        ...mapGetters([
            "userlist",
            "tableConfig"
        ])
    }
})
export class UserManagement extends Vue {
    // init computed
    public userlist: UserCompanyListType;
    public tableConfig: TableConfigType;
    // init data
    public titles: string[] = ["企业详情"];
    public dialogVisible: boolean = false;
    public dialogVisiblePwd: boolean = false;
    public uid: number = 0;
    public ids: number[] = [];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public tableData: UserListColumnType[] = new Array<UserListColumnType>();
    // public tableDefault: = 
    // lifecircle hook 
    created() {
        this.clickNode({
            id: "",
            name: "全部组织机构",
            nodes: []
        });
        vm.$on(USERMANAGEEVENT.GETUSERLIST, (id: string) => {
            this.tableData = this.userlist[id].data[this.tableConfig.usertable.page - 1];
            console.log(this.tableData, this.userlist[id], this.tableConfig.usertable);
        });
    }

    destroyed() {
        vm.$off(USERMANAGEEVENT.GETUSERLIST);
    }


    // init method
    mergeData(opt: Config) {
        const { page_size, page } = opt;
        this.filter.expiry_date = filterPipe.date(this.filter.expiry_date);
        this.filter.ctime = filterPipe.date(this.filter.ctime);
        return (<any>Object).assign({}, this.filter, {
            page: page,
            page_size: page_size
        });
    }

    handle(type: "look" | "add" | "editor" | "changepwd" | "del", rowObj?: any) {
        if (rowObj) {
            const { $index, row } = rowObj;
            if (type === "editor") {
                this.$router.push(`/SystemManagement/UserManagement/editor/${row.uid}`);
            } else if (type === "changepwd") {
                this.uid = row.uid;
                this.dialogVisiblePwd = true;
            } else if (type === "look") {
                this.$router.push(`/SystemManagement/UserManagement/look/${row.uid}`);
            } else if (type === "del") {
                UserManagerController.handleDel(row);
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

    closePwd() {
        this.dialogVisiblePwd = false;
    }

    close() {
        this.dialogVisible = false;
    }
    clickNode(opt: OrganizationTreeType) {
        this.titles.splice(1, 1, opt.name);
        this.$store.dispatch(USER.GETUSERLIST, {
            ori_id: opt.id,
            page: 1,
            page_size: this.tableConfig.usertable.page_size
        });
    }
    exportUser() {
        if (this.ids.length === 0) {
            return false;
        }
        UserManagerController.exportUser(this.ids);
    }

    exportAll() {
        UserManagerController.exportAll();
    }

    search() {
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
    }

    handleSizeChange(val: number) {
        this.tableConfig.usertable.page_size = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
        console.log(`每页 ${val} 条`);
    }
    handleCurrentChange(val: number) {
        this.tableConfig.usertable.page = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
        console.log(`当前页: ${val}`);
    }

    handleSelectionChange(options: UserMessageType[]) {
        this.ids = [];
        options.map((item: UserMessageType, $index: number) => {
            this.ids.push(item.uid);
        });
    }
}