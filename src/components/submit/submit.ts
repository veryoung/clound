import Component from "vue-class-component";
import Vue from "vue";



@Component({
    name: "submitbtn",
    template: require("./submit.html"),
    props: {
        times: {
            type: Number,
            default: 3000
        }
    }
})
export class SubmitBtn extends Vue {
    // init props
    public times: number;
    // init data
    public btnCan: boolean = false;

    // init methods
    public onSubmit() {
        this.$emit("submit");
        if (!this.btnCan) {
            this.btnCan = true;
        }
        window.setTimeout(() => {
            this.btnCan = false;
        }, this.times);
    }
}