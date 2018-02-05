import { GeneralServer } from "@server/general";
import { ResType } from "server";
import { AxiosResponse } from "axios";
import { Store } from "@store/store";
import { USER } from "@store/user.center.type";
import { session } from "@utils/sessionstorage";
import { Permissions } from "@directives/permissions";

export class UserStatus {
    constructor(callback?: Function) {
        GeneralServer.oneself().then((response: AxiosResponse<ResType>) => {
            let res: ResType = response.data;
            if (res.data && res.data.pcode) {
                res.data.pcode = Permissions.collect(res.data.pcode);
                session.setItem("pcode", res.data.pcode);
            }
            switch (res.status) {
                case "suc":
                    Store.dispatch(USER.DEFAULTCONFIG, res.data);
                    Store.dispatch(USER.DEFAULTUSER, { uid: res.data.uid });
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                    break;
                default:
                    break;
            }
        });
    }
}
