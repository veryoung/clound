import { axios, Restful } from "@server/index";
import { Config } from "@store/table.type";


export class Table extends Restful {
    constructor() {
        super();
    }


    public getConfig(code: string) {
        return this.get({
            url: "/api/v20/account/user/list/config/",
            params: {
                code: code
            }
        });
    }

    public setConfig(opt: ConfigType) {
        const { code, value } = opt;
        return this.post({
            url: "/api/v20/account/user/list/config/",
            params: { code: code, value: value }
        });
    }
}


interface ConfigType {
    code: string;
    value: Config;
}

export const TableServer = new Table();