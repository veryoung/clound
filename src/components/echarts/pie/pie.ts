import Component from "vue-class-component";
import { chartConfig, ChartComponent } from "@components/echarts/default.chart";


require("./pie.styl");

@chartConfig({
    title: {
        text: "南丁格尔玫瑰图",
        subtext: "纯属虚构",
        x: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: "center",
        y: "bottom",
        data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6", "rose7", "rose8"]
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
                show: true,
                type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    series: [
        {
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
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
}, "pie-cloud")
@Component({
    name: "pieComponent",
    template: require("./pie.html"),
    props: {
        option: {
            type: Object
        }
    }
})
export class PieComponent extends ChartComponent { }
