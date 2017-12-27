export enum ORGANIZATION {
    ADDORGANIZATION = "addOrganization",
    INITORGANIZATIONTREE = "initOrganizationtree",
    ADDORGANIZATIONMESSAGE = "addOrganizationMessage",
    SAVEORGANIZATION = "保存组织机构",
}


export interface OrganizationTreeType {
    id: string;
    tree_label: string;
    nodes: Array<OrganizationTreeType>;
}

export interface MessageType {
    // 企业介绍
    desc: string;
    // 组织结构ID		
    id?: string;
    // 	组织机构名称
    name: string;
    // 上级组织关系ID 根组织传空字符串或者不传
    pid?: string;
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