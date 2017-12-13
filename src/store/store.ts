import Vuex from "vuex";
import Vue from "vue";

import { OrganizationStore } from "@store/organization.store";


Vue.use(Vuex);

export const Store = new Vuex.Store({
    modules: {
        OrganizationStore: OrganizationStore
    }
});