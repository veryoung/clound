import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";



const Aux = new Auxiliary<string>();

@Component({
    name: "publicnoticedeatil",
    template: require("./public.notice.detail.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters(["noticeDetail"])
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
    public noticeDetail: PublicNoticeDetailType;

    // lifecircle hook
    created() {
        console.log(this.noticeDetail);
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(NOTICEEVENT.GETNOTICEDETAIL, { id: id });
        } else {
            this.PublicNoticeInfo = this.noticeDetail;
        }
        let eventId = EventBus.register(CONSTANT.GETWEBMESSAGE, function (event: string, info: any) {
            console.log(that.noticeDetail);
            that.PublicNoticeInfo = that.noticeDetail;

        });
        Aux.insertId(eventId);
    }

    beforeDestroy() {
        // Aux.getIds().map((id, $index) => {     EventBus.unRegister(id); });
    }
}

export interface PublicNoticeDetailType {
    content: string;
    cperson: string;
    ctime: string;
    id: string;
    title: string;
}