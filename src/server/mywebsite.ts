import { Restful } from "server";


class Mywebsite extends Restful {
    constructor() {
        super();
    }


    getList(opt: ObjType) {
        return this.get({
            url: "/api/v20/websites/list",
            params: opt
        });
    }

    getWebsiteDetail(website_id: string) {
        return this.get({
            url: "/api/v20/websites/detail",
            params: {
                website_id: website_id
            }
        });
    }
}

interface ObjType {
    [extra: string]: any;
}

export const MywebsiteServer = new Mywebsite();