import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { NOTICEEVENT } from "@store/notice.type";



const Aux = new Auxiliary<string>();

require("./common.detail.styl");
@Component({
    name: "emailnoticedeatil",
    template: require("./email.notice.detail.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters(["emailDetail"])
    }
})
export class EmailNoticeDeatil extends Vue {
    // init data
    public EmailNoticeInfo: EmailNoticeDetailType = {
        content: "",
        id: "",
        object: "",
        receiver: "",
        send_date: "",
        send_type: "",
        sender: "",
        status: "",
    };

    // init computed
    public emailDetail: EmailNoticeDetailPageType;

    // lifecircle hook
    created() {
        let that = this;
        let id = that.$route.params.id;
        this.$store.dispatch(NOTICEEVENT.GETEMAILDETAIL, { id: id });
        let eventId = EventBus.register(CONSTANT.GETEMAILDETAIL, function (event: string, info: any) {
            that.EmailNoticeInfo = that.emailDetail[id];
            console.log(that.EmailNoticeInfo);
        });
        Aux.insertId(eventId);
    }

    beforeDestroy() {
        Aux.getIds().map((id, $idnex) => {
            EventBus.unRegister(id);
        });
    }
}

export interface EmailNoticeDetailType {
    content: string;
    id: string;
    object: string;
    receiver: string;
    send_date: string;
    send_type: string;
    sender: string;
    status: string;
}

export interface EmailNoticeDetailPageType {
    [extra: string]: EmailNoticeDetailType;
}