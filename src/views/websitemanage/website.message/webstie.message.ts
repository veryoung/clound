import Component from "vue-class-component"; 
import { mapGetters } from "vuex";
import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, UserCenterType, USER } from "@store/user.center.type";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";
import { WebMessageType, WebMessagePageType } from "@views/websitemanage/website.manage.attachement";
import { ListBaseClass } from "@views/base/base.class";

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
export class WebsiteMessage extends ListBaseClass {
    // init computed
    public websiteMessage: WebMessagePageType;


    // init data
    public Aux = new this.Auxiliary<string>();
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

    // lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(MYWEBSITEEVENT.GETWEBMESSAGE, { website_id: id });
        } else {
            this.WebsiteInfo = this.websiteMessage.default;
        }
        let eventId = this.EventBus.register(this.CONSTANT.GETWEBMESSAGE, function (event: string, info: any) {
            that.WebsiteInfo = that.websiteMessage[id];
            console.log(that.WebsiteInfo);
            that.httpString = that.WebsiteInfo.port.http_port.join(",");
            that.httpsString = that.WebsiteInfo.port.https_port.join(",");
            that.sourcenfoString = that.WebsiteInfo.source_info.join(",");
        });
        this.Aux.insertId(eventId);
    }

    destroyed() {
        this.Aux.getIds().map((id, $index) => { 
            this.EventBus.unRegister(id); 
        });
    }

    back() {
        this.$router.go(-1);
    }
}