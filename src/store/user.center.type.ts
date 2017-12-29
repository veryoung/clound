/**

ads_enable	是否CC攻击	string	@mock=ads_enable
cdn_enable	是否CDN加速	string	@mock=cdn_enable
company	公司名称	string	@mock=organization__name
cperson	创建人	string	@mock=cperson
ctime	创建日期	string	@mock=ctime
email	邮箱	string	@mock=email
expiry_date	到期日期	string	@mock=expiry_date
max_domain_num	分配的网站数	string	@mock=max_domain_num
mirror_enable	是否镜像	string	@mock=mirror_enable
phone	电话号码	string	@mock=phone
remark	备注	string	@mock=remark
role	角色名称	string	@mock=role__name
uid	用户ID	string	@mock=id
used_domain_num	已使用网站数	string	@mock=used_domain_num
user_name	用户名	string	@mock=name
waf_enable	允许WEB应用防火墙权限	string	@mock=waf_enable
 */
export interface UserMessageType {
    uid: string;
    user_name: string;
    pwd?: string;
    role?: string;
    role_id?: string;
    cperson: string;
    ctime: string;
    company_id: string;
    company?: string;
    is_active?: string;
    phone: string;
    email: string;
    remark: string;
    used_domain_num: string;
    max_domain_num: string;
    waf_enable: string | boolean;
    ads_enable: string | boolean;
    mirror_enable: string | boolean;
    cdn_enable: string | boolean;
    expiry_date: string;
}

export interface UserCenterType {
    [extra: string]: UserMessageType;
}

export interface UserStoreType {
    personInfo: UserCenterType;
    userlist: UserCompanyListType;
}


export interface UserCompanyListType {
    [extra: string]: UserListType;
}
export interface UserListType {
    data: UserListStructure;
    total: number;
}
export interface UserListStructure {
    [extra: number]: Array<UserListColumnType>;
}
export interface UserListColumnType {
    company: string;
    cperson: string;
    ctime: string;
    email: string;
    expiry_date: string;
    is_active: string;
    is_delete: string;
    is_edite: string;
    phone: string;
    role: string;
    user_name: string;
    uid: string;
}

export enum USER {
    ADDUSERMESSAGE = "addusermessage",
    UPDATEMESSAGE = "updatemessage",
    CHANGEPWD = "changepwd",
    DEFAULTUSER = "defaultuser",
    GETUSERLIST = "getuserlist",
    GETOTHERUSER = "getotheruser"
}


export interface RoleType {

}
