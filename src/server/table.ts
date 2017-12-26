import { axios, Restful } from "@server/index";
import { Config } from "@store/table.type";


export class Table extends Restful {
    constructor() {
        super();
    }


    public getConfig() {
        return this.get({
            url: "/api/v20/account/user/list/config/",
            params: {}
        });
    }

    public setConfig(opt: Config) {
        return this.post({
            url: "/api/v20/account/user/list/config/",
            params: { value: opt }
        });
    }
}


export const TableServer = new Table();