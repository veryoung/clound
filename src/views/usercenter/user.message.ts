import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, UserCenterType, USER } from "@store/user.center.type";
import { vm, EventBus, CONSTANT } from "@utils/event";
import { Auxiliary } from "@utils/auxiliary";

const Aux = new Auxiliary<string>();
require("./user.message.styl");
@Component({
    name: "usermessage",
    template: require("./user.message.html"),
    components: {
        ModuleTitle
    },
    computed: {
        ...mapGetters([
            "personInfo"
        ])
    }
})
export class UserMessage extends Vue {
    // init data
    public unwatch: any = "";
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

    // lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        if (id) {
            this.$store.dispatch(USER.GETOTHERUSER, { uid: id });
        } else {
            this.userMessage = this.personInfo.default;
        }
        this.unwatch = vm.$watch(function() {
            return that.$route.params.id;
        }, (id, oldid) => {
            if (id) {
                that.$store.dispatch(USER.GETOTHERUSER, { uid: id });
            } else {
                that.userMessage = that.personInfo.default;
            }
        });

        let eventId = EventBus.register(CONSTANT.GETOTHERUSER, function (event: string, info: any) {
            that.userMessage = that.personInfo[id];
        });
        Aux.insertId(eventId);
    }

    beforeDestroy() {
        Aux.getIds().map((id, $index) => {
            EventBus.unRegister(id);
        });
        this.unwatch();
    }
}