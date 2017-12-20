import Component from "vue-class-component";
import Vue from "vue";

import { TissueTree } from "@components/tissuetree/tree";

require("./add.organization.frame.styl");
@Component({
    name: "addmodel",
    template: require("./add.organization.frame.html"),
    props: {
        dialogVisible: Boolean,
    },
    components: {
        TissueTree
    },
})
export class AddOrganizationFrame extends Vue {
    // init data
    public dialogVisible: Boolean = false;

    // lifecycle hook
    created() {
    }

    // init method
    getList() {

    }

    handleClose() {
        this.$emit("close", false);
    }

}