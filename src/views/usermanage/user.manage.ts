import Component from "vue-class-component";
import { mapGetters } from "vuex";



import { ModuleTitle } from "@components/title/module.title";
import { TissueTree } from "@components/tissuetree/tree";
import { CloudTable } from "@components/cloudtable/table";
import { SetCol } from "@components/setcol/setcol";
import { ResetPwd } from "@views/usermanage/dialogbox/reset.pwd";
import { ImportUserFrame } from "@views/usermanage/dialogbox/import.user";
import { USER, UserListColumnType, UserMessageType, RoleType, UserListType } from "@store/user.center.type";
import { vm } from "@utils/index";
import SearchType, { filterData, UserManagerController } from "./user.manage.attachement";
import { OrganizationTreeType } from "@store/organization.type";
import { Config, TableConfigType, TABLECONFIG } from "@store/table.type";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { ListBaseClass } from "@views/base/base.class";


const Aux = new Auxiliary<string>();
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
            "tableConfig",
            "roleList",
            "OrganizationTree"
        ])
    }
})
export class UserManagement extends ListBaseClass {
    // init computed
    public userlist: UserListType;
    public tableConfig: TableConfigType;
    public roleList: RoleType[];
    public OrganizationTree: OrganizationTreeType[];
    // init data
    public titles: string[] = ["用户列表"];
    public dialogVisible: boolean = false;
    public dialogVisiblePwd: boolean = false;
    public uid: string = "0";
    public ids: string[] = [];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public tableData: UserListColumnType[] = new Array<UserListColumnType>();
    public roles: Array<RoleType> = new Array<RoleType>();
    public ori_id: string = "";
    // public tableDefault: = 
    // lifecircle hook 
    created() {
        let that = this;
        let id1 = EventBus.register(CONSTANT.INITORGANIZATIONTREE, (event: string, info: any) => {
            that.clickNode(that.OrganizationTree[0]);
        });
        let id2 = EventBus.register(CONSTANT.GETUSERLIST, function (event: string, info: any) {
            that.tableData = that.userlist[info.id][that.tableConfig.usertable.page - 1];
        });

        Aux.insertId(id1);
        Aux.insertId(id2);
        this.$store.dispatch(USER.GETUSERFILTERROLES);
        let id3 = EventBus.register(CONSTANT.GETUSERFILTERROLES, function () {
            that.roles = that.roleList;
        });
        Aux.insertId(id3);
    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
    }

    // init methods

    exportUser(type: string) {
        if (type === "all") {
            this.exportFile(`/api/v20/account/user/excel/?ids=[]${this.objToUrl((<any>Object).assign(this.filter, { ori_id: this.ori_id }))}`);
            console.log(`/api/v20/account/user/excel/?ids=[]${this.objToUrl((<any>Object).assign(this.filter, { ori_id: this.ori_id }))}`);
        } else {
            if (this.ids.length === 0) {
                this.$notify({
                    title: "提示",
                    message: "请选择导出项",
                    type: "info"
                });
            } else {
                this.exportFile(`/api/v20/account/user/excel/?ids=[${this.ids}]${this.objToUrl((<any>Object).assign(this.filter, { ori_id: this.ori_id }))}`);
            }
        }
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
                UserManagerController.handleDel(row, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
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
        this.ori_id = opt.id;
        this.filter = (<any>Object).assign({}, filterData);
        this.titles.splice(1, 1, opt.tree_label);
        this.$store.dispatch(USER.GETUSERLIST, {
            ori_id: opt.id,
            page: 1,
            page_size: this.tableConfig.usertable.page_size
        });
    }

    search() {
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
        console.log(this.filter);
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
    }

    handleSizeChange(val: number) {
        this.tableConfig.usertable.page_size = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.usertable.page = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
    }

    sortChange(opt: any) {
        this.filter.sort_ctime = "";
        this.filter.sort_expiry_date = "";
        if (opt.prop === "ctime") {
            if (opt.order === "descending") {
                this.filter.sort_ctime = "0";
            } else {
                this.filter.sort_ctime = "1";
            }
        } else if (opt.prop === "expiry_date") {
            if (opt.order === "descending") {
                this.filter.sort_expiry_date = "0";
            } else {
                this.filter.sort_expiry_date = "1";
            }
        }
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable, this.filter, { ori_id: this.ori_id }));
    }

    handleSelectionChange(options: UserMessageType[]) {
        this.ids = [];
        options.map((item: UserMessageType, $index: number) => {
            this.ids.push(item.uid);
        });
    }
}