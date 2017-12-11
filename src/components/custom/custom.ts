import Vue from "vue";
import Component from "vue-class-component";


@Component({
    render: function (createElement) {
        return createElement("style", {
            attrs: {
                name: "custom",
                type: "text/css"
            }
        }, `.el-button--primary {
            color: #fff;
            background-color: ${this.$props.color};
            border-color: ${this.$props.color};
        }
        .el-header {
            background:linear-gradient(to right, ${this.$props.headerColor});
        }
        `);
    },
    props: {
        color: {
            type: String
        },
        headerColor: {
            type: String,
            default: "#00a0e9,#449dbf,#4bc892"
        }
    }
})
export class Custom extends Vue {
    // init props
    public headerColor: string = "#00a0e9,#449dbf,#4bc892";
}