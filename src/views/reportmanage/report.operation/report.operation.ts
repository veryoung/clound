import { SpliceTree } from "@components/splicetree/splice.tree";
import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { FormRuleType } from "@utils/form.validator";
import Component from "vue-class-component";
import { mapGetters } from "vuex";


import { ModuleTitle } from "@components/title/module.title";
import { Auxiliary } from "@utils/auxiliary";
import { FormType, TagType } from "@views/websitemanage/website.operation/website.operation.attachement";
import { CustomTags } from "@components/customtags/custom.tags";
import { DetailBaseClass } from "@views/base/base.class";
import { ReportService } from "@server/report";
import { REPORTEVENT } from "@store/report.type";


const Aux = new Auxiliary<string>();
require("./report.operation.styl");

@Component({
    name: "websiteoperation",
    template: require("./report.operation.html"),
    props: {
        operation: {
            type: String,
            default: "add"
        }
    },
    computed: {
        ...mapGetters([
            "reportTemplateDetail"
        ])
    },
    components: {
        ModuleTitle,
        SpliceTree,
    }
})

export class ReportOperation extends DetailBaseClass {
    // init props
    public operation: "add" | "editor";

    // init computed
    public reportTemplateDetail: {
        [extra: string]: {
            cycle: string;
            cycle_range: string[];
            indicators: string[];
            name: string;
        }
    };

    // init data
    public titles = ["添加模板"];
    public form: ReportOperationFormType = {
        name: "",
        cycle: "day",
        cycle_range: [],
        indicators: [],
    };
    public attackItem: Array<string> = [];
    public defenItem: Array<string> = [];
    // 防御详情
    public defenseOption: Array<any> = [
        { label: "攻击拦截趋势", value: "defenAttack_tendency" },
        { label: "网站攻击拦截情况", value: "defenWeb_info" },
        { label: "攻击类型分布", value: "attackType_spread" },
        { label: "攻击源IP排行", value: "attackIP_rank" },
        { label: "攻击源地域排行", value: "attackSource_rank" },
    ];

    public attackOption: Array<any> = [
        { label: "请求加速", value: "requset_spead" },
        { label: "流量加速", value: "fluent_spead" },
        { label: "访问IP数", value: "access_ip" },
        { label: "网站PV数", value: "website_pv" },
        { label: "网站访问地域排行", value: "websiteAccess_ip_pv" },
    ];
    // 判断全选
    public isIndeterminate: boolean = true;
    public checkAll: boolean = false;
    public checkLength: number = this.defenseOption.length + this.attackOption.length;

    // 表单验证
    public rules: FormRuleType = {
        name: [
            { required: true, message: "请填写模板名称", trigger: "blur" },
            { min: 2, max: 15, message: "不符合字符规范，字符长度2-15字符", trigger: "blur" }
        ],
    };



    // init lifecircle hook
    created() {
        let id = this.$route.params.id;
        if (this.operation === "add") {
            this.titles = ["添加模板"];
        } else {
            this.titles = ["编辑模板"];
            this.$store.dispatch(REPORTEVENT.GETREPORDETAIL, { id: id });
        }
        let that = this;
        this.EventBus.register(this.CONSTANT.GETREPORDETAIL, function () {
            let temp = that.reportTemplateDetail[id];
            let tempDefenItem: string[] = [];
            let tempAttackItem: string[] = [];
            console.log(temp);
            if (temp) that.form.name = temp.name;
            for (let key in temp.indicators) {
                for (let item of that.defenseOption) {
                    if (temp.indicators[key] === item.value) {
                        tempDefenItem.push(temp.indicators[key]);
                    }
                }
                for (let item of that.attackOption) {
                    if (temp.indicators[key] === item.value) {
                        tempAttackItem.push(temp.indicators[key]);
                    }
                }
            }
            that.defenItem = tempDefenItem;
            that.attackItem = tempAttackItem;
            that.form.indicators = temp.indicators;
            that.form.cycle_range = temp.cycle_range;
            that.form.cycle = temp.cycle;
        });
    }

    destroyed() {
        Aux.getIds().map((id, $index) => {
            this.EventBus.unRegister(id);
        });
    }


    // init methods
    getData(targetData: any) {
        this.form.cycle_range = [];
        for (let key in targetData) {
            this.form.cycle_range.push(targetData[key].id);
        }
    }

    handleCheckAllChange(val: boolean) {
        let defenseOptions: Array<string> = [];
        let attackOptions: Array<string> = [];
        for (let key in this.defenseOption) {
            defenseOptions.push(this.defenseOption[key].value);
        }
        for (let key in this.attackOption) {
            attackOptions.push(this.attackOption[key].value);
        }
        this.defenItem = val ? defenseOptions : [];
        this.attackItem = val ? attackOptions : [];
        this.isIndeterminate = false;
    }


    handleOptionsChange(val: string) {
        this.checkAll = this.checkLength === this.attackItem.length + this.defenItem.length;
        this.isIndeterminate = this.attackItem.length + this.defenItem.length > 0 && this.checkLength < this.attackItem.length + this.defenItem.length;
    }

    submitForm() {
        // 将选择的指标合在一起
        this.form.indicators = this.defenItem.concat(this.attackItem);

        let temp: any = this.$refs.formbasic;
        let flag: boolean = false;
        temp.validate((valid: any) => {
            flag = valid;
        });
        if (flag) {
            switch (this.operation) {
                case "add":
                    ReportService.AddReport(this.form).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "添加模板成功",
                                    type: "success"
                                });
                                this.$router.go(-1);
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case "editor":
                    ReportService.EditReport(Object.assign(this.form, { id: this.$route.params.id })).then((response: AxiosResponse<ResType>) => {
                        let res: ResType = response.data;
                        switch (res.status) {
                            case "suc":
                                this.$notify({
                                    title: "提示",
                                    message: "编辑模板成功",
                                    type: "success"
                                });
                                this.$router.go(-1);
                                break;
                            default:
                                break;
                        }
                    });
                default:
                    break;
            }
        }



    }

    back() {
        this.back();
        this.$router.go(-1);
    }
}

export interface ReportOperationFormType {
    name: string;
    cycle: string;
    cycle_range: Array<string>;
    indicators: Array<string>;
}






