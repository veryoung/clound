import { RichTextEditor } from "@components/richtexteditor/editor";
import { ModuleTitle } from "@components/title/module.title";
import { EventBus, CONSTANT } from "@utils/event";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";
import { Auxiliary } from "@utils/auxiliary";
import { FormRuleType } from "@utils/form.validator";
import { NoticeServer } from "@server/notice";
import { OrganizationServer } from "@server/organization";
import { UserServer } from "@server/user";


const Aux = new Auxiliary<string>();
require("./email.notice.operation.styl");
@Component({
    name: "emailcnoiceoperation",
    template: require("./email.notice.operation.html"),
    props: {
    },
    computed: {
        ...mapGetters([
        ])
    },
    components: {
        ModuleTitle,
        RichTextEditor,
    }
})

export class EmailNoiceOperation extends Vue {
    // init props

    // init computed

    // init data
    public form: EmailNoticeFormType = {
        content: "",
        object: "",
        receiver_ids: [],
    };

    // 标题
    public titles: string[] = ["写邮件"];


    // 表单验证
    public rules: FormRuleType = {
        object: [
            { required: true, message: "请填写邮件标题", trigger: "blur" },
            { min: 1, max: 40, message: "不符合字符规范，字符长度1-40字符", trigger: "blur" }
        ],
        content: [
            { required: true, message: "请添加邮件内容", trigger: "blur" },
            { min: 1, max: 1000, message: "不符合字符规范，字符长度1-1000字符", trigger: "blur" }
        ],
        receiver_ids: [
            { required: true, message: "请选择收件人", trigger: "blur" },
            
        ],
    };



    // init lifecircle hook
    created() {
    }
    destroyed() {
    }
    public checkoutData: any = {};
    // init methods
    /***************tree */

    handleCheckChange(data: any, checked: any, indeterminate: any) {
        this.getData();
        // console.log(data, checked, indeterminate);
        // if (checked) {
        //     if (data.is_leaf) {
        //         this.checkoutData[data.id] = data;
        //     } else {
        //         UserServer.getUserList({
        //             ori_id: data.id,
        //             page: "1",
        //             page_size: "999"
        //         }).then((response: AxiosResponse<ResType>) => {
        //             let res: ResType = response.data;
        //             switch (res.status) {
        //                 case "suc":
        //                     for (let item of res.data.data) {
        //                         this.checkoutData[item.uid] = item;
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        //     }
        // } else {
        //     if (data.is_leaf) {
        //         delete this.checkoutData[data.id];
        //     } else {
        //         UserServer.getUserList({
        //             ori_id: data.id,
        //             page: "1",
        //             page_size: "999"
        //         }).then((response: AxiosResponse<ResType>) => {
        //             let res: ResType = response.data;
        //             switch (res.status) {
        //                 case "suc":
        //                     for (let item of res.data.data) {
        //                         delete this.checkoutData[item.uid];
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        //     }
        // }

        // if (checked) {
        //     let temp: any = this.$refs.mailList;
        //     let sourceData: any[] = temp.getCheckedNodes();
        //     for (let item of sourceData) {
        //         this.checkoutData = {};
        //         if (item.is_leaf) {
        //             this.checkoutData[item.id] = item;
        //             continue;
        //         }
        //         UserServer.getUserList({
        //             ori_id: data.id,
        //             page: "1",
        //             page_size: "999"
        //         }).then((response: AxiosResponse<ResType>) => {
        //             let res: ResType = response.data;
        //             switch (res.status) {
        //                 case "suc":
        //                     for (let item of res.data.data) {
        //                         this.checkoutData[item.uid] = item;
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        //     }
        // }
    }

    getData() {
        let temp: any = this.$refs.mailList;
        let sourceData: any[] = temp.getCheckedNodes();
        this.form.receiver_ids = [];
        this.checkoutData = {};
        for (let item of sourceData) {
            if (item.is_leaf) {
                this.checkoutData[item.id] = item;
                this.form.receiver_ids.push(item.id);
                continue;
            }
            UserServer.getUserList({
                ori_id: item.id,
                page: "1",
                page_size: "999"
            }).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        for (let item of res.data.data) {
                            this.checkoutData[item.uid] = item;
                            this.form.receiver_ids.push(item.id);
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    }
    loadNode(node: any, resolve: any) {
        if (node.level === 0) {
            let state: {
                id: string;
                tree_label: string;
                nodes: any[]
            }[] = [{
                id: "",
                tree_label: "全部组织机构",
                nodes: []
            }];

            OrganizationServer.getTree().then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        if (process.env.PLATFORM === "portal") {
                            state = res.data;
                        } else {
                            state[0].nodes = res.data;
                        }
                        resolve(state);
                        break;
                    default:
                        break;
                }
            });
        }

        if (node.level > 0) {
            if (node.data.id === "") {
                return resolve(node.data.nodes);
            } else {
                UserServer.getTreeUserlist({
                    ori_id: node.data.id
                }).then((response: AxiosResponse<ResType>) => {
                    let res: ResType = response.data;
                    switch (res.status) {
                        case "suc":
                            for (let item of res.data) {
                                item.is_leaf = true;
                            }
                            resolve(node.data.nodes.concat(res.data));
                            break;
                        default:
                            break;
                    }
                });

            }
        }
    }
    /***************tree */
    submitForm(formBasic: string) {
        let temp: any = this.$refs.noticeform;
        let flag: boolean = false;
        console.log(this.form.receiver_ids);

        if (this.form.receiver_ids.length === 0) {
            this.$notify({
                title: "提示",
                message: "请选择收件人",
                type: "warning"
            });
            return;
        }
        temp.validate((valid: any) => {
            flag = valid;
        });
        if (flag) {
            NoticeServer.sendEmail(this.form).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        this.$notify({
                            title: "提示",
                            message: "邮件填写成功",
                            type: "success"
                        });
                        this.$router.push("/SystemManagement/ReportManagement/emaillnotice");
                        break;
                    case "error":
                        this.$notify({
                            title: "提示",
                            message: res.message || "邮件填写失败",
                            type: "error"
                        });
                        break;
                    default:
                        break;
                }
            });
        }
    }

    back() {
        this.$router.go(-1);
    }

    content(val: string) {
        this.form.content = val;
    }

}


export interface EmailNoticeFormType {
    content: string;
    object: string;
    receiver_ids: Array<number>;
}