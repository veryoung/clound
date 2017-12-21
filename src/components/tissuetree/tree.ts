import Component from "vue-class-component";
import Vue from "vue";

import { OrganizationTree } from "@components/tissuetree/tree.attachment";
import { OrganizationTreeType } from "@store/organization.type";
import { EventBus } from "@utils/event";
import { TREECOMPONENT } from "@utils/event.type";



require("./tree.styl");
@Component({
    name: "TissueTree",
    template: require("./tree.html"),
    props: {
        editor: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        filterText(val) {
            let temp: any = this.$refs.tree;
            temp.filter(val);
        }
    }
})
export class TissueTree extends Vue {
    // init props
    public editor: boolean;
    // init data
    // public selectNode: any = "";
    public defaultProps: any = OrganizationTree.defaultProps;
    public data: Array<OrganizationTreeType> = OrganizationTree.data;
    public filterText: string = OrganizationTree.filterText;
    // init methods
    addNode(data: OrganizationTreeType & "") {
        this.$emit("addNode", data);
        // EventBus.doNotify(TREECOMPONENT.ADDNODE, data);
        OrganizationTree.addNode(data);
    }

    editNode() {
        // OrganizationTree.editNode(this.selectNode);
    }

    delNode(data: OrganizationTreeType & "") {
        this.$emit("delNode", data);
        // OrganizationTree.delNode(this.selectNode);
    }


    filterNode(value: any, data: any) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }

    clickNode(key: OrganizationTreeType) {
        this.$emit("clickNode", key);
        // EventBus.doNotify(TREECOMPONENT.CLICKNODE, key);
    }

    renderContent(h: Function, options: any) {
        const { node, data, store } = options;
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
                                    click: (e: any) => { this.addNode(data); e.stopPropagation(); }
                                },
                            }, ""),
                            h("i", {
                                "class": {
                                    "iconfont": true,
                                    "icon-shanchu": true
                                },
                                on: {
                                    click: (e: any) => { this.delNode(data); e.stopPropagation(); }
                                },
                            }, "")
                        ]),
                ])
        );
    }
}