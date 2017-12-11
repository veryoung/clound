import Component from "vue-class-component";
import Vue from "vue";
import { CloudTable } from "@components/table/cloud.table";

// 引入树
let Index = require("@components/tree/index.js");
let Tree = Index.Tree;
let TreeNode = Index.TreeNode;
import {VueTreeList} from "@components/tree/tree";



@Component({
    name: "entry",
    components: {
        CloudTable, VueTreeList
    },
    methods: {
        getList(params) {
        }
    },
    template: require("./plugins.html"),
})
export class Plugins extends Vue {
    data() {
        return {
            listLoading: false,
            listQuery: {
                pageIndex: 1,
                pageRows: 20,
                pageSizes: "",
                total: 100,
            },
            title: [{
                col: "occurredTime",
                name: "发现时间",
                sort: "occurredTime",
                show: true
            },
            {
                col: "fullname",
                name: "事件类型",
                show: true
            },
            {
                col: "occurredTime",
                name: "发现时间",
                sort: "occurredTime",
                show: true
            },
            {
                col: "fullname",
                name: "事件类型",
                show: false
            }
            ],
            list: [],
            newTree: {},
            data: new Tree([
                {
                    name: "节点 1",
                    id: 1,
                    pid: 0,
                    children: [
                        {
                            name: "节点 1-2",
                            id: 2,
                            isLeaf: true,
                            pid: 1
                        }
                    ]
                },
                {
                    name: "节点 2",
                    id: 3,
                    pid: 0
                },
                {
                    name: "节点 3",
                    id: 4,
                    pid: 0
                }
            ])

        };
    }
}