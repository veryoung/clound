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
import { Config, TableConfigType, TABLECONFIG } from "@store/table.type";
import { filterPipe } from "@utils/filters";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";


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
    public uid: string = "0";
    public ids: string[] = [];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public tableData: UserListColumnType[] = new Array<UserListColumnType>();
    public unwatch: any = "";
    public serialize: string = "&";
    public exportLink: string = `/api/v20/account/user/excel/?ids=[${this.ids}]${this.serialize}`;
    // public tableDefault: = 
    // lifecircle hook 
    created() {
        let that = this;
        let id1 = EventBus.register(CONSTANT.TABLEALL, (event: string, info: any) => {
            that.clickNode({
                id: "",
                name: "全部组织机构",
                nodes: []
            });
        });
        let id2 = EventBus.register(CONSTANT.USERLISTMESSAGE, function (event: string, info: any) {
            that.tableData = that.userlist[info.id].data[that.tableConfig.usertable.page - 1];
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
        // this.filter.expiry_date = filterPipe.date(this.filter.expiry_date);
        // this.filter.ctime = filterPipe.date(this.filter.ctime);
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
        this.filter = (<any>Object).assign({}, filterData);
        this.titles.splice(1, 1, opt.name);
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

    handleSelectionChange(options: UserMessageType[]) {
        this.ids = [];
        options.map((item: UserMessageType, $index: number) => {
            this.ids.push(item.uid);
        });
        this.exportLink = `/api/v20/account/user/excel/?ids=[${this.ids}]${this.serialize}`;
    }
}