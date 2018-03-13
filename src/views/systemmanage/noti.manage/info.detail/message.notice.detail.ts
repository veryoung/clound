import Component from "vue-class-component";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { NOTICEEVENT } from "@store/notice.type";
import { DetailBaseClass } from "@views/base/base.class";



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
export class MessageNoticeDeatil extends DetailBaseClass {
    // init data
    public Aux = new this.Auxiliary<string>();
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
        let eventId = this.EventBus.register(this.CONSTANT.GETMSGDETAIL, function (event: string, info: any) {
            that.MessageNoticeInfo = that.msgDetail[id];
        });
        this.Aux.insertId(eventId);
    }

    beforeDestroy() {
        this.Aux.getIds().map((id, $index) => {     this.EventBus.unRegister(id); });
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

