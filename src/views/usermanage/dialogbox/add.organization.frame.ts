import Component from "vue-class-component";
import { TissueTree } from "@components/tissuetree/tree";
import { ORGANIZATION, OrganizationTreeType } from "@store/organization.type";
import {  DiplomaBaseClass } from "@views/base/base.class";

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
export class AddOrganizationFrame extends DiplomaBaseClass {
    // init props
    public dialogVisible: boolean;
    // init data
    public selectNode: OrganizationTreeType = {
        id: "",
        tree_label: "",
        nodes: []
    };


    // lifecycle hook

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

}