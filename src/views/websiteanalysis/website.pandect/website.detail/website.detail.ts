import { BarComponent } from "@components/echarts/bar/bar";
import { PieComponent } from "@components/echarts/pie/pie";
import { LineComponent } from "@components/echarts/line/line";
import { ModuleTitle } from "@components/title/module.title";
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { WEBSITEANALYSISEVENT } from "@store/website.analysis.type";
import { EventBus, CONSTANT } from "@utils/event";
import * as moment from "moment";


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
    computed: {
        ...mapGetters([
            "WebsitePandectDetailattackData",
            "WebsitePandectDetailaccessData",
        ])
    }
})

export class WebsiteDetail extends Vue {
    // init computed
    // init data
    // 初始化数据
    public WebsitePandectDetailattackData: AttackDetailType;
    public WebsitePandectDetailaccessData: AccessDetailType;
    public DetailattackData: AttackType = {
        level: 0,
        tendency_attack: {},
        top_ip: [],
        top_location: [],
        top_type: [],
        total_cc: "",
        total_web: "",
    };
    public DetailaccessData: AccessType = {
        tendency_ip: {},
        tendency_req_flow: [],
        tendency_req_num: [],
        top_location: [],
        total_hit_flow: "",
        total_hit_num: 0,
    };
    public form: any = {
        datePicker: "0",
    };
    public attackfilterData: AttackSearchType = {
        dt: "0",
        level: "",
        site: "",
        tendency_attack: "1",
        top_ip: "1",
        top_location: "1",
        top_type: "1",
        total_cc: "1",
        total_web: "1",
    };
    public attackfilter: AttackSearchType = (<any>Object).assign({}, this.attackfilterData);
    public accessfilterData: AccessSearchType = {
        dt: "0",
        site: "",
        tendency_ip: "1",
        tendency_req_flow: "1",
        tendency_req_num: "1",
        total_hit_flow: "1",
        total_hit_num: "1",
    };
    public accessfilter: AttackSearchType = (<any>Object).assign({}, this.accessfilterData);
    // 标题头
    public titles: string = "暂无";

    // cc攻击
    public cc_attack: string = "暂无";
    // web攻击
    public web_attack: string = "暂无";
    // 攻击次数趋势
    public tendency_attackOpt: any = {};
    // 攻击源地域分布TOP10
    public top_locationOpt: any = {};
    // 攻击IPTOP10
    public top_ipOpt: any = {};
    // 攻击类型分布
    public type_attackOpt: any = {};

    // IP访问个数趋势
    public tendency_ipOpt: any = {};
    // 访问流量趋势
    public tendency_req_flowOpt: any = {};
    // 访问次数趋势
    public tendency_req_numOpt: any = {};
    // 加速请求
    public hit_flow: string = "暂无";
    // 加速流量
    public hit_num: number = 0;
    //  地域访问次数TOP10
    public tendency_locationtopOpt: any = {};

    // 24小时数据
    public HoursArray: Array<string> = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00", "22:00", "23:00"];





