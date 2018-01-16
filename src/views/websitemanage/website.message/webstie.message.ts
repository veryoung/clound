import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, UserCenterType, USER } from "@store/user.center.type";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { WebMessageType, WebMessagePageType } from "@views/websitemanage/website.manage.attachement";

const Aux = new Auxiliary<string>();
require("./webstie.message.styl");
@Component({
    name: "webstiemessage",
    template: require("./webstie.message.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters(["websiteMessage"])
    }
})
export class WebsiteMessage extends Vue {
    // init data
    public WebsiteInfo: WebMessageType = {
        cname: "",
        cperson: "",
        ctime: "",
        domain: "",
        industry: "",
        id: "",
        open_waf: "",
        port: {
            http_port: [80],
            https_port: [443],
        },
        name: "",
        remark: "",
        source_info: [""],
        source_type: "",
        state: "",
        service: {
            cdn_enable: "",
            ads_enable: "",
            mirror_enable: "",
            waf_enable: ""
        },

    };
    public httpString: string = "";
    public httpsString: string = "";
    public sourcenfoString: string = "";
    // init computed
    public websiteMessage: WebMessagePageType;

    // lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(MYWEBSITEEVENT.GETWEBMESSAGE, { website_id: id });
        } else {
            this.WebsiteInfo = this.websiteMessage.default;
        }
        let eventId = EventBus.register(CONSTANT.GETWEBMESSAGE, function (event: string, info: any) {
            that.WebsiteInfo = that.websiteMessage[id];
            console.log(that.WebsiteInfo);
            that.httpString = that.WebsiteInfo.port.http_port.join(",");
            that.httpsString = that.WebsiteInfo.port.https_port.join(",");
            that.sourcenfoString = that.WebsiteInfo.source_info.join(",");
        });
        Aux.insertId(eventId);
    }

    beforeDestroy() {
        // Aux.getIds().map((id, $index) => {     EventBus.unRegister(id); });
    }
}