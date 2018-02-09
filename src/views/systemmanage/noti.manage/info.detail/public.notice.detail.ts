import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";



const Aux = new Auxiliary<string>();
require("./common.detail.styl");
require("./public.notice.detail.styl");

@Component({
    name: "publicnoticedeatil",
    template: require("./public.notice.detail.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters(["noticeDetail"])
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "fetchDate"
    }
})
export class PublicNoticeDeatil extends Vue {
    // init data
    public PublicNoticeInfo: PublicNoticeDetailType = {
        content: "",
        cperson: "",
        ctime: "",
        id: "",
        title: "",
    };

    // init computed
    public noticeDetail: PublicNoticeDetailPageType;

    // lifecircle hook
    created() {
        this.fetchDate();
    }
    fetchDate() {
        let that = this;
        let id = this.$route.params.id;
        this.$store.dispatch(NOTICEEVENT.GETNOTICEDETAIL, { id: id });
        let eventId = EventBus.register(CONSTANT.GETNOTICEDETAIL, function (event: string, info: any) {
            that.PublicNoticeInfo = that.noticeDetail[id];
            Aux.insertId(eventId);
        });
    }
    beforeDestroy() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }

    back() {
        this.$router.go(-1);
    }
}

export interface PublicNoticeDetailType {
    content: string;
    cperson: string;
    ctime: string;
    id: string;
    title: string;
}



export interface PublicNoticeDetailPageType {
    [extra: string]: PublicNoticeDetailType;
}