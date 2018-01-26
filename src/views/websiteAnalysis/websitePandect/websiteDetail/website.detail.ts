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
    public attackResource10Opt: any = {};
    public demoOpT: any = {};
    public demoOpT2: any = {};
    // lifecircle hook 
    created() {
        this.attackTimeOpt = {
            legend: {
                data: ["Web攻击", "CC攻击"],
                right: "10%",
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
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                axisTick: {
                    show: false
                },
                data: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
            }],
            yAxis: {
                splitNumber: 6,
                axisLabel: {
                    formatter: "{value} %"
                },
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
            // color: ["#3398DB", "#cccccc", "#46dced", "#c21"],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x: "center",
                y: "top",
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
            title: {
                show: false
            },
            tooltip: {
                show: true,
                formatter: function (param: any) {
                    return "<em >" + param.value + "</em>";
                }
            },
            series: [
                {
                    name: "dashpie",
                    type: "gauge",
                    center: ["50%", "53%"],
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            shadowBlur: 0,
                            color: [
                                [0.1, "#58c9f3"],
                                [0.3, "#78cd51"],
                                [0.6, "#f1c500"],
                                [0.8, "#f0ad4e"],
                                [1, "#ff6c60"]
                            ]
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        length: 40,
                        lineStyle: {
                        }
                    },
                    axisLabel: {
                        distance: -65,
                        textStyle: {
                            color: "#6eba44",
                            fontSize: "16"
                        },
                        inside: true,
                        formatter: function (e: any) {
                            switch (e + "") {
                                case "0":
                                    return "很低";
                                case "20":
                                    return "低";
                                case "50":
                                    return "中";
                                case "70":
                                    return "高";
                                case "100":
                                    return "很高";
                                default:
                                    return "";
                            }
                        },
                    },
                    // pointer: {
                    //   show: true
                    // },
                    itemStyle: {
                        normal: {
                            color: "#033858",
                            shadowBlur: 20
                        }
                    },
                    detail: {
                        show: true,
                        backgroundColor: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        borderColor: "#ccc",
                        formatter: function (param: any) {
                            let level = "";
                            if (param > 0 && param < 10) {
                                level = "很低";
                            } else if (param >= 10 && param <= 30) {
                                level = "低";
                            } else if (param >= 30 && param <= 60) {
                                level = "中";
                            } else if (param >= 60 && param <= 80) {
                                level = "高11";
                            } else if (param >= 80 && param <= 100) {
                                level = "很高";
                            } else {
                                param = "暂无";
                                level = "暂无";
                            }
                            return (
                                "安全评级" + "" + level
                            );
                        },
                        offsetCenter: [0, "70%"],
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    data: ["10"]
                }
            ]
        };
        this.attackResource10Opt = {
            color: ["#3398DB"],
            "tooltip": {
                "trigger": "axis",
                "axisPointer": { // 坐标轴指示器，坐标轴触发有效
                    "type": "shadow" // 默认为直线，可选为："line" | "shadow"
                }
            },
            legend: {
                show: false,
                height: 0,
                data: ["2011年"]
            },
            grid: {
                left: "3%",
                right: "0%",
                bottom: "0%",
                containLabel: true
            },
            "xAxis": [{
                "type": "value",
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                }
            }],
            yAxis: {
                type: "category",
                data: ["Top1", "Top2", "Top3", "Top4", "Top5", "Top6", "Top7", "Top8", "Top9", "Top10"],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
            },
            series: [
                {
                    name: "2012年",
                    itemStyle: {
                        normal: {
                            color: "#ddd"
                        }
                    },
                    barGap: "-100%", // Make series be overlap
                    type: "bar",
                    legendHoverLink: false,
                    data: [630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230],
                    label: {
                        show: false,
                    }
                },
                {
                    name: "2011年",
                    type: "bar",
                    label: {
                        "normal": {
                            "show": true,
                            "position": [5, 5],
                            "formatter": function (params: any) {
                                return params.data.name + ":                        " + params.data.value;
                            },
                            "textStyle": {
                                "color": "black"
                            }
                        }

                    },
                    data: [{
                        name: "北京",
                        value: 18203
                    }, {
                        name: "上海",
                        value: 23489
                    },
                    {
                        name: "深圳",
                        value: 29034
                    },
                    {
                        name: "广州",
                        value: 104970
                    },
                    {
                        name: "杭州",
                        value: 131744
                    },
                    {
                        name: "成都",
                        value: 123123
                    },
                    {
                        name: "南京",
                        value: 185432
                    },
                    {
                        name: "天津",
                        value: 177524
                    },
                    {
                        name: "南昌",
                        value: 154323
                    },
                    {
                        name: "合肥",
                        value: 630230
                    },
                    ]

                },
            ]
        };
        this.demoOpT = {
            title: {
                show: false,
            },
            tooltip: {
                show: true,
                formatter: function (params: any) {
                    return "<div >" + params.data.name + "</div>" + "<div >" + params.data.value + "</div>";
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
                    data: [630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230]
                },
                {
                    type: "bar",
                    legendHoverLink: true,                    
                    barWidth: 25,
                    itemStyle: {
                        normal: {
                            color: "#e8e8e8"
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
                                return params.data.name + ":  " + params.data.value;
                            },
                            "textStyle": {
                                "color": "#737373"
                            }
                        }
                    },
                    data: [{
                        name: "北京000",
                        value: 18203
                    }, {
                        name: "上海",
                        value: 23489
                    },
                    {
                        name: "深圳",
                        value: 29034
                    },
                    {
                        name: "广州",
                        value: 104970
                    },
                    {
                        name: "杭州",
                        value: 131744
                    },
                    {
                        name: "成都",
                        value: 123123
                    },
                    {
                        name: "南京",
                        value: 185432
                    },
                    {
                        name: "天津",
                        value: 177524
                    },
                    {
                        name: "南昌",
                        value: 154323
                    },
                    {
                        name: "合肥",
                        value: 630230
                    },
                    ]

                },
            ]
        };
        this.demoOpT2 = {
            tooltip: {
                show: true,
                formatter: function (params: any) {

                    return "<div >" + params.data.name + "</div>" + "<div >" + params.data.value + "</div>";
                },
            },
            grid: {
                left: "10%",
                top: "3%",
                bottom: "3%",
                right: "10%"
            },
            color: ["#3398DB"],
            xAxis: [{
                max: 630230,
                type: "value",
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: "#00ccfe",
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            yAxis: [{
                type: "category",
                data: ["Top1", "Top2", "Top3", "Top4", "Top5", "Top6", "Top7", "Top8", "Top9", "Top10"],
                nameTextStyle: {
                    color: "#b7ce9e",
                    fontSize: "18px"
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                }
            }],
            series: [{
                name: " ",
                type: "bar",
                barWidth: 20,
                silent: true,
                itemStyle: {
                    normal: {
                        color: "#f2f2f2"
                    }
                },
                barGap: "-100%",
                barCategoryGap: "50%",
                data: [630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230],
            }, {
                type: "bar",
                barWidth: 20,
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: function (params: any) {

                            return params.data.name + ": " + params.data.value;
                        },
                        textStyle: {
                            color: "black"
                        }
                    }
                },
                data: [{
                    name: "北京",
                    value: 18203
                }, {
                    name: "上海",
                    value: 23489
                },
                {
                    name: "深圳",
                    value: 29034
                },
                {
                    name: "广州",
                    value: 104970
                },
                {
                    name: "杭州",
                    value: 131744
                },
                {
                    name: "成都",
                    value: 123123
                },
                {
                    name: "南京",
                    value: 185432
                },
                {
                    name: "天津",
                    value: 177524
                },
                {
                    name: "南昌",
                    value: 154323
                },
                {
                    name: "合肥",
                    value: 630230
                },
                ],
            }]
        };
    }
    // 选择方法
    exportChoose() {

    }
}