import { UserListType, UserServer } from "@server/user";
import { ResType } from "server";
import ElementUI from "element-ui";
import { UserListColumnType } from "@store/user.center.type";
import { AxiosResponse } from "axios";



// ctime	创建时间		
// email			
// expiry_date	过期时间		
// is_active			
// name	用户名		
// ori_id	组织id	number	
// page	当前页		
// page_size	每页条数		
// phone			
// role_id	角色id		
// sort_ctime	创建时间排序	boolean	
// sort_expiry_date	过期日期排序	boolean	
export default interface SearchType {
    name: string;
    role_id?: string;
    phone: string;
    email: string;
    ctime: string;
    expiry_date: string;
    is_active: string;
    ori_id?: string;
    sort_ctime?: boolean;
    sort_expiry_date?: boolean;
}

export const filterData: SearchType = {
    name: "",
    role_id: "",
    phone: "",
    email: "",
    ctime: "",
    expiry_date: "",
    is_active: "",
    ori_id: "",
};

export class UserManager {
    public exportUser(ids: number[]) {
        UserServer.exportUser(ids).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    ElementUI.Message({
                        message: "导出成功",
                        type: "success"
                    });
                    break;
                default:
                    break;
            }
        });
    }

    exportAll() {
        UserServer.exportUser([]).then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    ElementUI.Message({
                        message: "导出成功",
                        type: "success"
                    });
                    break;
                default:
                    break;
            }
        });
    }

    handleDel(row: UserListColumnType) {
        ElementUI.MessageBox.confirm("确定要删除嘛？", "提示").then(() => {
            UserServer.delUser(row.uid).then((response: AxiosResponse<ResType>) => {
                let res: ResType = response.data;
                switch (res.status) {
                    case "suc":
                        ElementUI.Message({
                            message: "删除成功",
                            type: "success"
                        });
                        break;
                    default:
                        break;
                }
            });
        }).catch(() => {

        });
    }
}

export const UserManagerController = new UserManager();

