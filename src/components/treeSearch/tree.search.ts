  import Vue from "vue";
  import Component from "vue-class-component";

  // 引入数组转化方法
  const arrayToTreeArray = require("./util");
  
  

  interface Options {
    value: string;
    label: string;

   }
  @Component({
        name: "TreeSearch",
        template: require("./tree.search.html"),
        props: {
          defaultProps: {
            children: Object,
          },
          value: String,
          defaultLeafNodeName: {
              type: String,
              default: "New leaf node"
          },
          defaultTreeNodeName: {
              type: String,
              default: "New tree node"
          },
      },
    }
  )

  export class TreeSearch extends Vue {
        // 声明props

        // 声明data
        data2: any = [{
          id: 1,
          label: "一级 1",
          children: [{
            id: 4,
            label: "二级 1-1",
            children: [{
              id: 9,
              label: "三级 1-1-1"
            }, {
              id: 10,
              label: "三级 1-1-2"
            }]
          }]
        }, {
          id: 2,
          label: "一级 2",
          children: [{
            id: 5,
            label: "二级 2-1"
          }, {
            id: 6,
            label: "二级 2-2"
          }]
        }, {
          id: 3,
          label: "一级 3",
          children: [{
            id: 7,
            label: "二级 3-1"
          }, {
            id: 8,
            label: "二级 3-2"
          }]
        }];
        value8: string = "";
        TypeName: any = [];
        TypeVaule: string = "";
        TypeData: any = [];
        defaultProps: {
          children: "children",
          label: "name"
        };
  }