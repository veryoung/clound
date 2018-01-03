import Vue from "vue";
import * as moment from "moment";


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