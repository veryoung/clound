export const barConfig = {
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
        show: false,
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
        data: ["Top1", "Top2", "Top3", "Top4", "Top5", "Top6", "Top7", "Top8", "Top9", "Top10"],
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
            name: "2012年",
            itemStyle: {
                normal: {
                    color: "#f4f5f7"
                }
            },
            barWidth: 20,
            silent: true,
            barGap: "-100%", // Make series be overlap
            type: "bar",
            animation: false,
            data: [630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230, 630230]
        },
        {
            animation: false,
            name: "2011年",
            type: "bar",
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: "#e8e8e8"
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



export const lineConfig = {
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
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7],
            animation: false
        },
        {
            name: "CC攻击",
            type: "line",
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4],
            animation: false
        }
    ]
};


export const pieConfig = {
    // color: ["#3398DB", "#cccccc", "#46dced", "#c21"],
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: "right",
        y: "top",
        data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6", "rose7", "rose8"],
        orient: "vertical2"
    },
    series: [
        {
            type: "pie",
            animation: false,
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

