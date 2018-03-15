import { PieComponents } from "@components/echarts/pieChart/pie";
import { BarComponents } from "@components/echarts/barChart/bar";
import { PieComponent } from "@components/echarts/pie/pie";
import { LineComponents } from "@components/echarts/lineChart/line";
import { ModuleTitle } from "@components/title/module.title";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import { WEBSITEANALYSISEVENT } from "@store/website.analysis.type";
import { DetailBaseClass } from "@views/base/base.class";
import { BaseChartUtils } from "@components/echarts/base.chart";


require("./website.detail.styl");
@Component({
    name: "websitedetail",
    components: {
        ModuleTitle,
        PieComponent,
        LineComponents,
        BarComponents,
        PieComponents
    },
    template: require("./website.detail.html"),
    computed: {
        ...mapGetters([
            "WebsitePandectDetailattackData",
            "WebsitePandectDetailaccessData",
        ])
    }
})

export class WebsiteDetail extends DetailBaseClass {
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
        tendency_attack: "10",
        top_ip: "10",
        top_location: "10",
        top_type: "10",
        total_cc: "1",
        total_web: "1",
    };
    public attackfilter: AttackSearchType = (<any>Object).assign({}, this.attackfilterData);
    public accessfilterData: AccessSearchType = {
        dt: "0",
        site: "",
        tendency_ip: "10",
        tendency_req_flow: "10",
        tendency_req_num: "10",
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
    public tendency_attackOptDatas: any = {};
    // 攻击源地域分布TOP10
    public top_locationOptDatas: any = {};
    // 攻击IPTOP10
    public top_ipOptDatas: any = {};
    // 攻击类型分布
    public type_attackOptDatas: any = {};

    // IP访问个数趋势
    public tendency_ipOptDatas: any = {};
    // 访问流量趋势
    public tendency_req_flowOptDatas: any = {};
    // 访问次数趋势
    public tendency_req_numOptDatas: any = {};
    // 加速请求
    public hit_flow: string = "暂无";
    // 加速流量
    public hit_num: number = 0;
    //  地域访问次数TOP10
    public tendency_locationtopOptDatas: any = {};

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
        this.titles = this.$route.params.name + "(" + this.$route.params.domain + ")";
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK, this.attackfilter);
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS, this.accessfilter);
        let that = this;

        let AttackId = this.EventBus.register(this.CONSTANT.GETPANDECTDETAILATTACK, function (event: string, info: any) {
            that.DetailattackData = (<any>Object).assign([], that.WebsitePandectDetailattackData[that.$route.params.id]);
            let data = that.DetailattackData;

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
            let attackOptDatastemp = that.formatterLine(data.tendency_attack, ["#BFE83B", "#FCBE83"], ["Web攻击", "CC攻击"]);
            that.tendency_attackOptDatas = attackOptDatastemp;
            // 攻击源地域分布TOP10
            let top_locationOptDatastemp = that.formatterBar(data.top_location);
            that.top_locationOptDatas = top_locationOptDatastemp;

            // 攻击类型分布
            let type_attackOptDatastemp = that.formatterPie(data.top_type);
            that.type_attackOptDatas = type_attackOptDatastemp;
            // 攻击IPTOP10
            let top_ipOptDatastemp = that.formatterBar(data.top_ip);
            console.log(top_ipOptDatastemp);
            that.top_ipOptDatas = top_ipOptDatastemp;


        });
        let AccessId = this.EventBus.register(this.CONSTANT.GETPANDECTDETAILACCESS, function (event: string, info: any) {
            that.DetailaccessData = (<any>Object).assign([], that.WebsitePandectDetailaccessData[that.$route.params.id]);
            let data = that.DetailaccessData;

            // 加速请求
            that.hit_flow = data.total_hit_flow;
            // 加速流量
            that.hit_num = data.total_hit_num;
            // Ip访问个数趋势
            let tendency_ipOptDatastemp = that.formatterLine(data.tendency_ip, ["#9adce9"], ["IP访问次数"]);
            that.tendency_ipOptDatas = tendency_ipOptDatastemp;
            // 访问流量趋势
            let tendency_req_flowOptDatastemp = that.formatterLine(data.tendency_req_flow, ["#80D3E3", "#76DEC6"], ["加速流量", "访问流量"]);
            that.tendency_req_flowOptDatas = tendency_req_flowOptDatastemp;
            // 访问次数趋势
            let tendency_req_numOptDatastemp = that.formatterLine(data.tendency_req_num, ["#80D3E3", "#76DEC6"], ["加速次数", "访问次数"]);
            that.tendency_req_numOptDatas = tendency_req_numOptDatastemp;
            // 地域访问次数TOP10
            let tendency_locationtopOptDatastemp = that.formatterBar(data.top_location);
            that.tendency_locationtopOptDatas = tendency_locationtopOptDatastemp;

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

    }


    changeDay(val: string) {
        this.attackfilter.dt = val;
        this.accessfilter.dt = val;
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILATTACK, this.attackfilter);
        this.$store.dispatch(WEBSITEANALYSISEVENT.GETPANDECTDETAILACCESS, this.accessfilter);
    }


    // 给折线图统一方法
    formatterLine(data: any, color: string[], legend: string[]) {
        let target = {
            xAxis: {
                data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00",
                    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
                    "19:00", "20:00", "21:00", "22:00", "23:00"]
            },
            legend: {
                data: legend,
                right: "10%",
            },
            series: [{
                name: "",
                type: "",
                data: [0],
                color: ""
            }]
        };
        let obj = BaseChartUtils.createDate(this.form.datePicker);
        target.xAxis.data = obj.xDate;
        if (data.axis_x.length === 0) {
            for (let i = 0; i < target.legend.data.length; i++) {
                target.series[i] = {
                    name: target.legend.data[i],
                    type: "line",
                    data: obj.yDate,
                    color: color[i],
                };
            }
        } else {
            let objIndex: string[] = Object.keys(data.axis_y);
            for (let i = 0; i < target.legend.data.length; i++) {
                target.series[i] = {
                    name: target.legend.data[i],
                    type: "line",
                    data: data.axis_y[objIndex[i]],
                    color: color[i]
                };
            }
        }
        return target;
    }
    // 给柱状图统一方法
    formatterBar(data: any) {
        let target = {
            series: [{
                data: [0],
            }]
        };
        let maxArray = [];
        if (data.length > 0) {
            for (let i = 0; i < 10; i++) {
                maxArray.push(data[0].value);
            }
            target.series = [
                { data: maxArray },
                { data: data }
            ];
        } else {
            target.series = [
                { data: data },
                { data: data }
            ];
        }
        return target;
    }
    // 给玫瑰图统一方法
    formatterPie(data: any) {
        console.log(data);
        let target = {
            tooltip: {
                formatter: "{b}: {c}次 ({d}%)",
            },
            series: [{
                label: {
                    normal: {
                        formatter: "{blank|}{title|{b}:}{Textblank|}{titleNum|{c}次}{Textblank|}{perText|占比:}{Textblank|}{per|{d}%}{blank|}",
                    }
                },
                data: [],
            }],
            legend: {
                data: [],
            }
        };
        if (data.length > 0) {
            let nameArray: any = [];
            for (let key in data) {
                nameArray.push(data[key].name);
            }
            target.series[0].data = data;
            target.legend.data = nameArray;
        } 
        return target;
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