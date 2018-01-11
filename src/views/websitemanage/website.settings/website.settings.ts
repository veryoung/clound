import { ResType } from "@server/index";
import { AxiosResponse } from "axios";
import { MywebsiteServer } from "@server/mywebsite";
import { WebSiteConfig } from "@store/mywebsite.type";
import { CONSTANT } from "@utils/event";
import { EventBus } from "@utils/event";
import { SpeedUpdateFrame } from "./dialogbox/speedUpdate";
import { SpeedListFrame } from "./dialogbox/speedlist.frame";
import { MirrorFrame } from "./dialogbox/mirror.frame";
import { DenfenFrame } from "./dialogbox/defen.frame";
import { ListFrame } from "./dialogbox/list.frame";
import Component from "vue-class-component";
import Vue from "vue";
import { mapGetters } from "vuex";

import { ModuleTitle } from "@components/title/module.title";
import { FormType } from "@views/websitemanage/website.settings/website.settings.attchement";
import { MYWEBSITEEVENT } from "@store/mywebsite.type";

require("./website.settings.styl");
@Component({
    name: "websitesettings",
    template: require("./webstie.settings.html"),
    components: {
        ModuleTitle,
        ListFrame,
        DenfenFrame,
        MirrorFrame,
        SpeedListFrame,
        SpeedUpdateFrame
    },
    computed: {
        ...mapGetters([
            "websiteConfig"
        ])
    },
})
export class WebsiteSettings extends Vue {
    // init computed
    public websiteConfig: WebSiteConfig;
    // init computed init data
    public value: boolean = false;
    public listType: string = "";
    // 白黑名单
    public dialogVisibleList: boolean = false;
    // 防盗白名单
    public dialogVisibleDefenWhite: boolean = false;
    // 立即更新
    public dialogVisibleUpdate: boolean = false;
    // 设置镜像
    public dialogVisibleMirrorSet: boolean = false;
    // 加速黑名单
    public dialogVisibleSpeedList: boolean = false;
    // 指定URL刷新
    public dialogVisibleSpeedUpdate: boolean = false;
    // 表单内容
    public form: FormType = {
        ads_enable: "",
        cache_url_black: "",
        cache_urls: [],
        cdn_enable: "",
        mirror_enable: "",
        mirror_interval: -1,
        mirror_urls: [],
        waf_enable: "",
        waf_hotlink_white: [],
        waf_ip_black: [],
        waf_ip_white: [],
        waf_url_black: [],
        waf_url_white: [],
    };
    // 获取的镜像
    public options: any = [
        {
            value: -1,
            label: " "
        },
        {
            value: 86400,
            label: "一天"
        }, {
            value: 604800,
            label: "一周"
        }, {
            value: 3600,
            label: "一小时"
        }];
    public MirrorValue: number = -1;
    public MirroData: Array<string> = [""];

    // public tableDefault: = lifecircle hook
    created() {
        let that = this;
        let id = this.$route.params.id;
        this.$store.dispatch(MYWEBSITEEVENT.GETWEBSITECONFIG, { website_id: id, });
        let eventId = EventBus.register(CONSTANT.GETWEBSITECONFIG, function (event: string, info: any) {
            that.form = that.websiteConfig[id];
            that.MirrorValue = that.form.mirror_interval;
            // 处理选择框为负一 选择框内容为空
            if (that.form.mirror_interval === -1) {
            }
        });
    }

    destroyed() { }

    // init method

    handle(type: "setWhiteList" | "setBlackList" | "setDefenseList" | "setMirror" | "setSpeedList" | "SpeedUpdate") {
        if (type === "setWhiteList" || type === "setBlackList") {
            this.dialogVisibleList = true;
            if (type === "setWhiteList") {
                this.listType = "white";
            } else {
                this.listType = "black";
            }
        } else if (type === "setDefenseList") {
            this.dialogVisibleDefenWhite = true;
        } else if (type === "setMirror") {
            this.dialogVisibleMirrorSet = true;
        } else if (type === "setSpeedList") {
            this.dialogVisibleSpeedList = true;
        } else if (type === "SpeedUpdate") {
            this.dialogVisibleSpeedUpdate = true;
        }
    }

