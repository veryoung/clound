import Component from "vue-class-component";
import Vue from "vue";

import { TissueTree } from "@components/tissuetree/tree";
import { ORGANIZATION, OrganizationTreeType } from "@store/organization.type";

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


    // lifecycle hook
    created() {
    }
    destroyed() {

    }

    // init method
    clickNode(opt: OrganizationTreeType) {
        this.selectNode = opt;
    }
    importOrganization() {
        this.$emit("importNode", this.selectNode);
    }

    handleClose(done: any) {
        this.$emit("close", false);
    }

}