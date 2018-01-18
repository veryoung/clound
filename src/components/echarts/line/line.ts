import Component from "vue-class-component";
import { chartConfig, ChartComponent } from "@components/echarts/default.chart";



const timestamp: string = new Date().getTime() + "";
@chartConfig({
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: "plain",
        data: ["初始化"]
    },
    xAxis: {
        data: ["初始化数据1", "初始化数据2", "初始化数据3", "初始化数据4", "初始化数据5", "初始化数据6"]
    },
    yAxis: {
        show: true,
        type: "category"
    },
    series: [{
        name: "初始化",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
        tooltip: {
            formatter: "{a}<br />{b}<br />{c}"
        }
    }]
})
@Component({
    name: "lineComponent",
    template: require("./line.html"),
    props: {
        option: {
            type: Object
        },
        id: {
            type: String,
            default: `line-cloud${timestamp}`
        }
    }
})
export class LineComponent extends ChartComponent {
    mounted() {
        this.init();
    }
}