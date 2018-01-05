import { SpeedUpdateFrame } from "./dialogbox/speedUpdate";
import { SpeedListFrame } from "./dialogbox/speedlist.frame";
import { MirrorFrame } from "./dialogbox/mirror.frame";
import { DenfenFrame } from "./dialogbox/defen.frame";
import { ListFrame } from "./dialogbox/list.frame";
import Component from "vue-class-component";
import Vue from "vue";
import {mapGetters} from "vuex";

import {ModuleTitle} from "@components/title/module.title";

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
        }
    })
export class WebsiteSettings extends Vue {
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


    public options: any = [{
        value: "选项1",
        label: "一天"
      }, {
        value: "选项2",
        label: "一小时"
      }, {
        value: "选项3",
        label: "一周"
      }];
      public value4: string =  "";

    // public tableDefault: = lifecircle hook
    created() {
        console.log("i am website ");
    }

    destroyed() {}

    // init method

    handle(type: "setWhiteList" | "setBlackList" | "setDefenseList" | "setMirror" | "setSpeedList" | "SpeedUpdate") {
        if (type === "setWhiteList" || type === "setBlackList") {
            this.dialogVisibleList = true;
                if (type === "setWhiteList") {
                    this.listType = "white";
                } else {
                    this.listType = "black";
                }
        } else if ( type === "setDefenseList" ) {
            this.dialogVisibleDefenWhite = true;
        } else if ( type === "setMirror") {
            this.dialogVisibleMirrorSet = true;
        } else if ( type === "setSpeedList") {
            this.dialogVisibleSpeedList = true;
        } else if ( type === "SpeedUpdate") {
            this.dialogVisibleSpeedUpdate = true;
        }
    }

    // 网站镜像立即刷新
    updateMirror() {
        this.$confirm("是否立即更新网站镜像?", "立即更新", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消更新"
            });          
          });
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

    // 关闭

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

}