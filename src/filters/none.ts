import Vue from "vue";


export class NoneFilter {
    constructor() {
        Vue.filter(
            "none",
            function (value: string) {
                if (value === "" || value === null) return "----";
                return value;
            }
        );
    }
}