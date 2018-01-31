import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";



const Aux = new Auxiliary<string>();

@Component({
    name: "messagenoticedeatil",
    template: require("./message.notice.detail.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters(["msgDetail"])
    }
})
export class MessageNoticeDeatil extends Vue {
    // init data
    public PublicNoticeInfo: PublicNoticeDetailType = {
        content: "",
        cperson: "",
        ctime: "",
        id: "",
        title: "",
    };

    // init computed
    public msgDetail: PublicNoticeDetailPageType;

    // lifecircle hook
    created() {
        let that = this;
        let id = that.$route.params.id;
        this.$store.dispatch(NOTICEEVENT.GETNOTICEDETAIL, { id: id });
        let eventId = EventBus.register(CONSTANT.GETNOTICEDETAIL, function (event: string, info: any) {
            console.log(that.msgDetail);
            that.PublicNoticeInfo = that.msgDetail[id][0];
            console.log(that.PublicNoticeInfo);
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

export interface PublicNoticeDetailPageType {
    [extra: string]: PublicNoticeDetailSoType;
}

export interface PublicNoticeDetailSoType {
    [extra: string]: PublicNoticeDetailType;
}