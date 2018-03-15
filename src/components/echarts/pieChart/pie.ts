import Component from "vue-class-component";
import { BaseChart } from "@components/echarts/base.chart";

@Component({
    name: "pieComponent",
    template: require("./pie.html"),
    props: {
        datas: {
            type: Object,
        },
        dt: {
            type: String,
        }
    }
})
export class PieComponents extends BaseChart {
    // init props
    protected dt: string;
    protected datas: {
        tooltip: {
            formatter: string,
        },
        series: {
            label: {
                normal: {
                    formatter: string;
                }
            },
            data: number[],
        }[],
        legend: {
            data: string[],
        },
    };

    private id: string = this.buildId(Math.floor(Math.random() * 1000) + "");
    private baseOption = {
        color: ["#78cad7", "#36b2c8", "#9ed5c8", "#70c4b2", "#d6e7aa", "#b3d67f", "#ecbd96", "#f3a964", "#ea918c", "#ec695e"],
        tooltip: {
            trigger: "item",
            // formatter: "{b}: {c}次 ({d}%)",
            formatter: "{b}",
        },
        legend: {
            x: "center",
            y: "top",
            data: ["暂无数据"],
        },
        series: [
            {
                type: "pie",
                radius: [30, 110],
                center: ["50%", "50%"],
                roseType: "area",
                label: {
                    normal: {
                        // formatter: "{blank|}{title|{b}:}{Textblank|}{titleNum|{c}次}{Textblank|}{perText|占比:}{Textblank|}{per|{d}%}{blank|}  ",
                        formatter: "{blank|}{title|{b}}{blank|}  ",
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
                    { value: 25, name: "暂无数据" },
                ]
            }
        ]
    };
    protected install(): any {
        if (this.datas.series[0].data.length > 0) {
            this.baseOption.legend.data = this.datas.legend.data;
            this.baseOption.tooltip.formatter = this.datas.tooltip.formatter;
            let temp: any = this.datas.series[0].data;
            this.baseOption.series[0].data = temp;
            this.baseOption.series[0].label.normal.formatter = this.datas.series[0].label.normal.formatter;
        }

        return this.baseOption;
    }

    created() {
        this.vm.$watch(() => {
            return this.datas;
        }, (o: any, n: any) => {
            if (JSON.stringify(o) !== JSON.stringify(n)) {
                this.renderChart(this.install());
            }
        }, {
                deep: true
            });
    }


    mounted() {
        this.init(this.id);
    }
}
