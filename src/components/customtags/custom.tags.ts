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
            return;
        }
        for (let tag of this.tags) {
            if (inputValue in tag) {
                this.$emit("error", { message: "数据源中已经存在该数据", code: 0 });
                return;
            }
        }
        let that = this;
        this.$emit("getTags", inputValue, function (flag: boolean) {
            if (flag) {
                that.tags.push({
                    title: that.title,
                    type: ""
                });
                if (that.tags.length >= that.total) {
                    that.addFlag = false;
                } else {
                    that.addFlag = true;
                }
                that.inputVisible = false;
                that.title = "";
            } else {

            }
        });
    }
}

export interface TagType {
    title: string;
    type: "" | "danger";
}