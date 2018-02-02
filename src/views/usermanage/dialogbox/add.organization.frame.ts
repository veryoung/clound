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
    // init props
    public dialogVisible: boolean;
    // init data
    public selectNode: OrganizationTreeType = {
        id: "",
        tree_label: "",
        nodes: []
    };


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
        if (this.selectNode.id === "") {
            this.$notify({
                title: "提示",
                message: "不能选择全部组织机构",
                type: "info"
            });
            return;
        }
        this.$emit("importNode", this.selectNode);
    }

    handleClose(done: any) {
        this.$emit("close", false);
    }

}