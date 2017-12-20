import Vue from "vue";
const ElementUI = require("element-ui");


import { entryRouter } from "@router/index";
import { Entry } from "@views/entry/entry";
import { Store } from "@store/store";
import { InitDirective } from "@directives/index";



require("element-ui/lib/theme-chalk/index.css");
require("./resource/iconfont/iconfont.css");
require("./resource/css/global.css");

if (process.env.NODE_ENV === "test") {
    console.info("测试环境,测试版本号", require("../package.json").version, "更新日期", new Date());
} else if (process.env.NODE_ENV === "production") {
    console.log = function () { };
}

new InitDirective();

Vue.use(ElementUI);

const app = new Vue({
    el: "#app",
    store: Store,
    router: entryRouter,
    render: h => h(Entry),
});