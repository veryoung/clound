import Component from "vue-class-component";
import { BaseChart } from "@components/echarts/base.chart";



@Component({
    name: "barChart",
    template: require("./bar.html"),
    props: {
        datas: {
            type: Object,
        },
        dt: {
            type: String,
        }
    }
})

export class BarComponents extends BaseChart {
    // init props
    protected dt: string;
    protected datas: {
        series: {
            data: number[],
        }[],
    };
    // init data
    private id: string = this.buildId(Math.floor(Math.random() * 1000) + "");
    private baseOption = {
        title: {
            show: false,
        },
        tooltip: {
            show: true,
            formatter: function (params: any) {
                return "<div >" + params.data.name + "</div>" + "<div >" + params.data.value + "次" + "</div>";
            },
        },
        legend: {
            show: true,
            borderColor: "#f33",
        },
        calculable: true,
        grid: {
            left: "10%",
            top: "3%",
            bottom: "3%",
            right: "0"
        },
        yAxis: [{
            "type": "category",
            offset: 0,
            nameLocation: "start",
            nameGap: 33,
            "axisLabel": {
                "interval": 0,
                inside: false,
                margin: 8,
            },
            axisTick: {
                alignWithLabel: true,
                interval: 0,
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: ["Top10", "Top9", "Top8", "Top7", "Top6", "Top5", "Top4", "Top3", "Top2", "Top1"],
            splitLine: {
                show: false
            },
        }],
        xAxis: [{
            // type: "value",
            name: "",
            // max: 53500
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#00ccfe",
                },
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                formatter: function (param: any) {
                    return param + "%";
                },
                textStyle: {
                    color: "#00ccfe",
                }
            }
        }],
        series: [
            {
                itemStyle: {
                    normal: {
                        color: "#f4f5f7"
                    }
                },
                barWidth: 25,
                silent: true,
                barGap: "-100%", // Make series be overlap
                type: "bar",
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            },
            {
                type: "bar",
                legendHoverLink: true,
                barWidth: 25,
                itemStyle: {
                    normal: {
                        color: "#3398DB"
                    },
                    shadowBlur: {
                        shadowColor: "#e8e8e8"
                    }
                },
                label: {
                    "normal": {
                        "show": true,
                        "position": [5, 5],
                        "formatter": function (params: any) {
                            return params.data.name + ":  " + params.data.value + "次";
                        },
                        "textStyle": {
                            "color": "#ffffff"
                        }
                    }
                },
                data: [{
                    name: "Top10",
                    value: 0
                }, {
                    name: "Top9",
                    value: 0
                },
                {
                    name: "Top8",
                    value: 0
                },
                {
                    name: "Top7",
                    value: 0
                },
                {
                    name: "Top6",
                    value: 0
                },
                {
                    name: "Top5",
                    value: 0
                },
                {
                    name: "Top4",
                    value: 0
                },
                {
                    name: "Top3",
                    value: 0
                },
                {
                    name: "Top2",
                    value: 0
                },
                {
                    name: "Top1",
                    value: 0
                },
                ]

            },
        ]
    };


    protected install(): any {
        console.log(this.datas);
        if (this.datas.series[0].data.length > 0) {
            this.baseOption.series[0].data = this.datas.series[0].data;
            this.baseOption.series[1].data = this.datas.series[1].data.reverse();
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