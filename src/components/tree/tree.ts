import Vue from "vue";
import Component from "vue-class-component";

let treelist = require("./tree");
let TreeNode = treelist.TreeNode;
let Tree = treelist.Tree;

require("./tree.styl");
 
interface ModelType {
    children: Array<ModelType> | null;
    id: number;
    isLeaf: boolean;
    parent: Array<ModelType>;
    pid: number;
    changeName: Function;
    remove: Function;
    addChildren: Function;
    moveInto: Function;
}

let fromComp: any;


@Component({
    template: require("./tree.html"),
    name: "VueTreeList",
    props: {
        model: {
            type: Object
        },
        defaultLeafNodeName: {
            type: String,
            default: "New leaf node"
        },
        defaultTreeNodeName: {
            type: String,
            default: "New tree node"
        },
    },
    // focus指针
    directives: {
        focus: {
            update: function (el, { value }) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
})




export class VueTreeList extends Vue {
    // props have to be declared for typescript
    model: ModelType;
    defaultLeafNodeName: string;
    defaultTreeNodeName: string;

    // initial data
    isHover: boolean = false;
    editable: boolean = false;
    isDragEnterUp: boolean = false;
    isDragEnterBottom: boolean = false;
    isDragEnterNode: boolean = false;
    expanded: boolean = true;
    isfocus: boolean = false;

    // computed
    get itemIconClass() {
        return this.model ? "icon-file-wy" : "icon-folder-wy";
    }

    get caretClass() {
        return this.expanded ? "icon-caret-down-wy" : "icon-caret-right-wy";
    }
    // 判断是不是文件夹
    get isFolder() {
        return this.model.children && this.model.children.length;
    }

    // method
    // 更新节点名
    updateName(e: any) {
        this.model.changeName(e.target.value);
    }
    // 删除节点
    delNode() {
        const vm = this;
        if (window.confirm("确认删除吗？")) {
            vm.model.remove();
        }
    }
    // 编辑时候回车完成编辑
    uesedit(e: any) {
        if (e.keyCode === 13 && this.editable) {
            this.editable = false;
        }
    }
    // 打开编辑
    setEditable() {
        this.editable = true;
        this.$nextTick(() => {
            let node = this.$refs.nodeInput;
            this.isfocus = true;
        });
    }

    setUnEditable() {
        this.editable = false;
    }
    // 展开节点
    toggle() {
        if (this.isFolder) {
            this.expanded = !this.expanded;
        }
    }
    // 鼠标经过高亮事件
    mouseOver(e: any) {
        this.isHover = true;
    }
    // 移开鼠标取消高亮
    mouseOut(e: any) {
        this.isHover = false;
    }
    // 添加子节点
    addChild(isLeaf: any) {
        const name = isLeaf ? this.defaultLeafNodeName : this.defaultTreeNodeName;
        this.expanded = true;
        let node = new TreeNode(name, isLeaf);
        this.model.addChildren(node, true);
    }
    // 开始拖拽
    dragStart(e: any) {
        fromComp = this;
        console.log(fromComp);
        // for firefox
        e.dataTransfer.setData("data", "data");

        e.dataTransfer.effectAllowed = "move";
        return true;
    }
    // 结束拖拽
    dragEnd(e: any) {
        fromComp = null;
    }
    // 拖拽经过
    dragOver(e: any) {
        e.preventDefault();
        return true;
    }
    //  放入拖拽
    dragEnter(e: any) {
        if (this.model.isLeaf) {
            return;
        }
        this.isDragEnterNode = true;
    }
    dragLeave(e: any) {
        this.isDragEnterNode = false;
    }
    drop(e: any) {
        fromComp.model.moveInto(this.model);
        this.isDragEnterNode = false;
    }

    dragEnterUp() {
        this.isDragEnterUp = true;
    }

    dragOverUp(e: any) {
        e.preventDefault();
        return true;
    }

    dragLeaveUp() {
        this.isDragEnterUp = false;
    }

    dropUp() {
        fromComp.model.insertBefore(this.model);
        this.isDragEnterUp = false;
    }

    dragEnterBottom() {
        this.isDragEnterBottom = true;
    }

    dragOverBottom(e: any) {
        e.preventDefault();
        return true;
    }

    dragLeaveBottom() {
        this.isDragEnterBottom = false;
    }

    dropBottom() {
        fromComp.model.insertAfter(this.model);
        this.isDragEnterBottom = false;
    }

}