import Component from "vue-class-component";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { NOTICEEVENT } from "@store/notice.type";
import { ListBaseClass, DetailBaseClass } from "@views/base/base.class";



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
export class PublicNoticeDeatil extends DetailBaseClass {
    // init data
    public Aux = new this.Auxiliary<string>();
    public PublicNoticeInfo = {
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
        let eventId = this.EventBus.register(this.CONSTANT.GETNOTICEDETAIL, function (event: string, info: any) {
            that.PublicNoticeInfo = that.noticeDetail[id];
            that.Aux.insertId(eventId);
        });
    }
    beforeDestroy() {
        this.Aux.getIds().map((id, $idnex) => {
            this.EventBus.unRegister(id);
        });
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