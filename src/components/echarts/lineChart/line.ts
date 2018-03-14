import Component from "vue-class-component";
import { BaseChart } from "@components/echarts/base.chart";

@Component({
    name: "lineChart",
    template: require("./line.html"),
    props: {
        datas: {
            type: Object,
        },
        dt: {
            type: String,
        }
    }
})
export class LineComponent extends BaseChart {
    // init props
    protected dt: string;
    protected datas: {
        xAxis: {
            data: string[];
        },
        series: {
            name: string[],
            type: string,
            data: number[],
            color: string;
        }[],
        legend: {
            data: string[],
            right: string,
        },
        tooltip: {
            formatter: string;
        }
    };
    // init data
    private baseOption = {
        legend: {
            data: ["Web攻击", "CC攻击"],
            right: "10%",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    color: "#ddd"
                }
            },
            backgroundColor: "rgba(255,255,255,1)",
            padding: [5, 10],
            textStyle: {
                color: "#000000",
            },
            extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
            formatter: `{b0}<br />
                <span style='color:#BFE83B;'>{a0}: {c0}次</span>
                <br />
                <span style='color:#FCBE83;'>{a1}: {c1}次</span>
                <br />
                <span style='color:#FCBE83;'>{a2}: {c2}次</span>`
        },
        xAxis: [{
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
                "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
                "19:00", "20:00", "21:00", "22:00", "23:00"]
        }],
        yAxis: {
            splitNumber: 6,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: "Web攻击",
                type: "line",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "CC攻击",
                type: "line",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                lineStyle: {
                    normal: {
                        width: 2,
                        shadowColor: "rgba(0,0,0,0.4)",
                        shadowBlur: 8,
                        shadowOffsetY: 8
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#FCBE83"
                    }
                },
            }
        ]
    };

    /**
     *         if (this.datas.xAxis.data.length === 0) {
            let obj = this.createDate(this.dt);
            this.datas.xAxis.data = obj.xDate;
            for (let i = 0; i < this.datas.legend.data.length; i++) {
                this.datas.series[i].data = obj.yDate;
            }
        }
     */

    protected install(): any {
        for (let i = 0; i < this.datas.legend.data.length; i++) {
            this.baseOption.series[i].name = this.datas.legend.data[i];
            this.baseOption.series[i].data = this.datas.series[i].data;
            this.baseOption.series[i].lineStyle = {
                normal: {
                    width: 2,
                    shadowColor: "rgba(0,0,0,0.4)",
                    shadowBlur: 8,
                    shadowOffsetY: 8
                }
            };
            this.baseOption.series[i].itemStyle = {
                normal: {
                    color: this.datas.series[i].color
                }
            };
            let temp = `{b0}<br />`;
            let template = `<span style='${this.datas.series[i].color}'>{a${i}}: {c${i}}次</span><br />`;
            this.baseOption.tooltip.formatter = temp + template;
        }
        this.baseOption.legend = this.datas.legend;
        this.baseOption.xAxis[0].data = this.datas.xAxis.data;
        return this.baseOption;
    }

    created() {
        this.vm.$watch(() => {
            return this.datas;
        }, (o: any, n: any) => {
            this.init(this.install());
        }, {
                deep: true
            });
    }

    mounted() {
        this.init(this.install());
    }
}