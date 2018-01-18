import Vue from "vue";
import Component from "vue-class-component";
const echarts = require("echarts");



@Component({
    name: "line",
    template: require("./line.html"),
    props: {
        option: {
            type: Object
        }
    }
})
export class Line extends Vue {
    // init props
    public option: any;
    // init data
    public chart: any = "";
    // init lifecircle hook
    public defaultOption: any = {
        tooltip: {},
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
    };
    created() {
        this.chart = echarts.init(document.getElementById("line-cloud"));
        let result: any = (<any>Object).assign({}, this.defaultOption, this.option);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(result);
    }
}