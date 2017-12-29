import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";



import { treeAttchment } from "@components/tissuetree/tree.attachment";
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
    },
    watch: {
        filterText(val) {
            let temp: any = this.$refs.tree;
            temp.filter(val);
        }
    },
    computed: {
        ...mapGetters([
            "OrganizationTree"
        ])
    }
})
export class TissueTree extends Vue {
    // init props
    public editor: boolean;
    // init data
    public defaultProps: any = treeAttchment.defaultProps;
    public data: Array<OrganizationTreeType>;
    public filterText: string = treeAttchment.filterText;
    // init computed
    public OrganizationTree: Array<OrganizationTreeType>;
    // lifecircle hook
    created() {
        this.data = this.OrganizationTree;
    }
    // init methods
    addNode(data: OrganizationTreeType & "") {
        this.$emit("addNode", data);
    }

    editNode(data: OrganizationTreeType & "") {
        this.$emit("delNode", data);
    }

    delNode(data: OrganizationTreeType & "") {
        this.$emit("delNode", data);
    }


    filterNode(value: any, data: any) {
        if (!value) return true;
        return data.tree_label.indexOf(value) !== -1;
    }

    clickNode(key: OrganizationTreeType) {
        this.$emit("clickNode", key);
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
                            `${data.id}` === "" ? [] : h("i", {
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