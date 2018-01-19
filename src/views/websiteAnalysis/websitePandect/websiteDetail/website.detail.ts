import { BarComponent } from "@components/echarts/bar/bar";
import { PieComponent } from "@components/echarts/pie/pie";
import { LineComponent } from "@components/echarts/line/line";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";

require("./website.detail.styl");
@Component({
    name: "websitedetail",
    components: {
        ModuleTitle,
        LineComponent,
        PieComponent,
        BarComponent,
    },
    template: require("./website.detail.html"),
})

export class WebsiteDetail extends Vue {
    // init computed
    // init data
    public titles: string[] = ["安全评级"];

    public form: any = {
        datePicker: "今天",
    };

    public attackTimeOpt: any = {};
    public attackTypeOpt: any = {};
    public safeLevelOpt: any = {};
    // lifecircle hook 
    created() {
        this.attackTimeOpt = {
            legend: {
                data: ["Web攻击", "CC攻击"]
            },
            xAxis: [{
                axisPointer: {
                    label: {
                        formatter: function (params: any) {
                            return "降水量  " + params.value
                                + (params.seriesData.length ? "：" + params.seriesData[0].data : "");
                        }
                    }
                },
                data: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
            }],
            series: [
                {
                    name: "Web攻击",
                    type: "line",
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7]
                },
                {
                    name: "CC攻击",
                    type: "line",
                    data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4]
                }
            ]
        };
        this.attackTypeOpt = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x : "center",
                y : "top",
                data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6", "rose7", "rose8"]
            },
            series: [
                {
                    type: "pie",
                    radius: [30, 110],
                    center: ["50%", "50%"],
                    roseType: "area",
                    label: {
                        normal: {
                            formatter: "{blank|}{title|{b}:}{Textblank|}{titleNum|{c}次}{Textblank|}{perText|占比:}{Textblank|}{per|{d}%}{blank|}  ",
                            backgroundColor: "#eee",
                            borderRadius: 4,
                            rich: {
                                blank: {
                                    width: 10,
                                },
                                title: {
                                    fontSize: 14,
                                    lineHeight: 33
                                },
                                Textblank: {
                                    width: 5,
                                },
                                titleNum: {
                                    fontSize: 14,
                                    lineHeight: 33
                                },
                                perText: {
                                    fontSize: 14,
                                    lineHeight: 33
                                },
                                per: {
                                    fontSize: 14,
                                    lineHeight: 33,
                                }
                            }
                        }
                    },
                    data: [
                        { value: 10, name: "rose1" },
                        { value: 5, name: "rose2" },
                        { value: 15, name: "rose3" },
                        { value: 25, name: "rose4" },
                        { value: 20, name: "rose5" },
                        { value: 35, name: "rose6" },
                        { value: 30, name: "rose7" },
                        { value: 40, name: "rose8" }
                    ]
                }
            ]
        };
        this.safeLevelOpt = {

        };
    }
    // 选择方法
    exportChoose() {
        
    }
}