import Component from "vue-class-component";
import Vue from "vue";
interface TitleType {
    col: string;
    name: string;
    sort: string;
    show: boolean;
}

@Component({
    name: "CloudTable",
    template: require("./cloud.table.html"),
    props: {
        title: Array,
        list: Array,
        operations: Array,
        listLoading: Boolean,
        type: String,
        selectable: {
          type: Function,
          default: function() {
            return true;
          }
        },
        query: {
 
        },
        className: {
          type: String,
          default: ""
        },
      },

    computed: {
        tableHeader() {
           return this.$props.title.filter((item: TitleType, index: number) => item.show);
        },
     }, 
    methods: {
        handleClick(row) {
          console.log(row);
        },
        pageChange(val) {
            this.$props.query.pageIndex = val;
            this.$emit("getList", this.$props.query);
          },
        sizeChange(val) {
            this.$props.query.pageRows = val;
            this.$emit("getList", this.$props.query);
        }
    },
})
export class CloudTable extends Vue {
    data() {
        return {
           titlelist: this.$props.title,
           pagequery: this.$props.query,
           pageSizes: [10, 20, 30, 40],
        };
    }
}