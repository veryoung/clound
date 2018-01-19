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
    public title: string = "";
    // init lifecircle
    updated() {
        if (this.tags.length < this.total) {
            this.addFlag = true;
        } else {
            this.addFlag = false;
        }        
    }
    // init methods
    closeTag(value: string, $index: number) {
        let that = this;
        this.$emit("getTags", value, "del", function (flag: boolean) {
            // that.tags.splice($index, 1);
            if (that.tags.length < that.total) {
                that.addFlag = true;
            } else {
                that.addFlag = false;
            }
        });

    }

    handleInputConfirm() {
        let inputValue = this.title;
        if (inputValue === "") {
            return;
        }
        if (this.tags.indexOf(inputValue) !== -1) {
            this.$emit("error", { message: "请不要添加重复数据", code: 0 });
            return;
        }
        let that = this;
        this.$emit("getTags", inputValue, "add", function (flag: boolean) {
            // if (flag) {
            //     that.tags.push(that.title);
            // }
            if (that.tags.length >= that.total) {
                that.addFlag = false;
            } else {
                that.addFlag = true;
            }
            that.inputVisible = false;
            that.title = "";
        });
    }
}