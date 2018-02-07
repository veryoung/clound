import Component from "vue-class-component";
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { mapGetters } from "vuex";


import { userCenterRouter } from "@router/user.center";
import { GeneralServer } from "@server/general";
import { ResType } from "@server/index";
import { UserCenterType, USER, DefaultUserType } from "@store/user.center.type";
import { AxiosResponse } from "axios";
import { EventBus, CONSTANT } from "@utils/event";
import { UserStatus } from "@utils/monitor";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";
import { ListBaseClass } from "@views/base/base.class";
import { TableConfigType } from "@store/table.type";
import * as moment from "moment";



const Aux = new Auxiliary<string>();
require("./user.menu.styl");
@Component({
    name: "usermenu",
    template: require("./user.menu.html"),
    computed: {
        ...mapGetters([
            "personInfo",
            "defaultUser",
            "tableConfig",
            "noticeTable"
        ])
    }
})
export class UserMenu extends ListBaseClass {
    // init data
    public Routers: Array<RouteConfig> = userCenterRouter;
    public user_name: string = "";
    public tableConfig: TableConfigType;
    public noticeTable: PubilcTableType;

    // init computed
    public personInfo: UserCenterType;
    public defaultUser: DefaultUserType;
    public PublicNoticeData: PublicNoticeColumnType[] = new Array<PublicNoticeColumnType>();
    public filterData: SearchType = {
        key_word: "",
        new: true,
        page: "1",
        page_size: "9999",
        send_time: [moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYYMMDD"), moment(new Date()).format("YYYYMMDD")],
    };
    public filter: SearchType = (<any>Object).assign({}, this.filterData);

    public NoticeNum: number = 0;
    // 当前未读数组
    public NotReaderArray: PublicNoticeColumnType[] = new Array<PublicNoticeColumnType>();

    // lifecircle hook
    created() {
        let that = this;
        new UserStatus();
        this.$store.dispatch(USER.DEFAULTUSER, { uid: this.defaultUser.uid });
        EventBus.register(CONSTANT.DEFAULTUSER, function () {
            that.user_name = that.personInfo[that.defaultUser.uid].user_name;
        });
        // 获取公告
        this.$store.dispatch(NOTICEEVENT.GETNOTICELIST,  this.filter);
        let ListId = EventBus.register(NOTICEEVENT.GETNOTICELIST, function (event: string, info: any) {
            that.PublicNoticeData = (<any>Object).assign([], that.noticeTable[that.tableConfig["noticetable"].page - 1]);
            console.log(that.noticeTable);

            that.NotReaderArray = that.PublicNoticeData;
            that.NoticeNum = that.NotReaderArray.length;
        });
    }
    logout() {
        GeneralServer.logout().then((response) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    if (process.env.PLATFORM === "portal") {
                        this.$router.replace("/portal");
                    } else {
                        this.$router.replace("/login");
                    }
                    break;
                default:
                    break;
            }
        });
    }

    // 返回一个未读数组
    // retrunNoRead(Array: Array<any>, rowid: string ) {

    // }

    look(rowObj?: any) {
        if (rowObj) {
            // this.retrunNoRead(this.NotReaderArray , rowObj);
            this.$router.push(`/noticelook/${rowObj.id}`);
        }
    }
}


// 公告详情内容
export interface SearchType {
    key_word: string;
    new: boolean;
    page: string;
    page_size: string;
    send_time: Array<string>;
}

export interface PublicNoticeColumnType {
    c_person: string;
    c_time: string;
    content: string;
    title: string;
    id: string;
}

export interface PubilcTableType {
    [extra: string]: PublicNoticeColumnType[];
}