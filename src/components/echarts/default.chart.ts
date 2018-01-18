const echarts = require("echarts");
import Vue from "vue";


export class ChartComponent extends Vue {
    // init props
    public option: any;
    // Decorator
    // echarts 对象
    public echarts: any;
    // 默认的配置
    public defaultOption: any;
    // 默认的渲染id
    public id: string;
    // init data
    // echarts 实例
    public chart: any = "";
    // init lifecircle hook
    mounted() {
        this.chart = this.echarts.init(document.getElementById(this.id));
        let result: any = (<any>Object).assign({}, this.defaultOption, this.option);
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(result);
    }
}

// echarts装饰器，功能类似mixins
export function chartConfig(obj: any, id: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            // init data
            echarts = echarts;
            defaultOption = obj;
            id = id;
        };
    };
}
