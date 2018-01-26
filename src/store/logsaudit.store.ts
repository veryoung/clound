import { Module } from "vuex";
import { LogsAduitType } from "@store/logsaduit.type";

export const LogsAuditStore: Module <LogsAduitType, any> = {
    state: (): LogsAduitType => {
        return {
            tableData: {
                "": [{
                    email: "",
                    ip: "",
                    op_detail: "",
                    op_ret: "",
                    op_time: "",
                    op_type: "",
                    user: "",
                }]
            },
            logsaduitConfig: {
                "init": {
                    email: "",
                    ip: "",
                    op_detail: "",
                    op_ret: "",
                    op_time: "",
                    op_type: "",
                    user: "",
                }
            }
        };
    },
};