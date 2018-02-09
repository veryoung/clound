import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";



const Aux = new Auxiliary<string>();
require("./common.detail.styl");
require("./message.notice.detail.styl");
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
    public MessageNoticeInfo: MessageNoticeDetailType = {
        content: "",
        id: "",
        msg_type: "",
        receiver: "",
        send_date: "",
        sender: "",
        status: "",
    };

    // init computed
    public msgDetail: MessageNoticeDetailPageType;

    // lifecircle hook
    created() {
        let that = this;
        let id = that.$route.params.id;
        this.$store.dispatch(NOTICEEVENT.GETMSGDETAIL, { id: id });
        let eventId = EventBus.register(CONSTANT.GETMSGDETAIL, function (event: string, info: any) {
            that.MessageNoticeInfo = that.msgDetail[id];
            console.log(that.MessageNoticeInfo);
        });
        Aux.insertId(eventId);
    }

    beforeDestroy() {
        Aux.getIds().map((id, $index) => {     EventBus.unRegister(id); });
    }
    back() {
        this.$router.go(-1);
    }
}

export interface MessageNoticeDetailType {
    content: string;
    id: string;
    msg_type: string;
    receiver: string;
    send_date: string;
    sender: string;
    status: string;
}

export interface MessageNoticeDetailPageType {
    [extra: string]: MessageNoticeDetailType;
}

