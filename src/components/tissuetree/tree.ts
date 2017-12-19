import Component from "vue-class-component";
import Vue from "vue";

import { OrganizationTree } from "@components/tissuetree/tree.attachment";
import { OrganizationTreeType } from "@store/organization.type";



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

    public defaultProps: any = OrganizationTree.defaultProps;
    public data: Array<OrganizationTreeType> = OrganizationTree.data;
    public filterText: string = OrganizationTree.filterText;
    // init methods
    addNode() {
        // OrganizationTree.addNode(this.selectNode);
    }

    editNode() {
        // OrganizationTree.editNode(this.selectNode);
    }

    delNode() {
        // OrganizationTree.delNode(this.selectNode);
    }


    filterNode(value: any, data: any) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }

    renderContent(h: Function, options: any) {
        const { node, data, store } = options;
        console.log(node, data);
        return (
            h("li", {
                "class": {
                    "treeli": true,
                    "editor": this.editor
                },
            },
                [
                    h("div", {
                        "class": {
                            "label": true
                        }
                    }, `${node.label}`),
                    h("div", {
                        "class": {
                            "btn-group-jt": true
                        }
                    },
                        [
                            h("i", {
                                "class": {
                                    "iconfont": true,
                                    "icon-tianjia": true
                                },
                                on: {
                                    click: (e: any) => { OrganizationTree.addNode(data); e.stopPropagation(); }
                                },
                            }, ""),
                            h("i", {
                                "class": {
                                    "iconfont": true,
                                    "icon-shanchu": true
                                },
                                on: {
                                    click: (e: any) => { OrganizationTree.delNode(data); e.stopPropagation(); }
                                },
                            }, "")
                        ]),
                ])
        );
    }
}