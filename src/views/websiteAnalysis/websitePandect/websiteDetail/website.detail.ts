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
    // lifecircle hook 
    created() {
        this.attackTimeOpt = {
            legend: {
                data: ["Web攻击", "CC攻击"],
                right: "10%" ,
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
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x : "center",
                y : "top",
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
              formatter: function(param: any) {
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
                  formatter: function(e: any) {
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
                  textStyle: {
                    fontSize: 12,
                    fontWeight: ""
                  }
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
                  formatter: function(param: any) {
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
            // title: {
            //     text: "世界人口总量",
            //     subtext: "数据来自网络"
            // },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                show: false,
                height: 0,
                data: ["2011年", "2012年"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "value",
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: "category",
                data: ["TOP 1", "TOP 2", "TOP 3", "TOP 4", "TOP 5", "TOP 6", "TOP 7", "TOP 8", "TOP 9", "TOP 10"]
            },
            series: [
                {
                    name: "2011年",
                    type: "bar",
                    data: [18203, 23489, 29034, 104970, 131744, 630230, 630230, 630230, 630230, 630230]
                },
            ]
        };
    }
    // 选择方法
    exportChoose() {
        
    }
}