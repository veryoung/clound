import Component from "vue-class-component";
import Vue from "vue";
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
import { filterPipe } from "@utils/filters";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { AxiosResponse } from "axios";


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
            "roleList"
        ])
    }
})
export class UserManagement extends Vue {
    // init computed
    public userlist: UserListType;
    public tableConfig: TableConfigType;
    public roleList: RoleType[];
    // init data
    public titles: string[] = ["用户列表"];
    public dialogVisible: boolean = false;
    public dialogVisiblePwd: boolean = false;
    public uid: string = "0";
    public ids: string[] = [];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public tableData: UserListColumnType[] = new Array<UserListColumnType>();
    public unwatch: any = "";
    public serialize: string = "&";
    public exportLink: string = `/api/v20/account/user/excel/?ids=[${this.ids}]${this.serialize}`;
    public roles: Array<RoleType> = new Array<RoleType>();
    public ori_id: string = "";
    // public tableDefault: = 
    // lifecircle hook 
    created() {
        let that = this;
        let id1 = EventBus.register(CONSTANT.TABLEALL, (event: string, info: any) => {
            that.clickNode({
                id: "",
                tree_label: "全部组织机构",
                nodes: []
            });
        });
        let id2 = EventBus.register(CONSTANT.GETUSERLIST, function (event: string, info: any) {
            that.tableData = that.userlist[info.id][that.tableConfig.usertable.page - 1];
        });

        Aux.insertId(id1);
        Aux.insertId(id2);
        this.unwatch = vm.$watch(
            () => {
                return this.filter;
            }, (val, oldval) => {
                if (JSON.stringify(val) === JSON.stringify(oldval)) {
                    return false;
                }
                console.log(val);
                let temp: any = val;
                this.serialize = "&";
                for (let $index in temp) {
                    this.serialize += $index + "=" + temp[$index] + "&";
                }
                this.serialize = this.serialize.substring(0, this.serialize.length - 1);
                this.exportLink = `/api/v20/account/user/excel/?ids=${this.ids}${this.serialize}`;
            }, {
                deep: true
            });
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
        this.unwatch();
    }


    // init method
    mergeData(opt: Config) {
        const { page_size, page } = opt;
        let tempFilter = (<any>Object).assign({}, this.filter);
        tempFilter.expiry_date = filterPipe.date(tempFilter.expiry_date);
        tempFilter.ctime = filterPipe.date(tempFilter.ctime);
        return (<any>Object).assign({}, tempFilter, {
            page: page,
            page_size: page_size,
            ori_id: this.ori_id
        });
    }

    exportUser(type: string) {
        let dom = document.createElement("a");
        dom.href = `${this.exportLink}`;
        dom.target = "_blank";
        if (type === "all") {
            dom.click();
        } else {
            if (this.ids.length === 0) {
                this.$message({
                    message: "请选择导出项",
                    type: "info"
                });
            } else {
                dom.click();
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
                UserManagerController.handleDel(row, { ori_id: this.ori_id, page: this.tableConfig.usertable.page });
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
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
        console.log(this.filter);
    }

    reset() {
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
    }

    handleSizeChange(val: number) {
        this.tableConfig.usertable.page_size = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
    }
    handleCurrentChange(val: number) {
        this.tableConfig.usertable.page = val;
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
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
        this.$store.dispatch(USER.GETUSERLIST, this.mergeData(this.tableConfig.usertable));
    }

    handleSelectionChange(options: UserMessageType[]) {
        this.ids = [];
        options.map((item: UserMessageType, $index: number) => {
            this.ids.push(item.uid);
        });
        this.exportLink = `/api/v20/account/user/excel/?ids=[${this.ids}]${this.serialize}`;
    }
}