    public attackTimeOpt: any = {};
    public attackTypeOpt: any = {};
    public safeLevelOpt: any = {};
    public attackResource10Opt: any = {};
    public demoOpT: any = {};
    public demoOpT2: any = {};
    // lifecircle hook 
    created() {

        this.attackfilter.site = this.$route.params.id;
        this.accessfilter.site = this.$route.params.id;
        console.log(this.$route.params);
        this.titles = this.$route.params.name + "(" + this.$route.params.domain + ")";
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK, this.attackfilter);
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS, this.accessfilter);
        let that = this;

        let AttackId = EventBus.register(CONSTANT.GETPANDECTDETAILATTACK, function (event: string, info: any) {
            that.DetailattackData = (<any>Object).assign([], that.WebsitePandectDetailattackData[that.$route.params.id]);
            let data = that.DetailattackData;
            console.log(data);

            // 安全评级
            if (data.level > -1 || data.level) {
                let level = data.level;
                let num = "0";
                level === 0 ? num = "12.5" : level === 1 ? num = "37.5" : level === 2 ? num = "62.5" : level === 3 ? num = "87.5" : "暂无";
                that.safeLevelOpt.series[0].data = [num];
            }
            // web攻击
            that.web_attack = data.total_web;
            // cc攻击
            that.cc_attack = data.total_cc;
            // 攻击次数趋势
            if (data.tendency_attack) {
                let xArray = [];
                if (data.tendency_attack.axis_x.length !== 24) {
                    for (let key in data.tendency_attack.axis_x) {
                        xArray.push(that.date(data.tendency_attack.axis_x[key]));
                    }
                    that.tendency_attackOpt.xAxis[0].data = xArray;
                } else {
                    that.tendency_attackOpt.xAxis[0].data = that.HoursArray;
                }
                that.tendency_attackOpt.series[0].data = data.tendency_attack.axis_y.att_web;
                that.tendency_attackOpt.series[1].data = data.tendency_attack.axis_y.att_cc;
            }
            // 攻击源地域分布TOP10
            if (data.top_location) that.setBar(data.top_location, that.top_locationOpt);

            // 攻击类型分布
            if (data.top_type) that.setRose(data.top_type, that.type_attackOpt);

            // 攻击IPTOP10
            if (data.top_ip) that.setBar(data.top_ip, that.top_ipOpt);


        });
        let AccessId = EventBus.register(CONSTANT.GETPANDECTDETAILACCESS, function (event: string, info: any) {
            that.DetailaccessData = (<any>Object).assign([], that.WebsitePandectDetailaccessData[that.$route.params.id]);
            let data = that.DetailaccessData;

            // 加速请求
            that.hit_flow = data.total_hit_flow;
            // 加速流量
            that.hit_num = data.total_hit_num;
            // Ip访问个数趋势
            if (data.tendency_ip) {
                let xArray = [];
                if (data.tendency_ip.axis_x.length !== 24) {
                    for (let key in data.tendency_ip.axis_x) {
                        xArray.push(that.date(data.tendency_ip.axis_x[key]));
                    }
                    that.tendency_ipOpt.xAxis[0].data = xArray;
                } else {
                    that.tendency_ipOpt.xAxis[0].data = that.HoursArray;
                }
                that.tendency_ipOpt.series[0].data = data.tendency_ip.axis_y.ip_num;
            }
            // 访问流量趋势
            if (data.tendency_req_flow) {
                let xArray = [];
                if (data.tendency_req_flow.axis_x.length !== 24) {
                    for (let key in data.tendency_req_flow.axis_x) {
                        xArray.push(that.date(data.tendency_req_flow.axis_x[key]));
                    }
                    that.tendency_req_flowOpt.xAxis[0].data = xArray;
                } else {
                    that.tendency_req_flowOpt.xAxis[0].data = that.HoursArray;
                }
                that.tendency_req_flowOpt.series[0].data = data.tendency_req_flow.axis_y.hit_flow;
                that.tendency_req_flowOpt.series[1].data = data.tendency_req_flow.axis_y.req_flow;
            }
            // 访问次数趋势
            if (data.tendency_req_num) {
                let xArray = [];
                if (data.tendency_req_num.axis_x.length !== 24) {
                    for (let key in data.tendency_req_num.axis_x) {
                        xArray.push(that.date(data.tendency_req_num.axis_x[key]));
                    }
                    that.tendency_req_numOpt.xAxis[0].data = xArray;
                } else {
                    that.tendency_req_numOpt.xAxis[0].data = that.HoursArray;
                }
                that.tendency_req_numOpt.series[0].data = data.tendency_req_num.axis_y.hit_total;
                that.tendency_req_numOpt.series[1].data = data.tendency_req_num.axis_y.req_total;
            }
            // 地域访问次数TOP10
            if (data.top_location) that.setBar(data.top_location, that.tendency_locationtopOpt);



        });
        // 安全等级
        that.safeLevelOpt = {
            title: {
                show: false
            },
            tooltip: {
                show: true,
                formatter: function (param: any) {
                    let level = "";
                    let num = param.value;
                    if (num >= 0 && num <= 25) {
                        level = "安全";
                    } else if (num >= 26 && num <= 50) {
                        level = "低";
                    } else if (num >= 51 && num <= 75) {
                        level = "中";
                    } else if (num >= 76 && num <= 100) {
                        level = "高";
                    } else {
                        param = "暂无";
                        level = "暂无";
                    }
                    return (
                        "<em >" + level + "</em>"
                    );
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
                                [0.25, "#58c9f3"],
                                [0.5, "#78cd51"],
                                [0.75, "#f1c500"],
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
                        distance: -70,
                        textStyle: {
                            color: "#6eba44",
                            fontSize: "16"
                        },
                        inside: true,
                        formatter: function (e: any) {
                            switch (e + "") {
                                case "0":
                                    return "安全";
                                case "40":
                                    return "低";
                                case "60":
                                    return "中";
                                case "100":
                                    return "高";
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
                        fontSize: 16,
                        borderColor: "#ccc",
                        formatter: function (param: any) {
                            let level = "";
                            if (param >= 0 && param <= 25) {
                                level = "安全";
                            } else if (param >= 26 && param <= 50) {
                                level = "低";
                            } else if (param >= 51 && param <= 75) {
                                level = "中";
                            } else if (param >= 76 && param <= 100) {
                                level = "高";
                            } else {
                                param = "暂无";
                                level = "暂无";
                            }
                            return (
                                "安全评级" + "  " + level
                            );
                        },
                        offsetCenter: [0, "70%"],
                    },
                    data: ["0"]
                }
            ]
        };
        // 攻击次数趋势
        that.tendency_attackOpt = {
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
                formatter: " {b0}<br /><span style='color:#BFE83B;'>{a0}: {c0}次</span><br /><span style='color:#FCBE83;'>{a1}: {c1}次</span>"
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
                            color: "#BFE83B"
                        }
                    },
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
        // 攻击类型分布
        that.type_attackOpt = {
            color: ["#78cad7", "#36b2c8", "#9ed5c8", "#70c4b2", "#d6e7aa", "#b3d67f", "#ecbd96", "#f3a964", "#ea918c", "#ec695e"],
            tooltip: {
                trigger: "item",
                formatter: "{b}: {c} ({d}%)"
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
        // 攻击源地域分布TOP10
        that.top_locationOpt = {
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
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
                },
                {
                    type: "bar",
                    legendHoverLink: true,
                    barWidth: 25,
                    itemStyle: {
                        normal: {
                            color: "#3398DB"
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
                                "color": "#ffffff"
                            }
                        }
                    },
                    data: [{
                        name: "Top1",
                        value: 10
                    }, {
                        name: "Top2",
                        value: 9
                    },
                    {
                        name: "Top3",
                        value: 8
                    },
                    {
                        name: "Top4",
                        value: 7
                    },
                    {
                        name: "Top5",
                        value: 6
                    },
                    {
                        name: "Top6",
                        value: 5
                    },
                    {
                        name: "Top7",
                        value: 4
                    },
                    {
                        name: "Top8",
                        value: 3
                    },
                    {
                        name: "Top9",
                        value: 2
                    },
                    {
                        name: "Top10",
                        value: 1
                    },
                    ]

                },
            ]
        };
        // 攻击IPTOP10
        that.top_ipOpt = {
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
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    type: "bar",
                    legendHoverLink: true,
                    barWidth: 25,
                    itemStyle: {
                        normal: {
                            color: "#3398DB"
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
                                "color": "#ffffff"
                            }
                        }
                    },
                    data: [{
                        name: "Top1",
                        value: 0
                    }, {
                        name: "Top2",
                        value: 0
                    },
                    {
                        name: "Top3",
                        value: 0
                    },
                    {
                        name: "Top4",
                        value: 0
                    },
                    {
                        name: "Top5",
                        value: 0
                    },
                    {
                        name: "Top6",
                        value: 0
                    },
                    {
                        name: "Top7",
                        value: 0
                    },
                    {
                        name: "Top8",
                        value: 0
                    },
                    {
                        name: "Top9",
                        value: 0
                    },
                    {
                        name: "Top10",
                        value: 0
                    },
                    ]

                },
            ]
        };
        // IP访问次数
        that.tendency_ipOpt = {
            legend: {
                data: ["IP访问次数"],
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
                formatter: " {b0}<br /><span style='color:#9adce9;'>{a0}: {c0}次</span><br />"

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
                    "19:00", "20:00", "21:00", "22:00", "23:00",
                ]
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
                    name: "IP访问次数",
                    type: "line",
                    showSymbol: true,
                    symbol: "circle",
                    symbolSize: 10,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: "rgba(0,0,0,0.4)",
                            shadowBlur: 8,
                            shadowOffsetY: 8
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#9adce9",
                        }
                    },
                },
            ]
        };
        // 访问流量趋势
        that.tendency_req_flowOpt = {
            legend: {
                data: ["加速流量", "访问流量"],
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
                formatter: function (datas: any) {
                    let times = that.flow(datas[0].value);
                    let speed = that.flow(datas[1].value);

                    let res = datas[0].name + "<br/>" +
                        "<span style='color:#80D3E3;'>" + datas[0].seriesName + ":  " + times + "</span>" + "<br/>" +
                        "<span style='color:#76DEC6;'>" + datas[1].seriesName + ":  " + speed + "</span>"
                        ;
                    return res;
                }

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
                    name: "加速流量",
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
                            color: "#80D3E3"
                        }
                    },
                },
                {
                    name: "访问流量",
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
                            color: "#76DEC6"
                        }
                    },
                }
            ]
        };
        // 访问次数趋势
        that.tendency_req_numOpt = {
            legend: {
                data: ["加速次数", "访问次数"],
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
                formatter: " {b0}<br /><span style='color:#80D3E3;'>{a0}: {c0}次</span><br /><span style='color:#76DEC6;'>{a1}: {c1}次</span>"

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
                    name: "加速次数",
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
                            color: "#80D3E3"
                        }
                    },
                },
                {
                    name: "访问次数",
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
                            color: "#76DEC6"
                        }
                    },
                }
            ]
        };
        // 地域访问次数TOP10
        that.tendency_locationtopOpt = {
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
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    type: "bar",
                    legendHoverLink: true,
                    barWidth: 25,
                    itemStyle: {
                        normal: {
                            color: "#3398DB"
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
                                "color": "#ffffff"
                            }
                        }
                    },
                    data: [{
                        name: "Top1",
                        value: 0
                    }, {
                        name: "Top2",
                        value: 0
                    },
                    {
                        name: "Top3",
                        value: 0
                    },
                    {
                        name: "Top4",
                        value: 0
                    },
                    {
                        name: "Top5",
                        value: 0
                    },
                    {
                        name: "Top6",
                        value: 0
                    },
                    {
                        name: "Top7",
                        value: 0
                    },
                    {
                        name: "Top8",
                        value: 0
                    },
                    {
                        name: "Top9",
                        value: 0
                    },
                    {
                        name: "Top10",
                        value: 0
                    },
                    ]

                },
            ]
        };

    }


    changeDay(val: string) {
        this.attackfilter.dt = val;
        this.accessfilter.dt = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK, this.attackfilter);
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS, this.accessfilter);
    }

    date(value: string) {
        if (value === "") return value;
        return moment(value).format("YYYY-MM-DD");
    }


    flow(limit: number) {
        let size = "";
        if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B  
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {// 如果小于0.1MB转化成KB  
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB  
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else { // 其他转化成GB  
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        let sizestr = size + "";
        let len = sizestr.indexOf("\.");
        let dec = sizestr.substr(len + 1, 2);
        if (dec === "00") {// 当小数点后为00时 去掉小数部分  
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
        }
        return sizestr;
    }


    // 给柱状图统一方法
    setBar(data: any, opt: any) {
        let length = data.length;
        let barArray = [];
        let barMax = -1;
        let barYMAX = [];
        for (let key in data) {
            let temp: any = data[key];
            let value = temp.value;
            if (value > barMax) {
                barMax = value;
            }
        }
        for (let i = 1; i <= length; i++) {
            let time = "";
            time = "Top" + i;
            barArray.push(time);
            barYMAX.push(barMax);
        }
        opt.series[1].data = data;
        opt.series[0].data = barYMAX;
        opt.yAxis[0].data = barArray;
    }

    // 给玫瑰图统一方法
    setRose(data: any, opt: any) {
        let length = data.length;
        let roseArray = [];
        for (let key in data) {
            roseArray.push(data[key].name);
        }
        opt.legend.data = roseArray;
        opt.series[0].data = data;
    }
}


// 攻击类查询条件类型
export interface AttackSearchType {
    dt: string;
    level: string;
    site: string;
    tendency_attack: string;
    top_ip: string;
    top_location: string;
    top_type: string;
    total_cc: string;
    total_web: string;
}

// 防护类查询条件类型
export interface AccessSearchType {
    dt: string;
    site: string;
    tendency_ip: string;
    tendency_req_flow: string;
    tendency_req_num: string;
    total_hit_flow: string;
    total_hit_num: string;
}


// 攻击类数据类型
export interface AttackDetailType {
    [extra: string]: AttackType[];
}

interface AttackType {
    level: number;
    tendency_attack: any;
    top_ip: Array<Object>;
    top_location: Array<Object>;
    top_type: Array<Object>;
    total_cc: string;
    total_web: string;
}

// 防护类数据类型
export interface AccessDetailType {
    [extra: string]: AccessType[];
}

interface AccessType {
    tendency_ip: any;
    tendency_req_flow: any;
    tendency_req_num: any;
    top_location: Array<Object>;
    total_hit_flow: string;
    total_hit_num: number;
}