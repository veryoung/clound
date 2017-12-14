import Component from "vue-class-component";
import Vue from "vue";

import { OrganizationTree } from "@components/tissuetree/tree.attachment";
import { OrganizationTreeType } from "@store/organization.store";



require("./tree.styl");
@Component({
    name: "TissueTree",
    template: require("./tree.html"),
    props: {
        editor: {
            type: Boolean,
            default: true
        }
    }
})
export class TissueTree extends Vue {
    // init props
    public editor: boolean;
    // init data
    public selectNode: any = "";

    public defaultProps: any = OrganizationTree.defaultProps;
    public data: Array<OrganizationTreeType> = OrganizationTree.data;
    public filterText: string = OrganizationTree.filterText;
    // init methods
    addNode() {
        OrganizationTree.addNode(this.selectNode);
    }

    editNode() {
        OrganizationTree.editNode(this.selectNode);
    }

    delNode() {
        OrganizationTree.delNode(this.selectNode);
    }

    currentChange(options: any) {
        this.selectNode = options;
    }


    filterNode(value: any, data: any) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }
}