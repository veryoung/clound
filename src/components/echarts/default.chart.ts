const echarts = require("echarts");
import Vue from "vue";
import { vm } from "@utils/event";


export class ChartComponent extends Vue {
    // init props
    protected option: any;
    // Decorator
    // echarts 对象
    protected echarts: any;
    // 默认的配置
    protected defaultOption: any;
    // 默认的渲染id
    protected id: string;
    // init data
    // echarts 实例
    protected chart: any = "";
    protected init() {
        this.chart = this.echarts.init(document.getElementById(this.id));
        let result: any = (<any>Object).assign({}, this.defaultOption, this.option);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(result);
        vm.$watch(() => {
            return this.option;
        }, (o: any, n: any) => {
            this.chart.setOption(this.option);
        }, {
                deep: true
            });
    }
}

// echarts装饰器，功能类似mixins
export function chartConfig(obj: any) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            // init data
            echarts = echarts;
            defaultOption = obj;
        };
    };
}


export function buildId(name: string) {
    const timestamp: string = new Date().getTime() + Math.floor(Math.random() * 1000) + "";
    return name + timestamp;
}