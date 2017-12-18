import { OrganizationTreeType } from "@store/organization.type";

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
        label: "sname"
    };
    constructor() {
        this.data = [
            {
                id: "全部组织机构",
                sname: "全部组织机构",
                nodes: []
            }
        ];
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
                            sname: "test",
                            nodes: []
                        });
                        break;
                    case OPERATION.DEL:
                        item.splice($index, 1);
                        break;
                    case OPERATION.EDIT:
                        unit.sname = new Date().getTime() + "";
                        break;
                }
                return;
            } else if (unit.nodes) {
                this.findNode(unit.nodes, id, operation);
            }
        });
    }
}


export const OrganizationTree = new Tree();