    // 网站镜像立即刷新
    updateMirror() {
        // 设置参数
        let params = {
            interval: 0,
            sid: this.$route.params.id,
            urls: this.MirroData,
        };
        this.$confirm("是否立即更新网站镜像?", "立即更新", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            MywebsiteServer.mirror(params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.$message({
                            type: "success",
                            message: res.message
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                    case "red":
                        this.$message({
                            type: "info",
                            message: res.message
                        });
                        break;
                }

            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消更新"
            });
        });
    }
    // 选择更新周期时候刷新
    updateMirrorCycle(val: number) {
        this.MirrorValue = this.form.mirror_interval;
   
        this.$confirm("是否刷新周期？", "更新周期", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let params = {
                interval: val,
                sid: this.$route.params.id,
                urls: this.MirroData,
            };
            MywebsiteServer.mirror(params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.MirrorValue = val;
                        this.$message({
                            type: "success",
                            message: res.message
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                    case "red":
                        this.$message({
                            type: "info",
                            message: res.message
                        });
                        break;
                }

            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消刷新"
            });
        });
    }
    // 获取Mirror
    getMirror(val: Array<string>) {
        this.MirroData = val;
    }
    // 网站加速全站刷新
    updateSpeed() {
        this.$confirm("是否对网站进行全站刷新？", "全站刷新", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            this.$message({
                type: "success",
                message: "刷新成功!"
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消刷新"
            });
        });
    }

    // 关闭方法
    closeList() {
        this.dialogVisibleList = false;
    }

    closeDefense() {
        this.dialogVisibleDefenWhite = false;
    }

    closeMirror() {
        this.dialogVisibleMirrorSet = false;
    }

    closeSpeedList() {
        this.dialogVisibleSpeedList = false;
    }

    closeSpeedUpdate() {
        this.dialogVisibleSpeedUpdate = false;
    }

    // switch 方法
    // 网站加速
    cdnSwitchChange(val: string) {
        if (val === "1") {
            this.form.cdn_enable = "0";
        } else {
            this.form.cdn_enable = "1";
        }
        let text = "";
        if (val === "1") {
            text = "开启";
        } else {
            text = "关闭";
        }
        this.$confirm("确认" + text + "吗？", text + "开关", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let id = this.$route.params.id;
            let Params = {
                sid: id,
                cdn_enable: val,
            };
            MywebsiteServer.switch(Params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.form.cdn_enable = val;
                        this.$message({
                            type: "success",
                            message: "刷新成功!"
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消" + text
            });
        });
    }
    // 网络替身
    mirrorSwitchChange(val: string) {
        console.log(val);
        if (val === "1") {
            this.form.mirror_enable = "0";
        } else {
            this.form.mirror_enable = "1";
        }
        let text = "";
        if (val === "1") {
            text = "开启";
        } else {
            text = "关闭";
        }
        this.$confirm("确认" + text + "吗？", text + "开关", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let id = this.$route.params.id;
            let Params = {
                sid: id,
                mirror_enable: val,
            };
            MywebsiteServer.switch(Params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.form.cdn_enable = val;
                        this.$message({
                            type: "success",
                            message: "刷新成功!"
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消" + text
            });
        });
    }
    // 防火墙
    wafSwitchChange(val: string) {
        if (val === "1") {
            this.form.waf_enable = "0";
        } else {
            this.form.waf_enable = "1";
        }
        let text = "";
        if (val === "1") {
            text = "开启";
        } else {
            text = "关闭";
        }
        this.$confirm("确认" + text + "吗？", text + "开关", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let id = this.$route.params.id;
            let Params = {
                sid: id,
                waf_enable: val,
            };
            MywebsiteServer.switch(Params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.form.waf_enable = val;
                        this.$message({
                            type: "success",
                            message: "刷新成功!"
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消" + text
            });
        });

    }
    // cc防御
    adsSwitchChange(val: string) {
        if (val === "1") {
            this.form.ads_enable = "0";
        } else {
            this.form.ads_enable = "1";
        }
        let text = "";
        if (val === "1") {
            text = "开启";
        } else {
            text = "关闭";
        }
        this.$confirm("确认" + text + "吗？", text + "开关", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            let id = this.$route.params.id;
            let Params = {
                sid: id,
                ads_enable: val,
            };
            MywebsiteServer.switch(Params).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    // "suc" | "error" | "red"
                    case "suc":
                        this.form.ads_enable = val;
                        this.$message({
                            type: "success",
                            message: "刷新成功!"
                        });
                        break;
                    case "error":
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        break;
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消" + text
            });
        });
    }



}