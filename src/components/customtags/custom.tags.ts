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
    public tags: TagType[];
    public addTagText: string;

    // init data
    public addFlag: boolean = true;
    public inputVisible: boolean = false;
    public title: string = "";

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
        let inputValue = this.title;
        if (inputValue === "") {
            this.$emit("error", { message: "数据是空,不能添加", code: 1 });
            return;
        }
        for (let tag of this.tags) {
            if (inputValue in tag) {
                this.$emit("error", { message: "数据源中已经存在该数据", code: 0 });
                return;
            }
        }
        this.tags.push({
            title: this.title,
            type: ""
        });
        if (this.tags.length >= this.total) {
            this.addFlag = false;
        } else {
            this.addFlag = true;
        }
        this.inputVisible = false;
        this.title = "";
        this.$emit("getTags", this.tags);
    }
}

export interface TagType {
    title: string;
    type: "" | "danger";
}