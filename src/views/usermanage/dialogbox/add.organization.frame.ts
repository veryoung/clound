import Component from "vue-class-component";
import Vue from "vue";

import { TissueTree } from "@components/tissuetree/tree";
import { ORGANIZATION, OrganizationTreeType } from "@store/organization.type";
import { EventBus } from "@utils/event";
import { TREECOMPONENT } from "@utils/event.type";

require("./add.organization.frame.styl");
@Component({
    name: "addmodel",
    template: require("./add.organization.frame.html"),
    props: {
        dialogVisible: Boolean,
    },
    components: {
        TissueTree
    },
})
export class AddOrganizationFrame extends Vue {
    // init data
    public dialogVisible: Boolean = false;
    public selectNode: OrganizationTreeType | "" = "";
    public eventIds: string[] = [];


    // lifecycle hook
    created() {
        // let id1 = EventBus.register(TREECOMPONENT.CLICKNODE, (event: TREECOMPONENT, node: OrganizationTreeType) => {
        //     this.selectNode = node;
        // });
        // this.eventIds.push(id1);
    }
    destroyed() {
        // for (let val of this.eventIds) {
        //     EventBus.unRegister(val);
        // }
    }

    // init method
    clickNode() {

    }
    importOrganization() {
        this.$emit("importNode", this.selectNode);
    }

    handleClose(done: any) {
        console.log(done);
        this.$emit("close", false);
    }

}