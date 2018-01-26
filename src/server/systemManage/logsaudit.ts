import { Restful } from "@server/index";

class Logaudit extends Restful {
    constructor() {
        super();
    }

    getLogsauditConfig(opt: ObjType) {
        return this.get({
            url: "/api/v20/bulletin/op_log/",
            params: opt
        });
    }
}

interface ObjType {
    [extra: string]: any;
}

export const LogauditServer = new Logaudit();