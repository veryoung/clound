import Vue from "vue";
import Component from "vue-class-component";
const { quillEditor } = require("vue-quill-editor");
import "quill/dist/quill.snow.css";


// const toolbarOptions: any = [

//     ["bold", "italic", "underline", "strike"],        // toggled buttons
//     ["blockquote", "code-block"],

//     [{ "header": 1 }, { "header": 2 }],               // custom button values
//     [{ "list": "ordered" }, { "list": "bullet" }],
//     [{ "script": "sub" }, { "script": "super" }],      // superscript/subscript
//     [{ "indent": "-1" }, { "indent": "+1" }],          // outdent/indent
//     [{ "direction": "rtl" }],                         // text direction

//     [{ "size": ["small", false, "large", "huge"] }],  // custom dropdown
//     [{ "header": [1, 2, 3, 4, 5, 6, false] }],

//     [{ "color": [] }, { "background": [] }],          // dropdown with defaults from theme
//     [{ "font": [] }],
//     [{ "align": [] }],

//     ["clean"]                                         // remove formatting button

// ];

@Component({
    name: "richtexteditor",
    template: require("./editor.html"),
    components: {
        quillEditor
    },
    props: {
        content: {
            type: String,
            default: ""
        },
        toolbarOptions: {
            type: Array,
            default: function () {
                return [

                    ["bold", "italic", "underline", "strike"],        // toggled buttons
                    ["blockquote", "code-block"],

                    [{ "header": 1 }, { "header": 2 }],               // custom button values
                    [{ "list": "ordered" }, { "list": "bullet" }],
                    [{ "script": "sub" }, { "script": "super" }],      // superscript/subscript
                    [{ "indent": "-1" }, { "indent": "+1" }],          // outdent/indent
                    [{ "direction": "rtl" }],                         // text direction

                    [{ "size": ["small", false, "large", "huge"] }],  // custom dropdown
                    [{ "header": [1, 2, 3, 4, 5, 6, false] }],

                    [{ "color": [] }, { "background": [] }],          // dropdown with defaults from theme
                    [{ "font": [] }],
                    [{ "align": [] }],

                    ["clean"]                                         // remove formatting button

                ];
            }
        },
        placeholderText: {
            type: String,
            default: "请输入内容"
        }
    }
})
export class RichTextEditor extends Vue {
    // init props
    public content: string;
    public toolbarOptions: any[];
    public placeholderText: String;

    // init computed
    get editor() {
        let temp: any = this.$refs.myQuillEditor;
        return temp.quill;
    }
    // init data
    public editorOption: any = {
        modules: {
            // toolbar: "#toolbar"
            // { "size": ["small", false, "large", "huge"] }, 
            toolbar: [{ "header": [1, 2, 3, 4, 5, 6, false] }, { "list": "ordered" }, { "list": "bullet" }, "bold", "italic", "underline", "strike", "link", "blockquote", "code-block", { "color": [] }, { "background": [] }, "clean"]
        },
        placeholder: this.placeholderText,
        theme: "snow"
    };

    // init lifecircle hook;
    creatd() {
        console.log(this.editor());
    }

    // methods
    onEditorChange(event: any) {
        this.$emit("content", event.html);
    }
}