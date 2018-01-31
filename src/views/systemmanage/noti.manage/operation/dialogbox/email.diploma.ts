import { TissueTree } from "@components/tissuetree/tree";
import Vue from "vue";
import Component from "vue-class-component";
import { UserServer } from "@server/user";
import { ResType } from "server";
import { FormRuleType, FromValidator } from "@utils/form.validator";
import { AxiosResponse } from "axios";
import { mapGetters } from "vuex";
import { OrganizationTreeType } from "@store/organization.type";
import { EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { Config, TableConfigType, TABLECONFIG } from "@store/table.type";

import { USER, UserListColumnType, UserMessageType, RoleType, UserListType } from "@store/user.center.type";
import { setTimeout } from "timers";

const Aux = new Auxiliary<string>();


@Component({
    name: "emaildiploma",
    template: require("./email.diploma.html"),
    props: {
        dialogVisible: Boolean,
    },
    components: {
        TissueTree, 
    },
    computed: {
        ...mapGetters([
            "userlist",
            "OrganizationTree",
            "tableConfig",
        ])
    }
})
export class EmailDiploma extends Vue {
    // init computed
    public userlist: UserListType;
    public OrganizationTree: OrganizationTreeType[];
    public tableConfig: TableConfigType;

    // init data
    public dialogVisible: boolean;
    public tableData: Array<any> = [];
    public uid: string = "0";
    public ids: string[] = [];
    public uids: string[] = [];
    public filter: SearchType = (<any>Object).assign({}, filterData);
    public ori_id: string = "";

    // 用户对象
    public userObj: any = {};

    public temp: any = this.$refs.noticeTable;


    // lifecycle hook
    created() {
        let that = this;
        let id1 = EventBus.register(CONSTANT.INITORGANIZATIONTREE, (event: string, info: any) => {
            // that.clickNod(that.OrganizationTree[0]);
        });
        let id2 = EventBus.register(CONSTANT.GETUSERLIST, function (event: string, info: any) {
            that.tableData = that.userlist[info.id][that.tableConfig.usertable.page - 1];
            setTimeout(() => {
                that.selected();
            }, 1000);
        });
        Aux.insertId(id1);
        Aux.insertId(id2);
    }

    selected() {
        let that = this;

        if (!(that.ori_id in that.userObj)) {
            that.userObj[that.ori_id] = [];
        }

        // 将已经选中的勾选上
        // 判断不为空值
        if (that.userObj[that.ori_id].length !== 0) {
            that.userObj[that.ori_id].map((row: any) => {
                // 選中 uid = uid 那行
                that.tableData.map((d: any, index: number) => {
                    if (d.uid === row.uid) {
                        let temp1: any = that.$refs.noticeTable;
                        temp1.toggleRowSelection(row);

                    }
                });

            });
        }
    }
    test1() {
        this.temp.toggleRowSelection(this.tableData[0], true);
    }
    test(temp: any) {
        this.temp = temp;
        // this.selected();
    }
    destroyed() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
    }
    // init method
    sumbit() {
        console.log(this.userObj);
    }

    handleSelectionChange(val: any) {
        // 判断当前是增还是减  通过 val的长度和this.uids的长度进行对比 val长为增 反之为减少
        this.uids = [];
        val.map((item: any, $index: number) => {
            this.uids.push(item);
        });
        if (!this.userObj[this.ori_id]) {
            this.userObj[this.ori_id] = [];
        }
        this.userObj[this.ori_id] = this.userObj[this.ori_id].concat(this.uids);
    }

    clickNode(opt: OrganizationTreeType) {
        this.ori_id = opt.id;
        this.filter = (<any>Object).assign({}, filterData);
        this.$store.dispatch(USER.GETUSERLIST, {
            ori_id: opt.id,
            page: 1,
            page_size: 9999
        });
    }

    cancel(done: Function) {
        this.$emit("close", false);
    }
}

export interface ResetType {
    pwd: string;
    pwd1: string;
}

export default interface SearchType {
    user_name: string;
    role_id?: string;
    phone: string;
    email: string;
    ctime: string;
    expiry_date: string;
    is_active: string;
    ori_id?: string;
    sort_ctime?: string;
    sort_expiry_date?: string;
}

export const filterData: SearchType = {
    user_name: "",
    role_id: "",
    phone: "",
    email: "",
    ctime: "",
    expiry_date: "",
    is_active: "",
    ori_id: "",
    sort_ctime: "",
    sort_expiry_date: ""
};