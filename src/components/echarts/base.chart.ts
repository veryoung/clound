import { BaseLibrary } from "@views/base/base.class";
const echarts = require("echarts");

export class BaseChart extends BaseLibrary {
    protected init(options: any) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.buildId(Math.floor(Math.random() * 1000) + "")));

        // 指定图表的配置项和数据
        let option = options;

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    protected buildId(name: string) {
        const timestamp: string = new Date().getTime() + Math.floor(Math.random() * 1000) + "";
        return name + timestamp;
    }

    protected getDate(dt: string) {
        let date: string[] = [];
        if (dt === "0") {
            date = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
                "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
                "19:00", "20:00", "21:00", "22:00", "23:00"];
        } else if (dt === "7") {
            date = [];
        } else if (dt === "30") {
            date = [];
        }

    }
}