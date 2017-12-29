import { GeneralServer } from "@server/general";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { Store } from "@store/store";
import { USER } from "@store/user.center.type";

export class UserStatus {
    constructor(next: Function) {
        GeneralServer.oneself().then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            switch (res.status) {
                case "suc":
                    Store.dispatch(USER.DEFAULTUSER, { uid: res.data.uid });
                    next("/home");
                    break;
                default:
                    next("/login");
                    break;
            }
        });
    }
}
