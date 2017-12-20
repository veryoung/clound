import Component from "vue-class-component";
import Vue from "vue";

require("./import.user.styl");
@Component({
    name: "imopotmodel",
    template: require("./import.user.html"),
    props: {
        dialogVisible: Boolean,
    },
})
export class ImportUserFrame extends Vue {
    // init data
    public dialogVisible: boolean;

    // lifecycle hook
    created() {
        this.getList();

    }

    // init method
    getList() {

    }

    handleClose(done: any) {
        this.$emit("close", false);
    }

}