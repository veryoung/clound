import { Restful } from "@server/index";


class Mywebsite extends Restful {
    constructor() {
        super();
    }

    
    batchWebsite(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites/open_waf/",
            params: opt
        });
    }

    getWebsiteEditDetail(website_id: string) {
        return this.get({
            url: "/api/v20/websites/detail",
            params: {
                website_id: website_id
            }
        });
    }

    getWebsiteFnDate(website_id: string) {
        return this.get({
            url: "/api/v20/websites/function/",
            params: {
                website_id: website_id
            }
        });
    }

    addWebsite(opt: ObjType) {
        return this.post({
            url: "/api/v20/websites",
            params: opt
        });
    }

    updateWebsite(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites",
            params: opt
        });
    }

    delWebsite(website_id: string) {
        return this.del({
            url: "/api/v20/websites",
            params: {
                website_id: website_id
            }
        });
    }


    addWebsiteIpBlacklist() {
        return this.post({
            url: "/api/v20/websites/globalip/blacklist",
            params: {}
        });
    }


    addWebsiteIpWhitelist() {
        return this.post({
            url: "/api/v20/websites/globalip/whitelist",
            params: {}
        });
    }


    updateWebsiteConfig() {
        return this.put({
            url: "/api/v20/websites/notifylist",
            params: {}
        });
    }


    delWebsiteConfig() {
        return this.del({
            url: "/api/v20/websites/notifylist",
            params: {}
        });
    }

    BWlist(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites/orders/",
            params: opt
        });
    }

    mirror(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites/mirror/",
            params: opt
        });
    }

    cache(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites/cache/",
            params: opt
        });
    }

    // 网站开关接口
    switch(opt: ObjType) {
        return this.put({
            url: "/api/v20/websites/switch/",
            params: opt
        });
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