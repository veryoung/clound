import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, UserCenterType, USER, DefaultUserType } from "@store/user.center.type";
import { ListBaseClass } from "@views/base/base.class";

require("./user.message.styl");
@Component({
    name: "usermessage",
    template: require("./user.message.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters([
            "personInfo",
            "defaultUser"
        ])
    }
})
export class UserMessage extends ListBaseClass {
    // init data
    public unwatch: any = "";
    public Aux = new this.Auxiliary<string>();
    public userMessage: UserMessageType = {
        uid: "0",
        user_name: "",
        pwd: "",
        role: "",
        role_id: "",
        cperson: "",
        ctime: "",
        is_active: "",
        company: "",
        company_id: "",
        phone: "",
        email: "",
        remark: "",
        used_domain_num: "",
        max_domain_num: "",
        waf_enable: "1",
        ads_enable: "1",
        mirror_enable: "1",
        cdn_enable: "1",
        expiry_date: "",
    };
    // init computed
    public personInfo: UserCenterType;
    public defaultUser: DefaultUserType;

    // lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        this.unwatch = this.vm.$watch(function () {
            let id = that.$route.params.id;
            if (id) {
                that.$store.dispatch(USER.GETUSER, { uid: id });
            } else {
                that.$store.dispatch(USER.DEFAULTUSER, { uid: that.defaultUser.uid });
            }
            return id;
        }, (id, oldid) => {
        });

        let eventId = this.EventBus.register(this.CONSTANT.GETUSER, function (event: string, info: any) {
            that.userMessage = that.personInfo[id];
        });
        let eventId1 = this.EventBus.register(this.CONSTANT.DEFAULTUSER, function (event: string, info: any) {
            that.userMessage = that.personInfo[that.defaultUser.uid];
        });
        this.Aux.insertId(eventId);
        this.Aux.insertId(eventId1);
    }

    beforeDestroy() {
        this.Aux.getIds().map((id, $index) => {
            this.EventBus.unRegister(id);
        });
        this.unwatch();
    }
}