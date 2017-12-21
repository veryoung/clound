import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { UserMessageType, UserCenterType } from "@store/user.center.type";


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
    public userMessage: UserMessageType;
    // init computed
    public personInfo: UserCenterType;

    // lifecircle hook
    created() {
        if (this.$route.params.id) {
            this.userMessage = this.personInfo[this.$route.params.id];
        } else {
            this.userMessage = this.personInfo.init;
        }
    }
}