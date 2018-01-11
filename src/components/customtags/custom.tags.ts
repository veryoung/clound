import Vue from "vue";
import Component from "vue-class-component";


require("./custom.tags.styl");
@Component({
    name: "customtags",
    template: require("./custom.tags.html"),
    props: {
        total: {
            type: Number,
            default: 5
        },
        tags: {
            type: Array,
            default: function () {
                return [];
            }
        },
        addTagText: {
            type: String,
            default: "添加"
        }
    }
})
export class CustomTags extends Vue {
    // init props
    public total: number;
    public tags: string[];
    public addTagText: string;

    // init data
    public addFlag: boolean = true;
    public inputVisible: boolean = false;
    public tag: string = "";

    // init methods
    closeTag($index: number) {
        this.tags.splice($index, 1);
        if (this.tags.length < this.total) {
            this.addFlag = true;
        } else {
            this.addFlag = false;
        }
    }

    handleInputConfirm() {
        let inputValue = this.tag;
        if (inputValue === "" || inputValue in this.tags) {
            return;
        }
        this.tags.push(this.tag);
        if (this.tags.length >= this.total) {
            this.addFlag = false;
        } else {
            this.addFlag = true;
        }
        this.inputVisible = false;
        this.tag = "";
        this.$emit("getTags", this.tags);
    }
}