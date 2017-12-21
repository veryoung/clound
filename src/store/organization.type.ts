export enum ORGANIZATION {
    ADDORGANIZATION = "addOrganization",
}


export interface OrganizationTreeType {
    id: string;
    sname: string;
    nodes: Array<OrganizationTreeType>;
}

export interface MessageType {
    // 企业介绍
    desc: string;
    // 组织结构ID		
    id: string;
    // 	组织机构名称
    label: string;
    // 上级组织关系ID 根组织传空字符串或者不传
    pid: string;
    // 简称
    sname: string;
}
export interface Organization {
    [extra: string]: MessageType;
}

export interface OrganizationType {
    tree: Array<OrganizationTreeType>;
    message: Organization;
}