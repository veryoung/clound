import Vue from "vue";


export class Permissions {
    constructor() {
        this.init();
    }

    init() {
        // 注册
        Vue.directive("permissions", {
            bind: function (el: any, binding: any, vnode: any) {
                if (binding.value) {
                    el.style.display = "none";
                }
            },
            inserted: function () { },
            update: function () { },
            componentUpdated: function () { },
            unbind: function () { }
        });
    }
}
