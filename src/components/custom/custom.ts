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
        }`);
    },
    props: {
        color: {
            type: String
        }
    }
})
export class Custom extends Vue {
}