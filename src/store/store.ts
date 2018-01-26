import Vuex from "vuex";
import Vue from "vue";

import { OrganizationStore } from "@store/organization.store";
import { UserCenterStore } from "@store/user.center.store";
import { TableConfigStore } from "@store/table.store";
import { MyWebsiteStore } from "@store/mywebsite.store";
import { LogsAuditStore } from "@store/log.audit.store";
import { NoticeStore } from "@store/notice.store";



Vue.use(Vuex);

export const Store = new Vuex.Store({
    modules: {
        MyWebsiteStore: MyWebsiteStore,
        OrganizationStore: OrganizationStore,
        UserCenterStore: UserCenterStore,
        TableConfigStore: TableConfigStore,
        LogsAuditStore: LogsAuditStore,
        NoticeStore: NoticeStore
    }
});
