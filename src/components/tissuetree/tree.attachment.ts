import { OrganizationTreeType, ORGANIZATION } from "@store/organization.type";
import { Store } from "@store/store";

enum OPERATION {
    ADD,
    DEL,
    EDIT
}
export class Tree {
    public data: Array<OrganizationTreeType> = new Array<OrganizationTreeType>();
    public filterText: string = "";
    public defaultProps: any = {
        children: "nodes",
        label: "tree_label"
    };
    constructor() {
        Store.dispatch(ORGANIZATION.INITORGANIZATIONTREE);
    }

    public addNode(item: OrganizationTreeType & "") {
        if (item === "") {
            return;
        }
        this.findNode(this.data, item.id, OPERATION.ADD);
    }

    public delNode(item: OrganizationTreeType & "") {
        if (item === "") {
            return;
        }
        this.findNode(this.data, item.id, OPERATION.DEL);
    }

    public editNode(item: OrganizationTreeType & "") {
        if (item === "") {
            return;
        }
        this.findNode(this.data, item.id, OPERATION.EDIT);
    }


    private findNode(item: Array<OrganizationTreeType>, id: string, operation: OPERATION) {
        item.map((unit, $index) => {
            if (unit.id === id) {
                switch (operation) {
                    case OPERATION.ADD:
                        unit.nodes.push({
                            id: new Date().getTime() + "",
                            tree_label: "test",
                            nodes: []
                        });
                        break;
                    case OPERATION.DEL:
                        item.splice($index, 1);
                        break;
                    case OPERATION.EDIT:
                        unit.tree_label = new Date().getTime() + "";
                        break;
                }
                return;
            } else if (unit.nodes) {
                this.findNode(unit.nodes, id, operation);
            }
        });
    }
}


export const treeAttchment = new Tree();


