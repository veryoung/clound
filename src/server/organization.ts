import { axios, Restful } from "@server/index";
import { OrganizationTreeType } from "@store/organization.type";


export class Organization extends Restful {
    constructor() {
        super();
    }


    public getTree() {
        return this.get({
            url: "/api/v20/account/ori/tree",
            params: {}
        });
    }

    public addOrganization(opt: OrganizationForm) {
        return this.post({
            url: "/api/v20/account/ori/info/",
            params: opt
        });
    }


    public delOrganization(id: string) {
        return this.del({
            url: "/api/v20/account/ori/info/",
            params: {
                oid: id
            }
        });
    }

    public editOrganizationInfo(opt: OrganizationForm) {
        return this.put({
            url: "/api/v20/account/ori/info/",
            params: opt
        });
    }

    public getOrganizationInfo(id: string) {
        return this.get({
            url: "/api/v20/account/ori/info/",
            params: {
                id: id
            }
        });
    }
}


interface OrganizationForm {
    desc: string;
    id?: string;
    name: string;
    sname: string;
    pid?: string;
}


export const OrganizationServer = new Organization();