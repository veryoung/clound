import Vue from "vue";

export const vm = new Vue({
    filters: {
        "date": function () {

        }
    }
});

export enum ORGANIZATIONEVENT {
    GETORGANIZATION = "getorganization"
}

export enum USERMANAGEEVENT {
    GETUSERLIST = "getuserlist",
    GETUSER = "getuser"
}