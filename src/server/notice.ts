import { Restful } from "server";

class Notice extends Restful {
    constructor() {
        super();
    }

    public delMessageRecord(id: string) {
        return this.del({
            url: `/api/v20/bulletin/msg/`,
            params: {
                id: id
            }
        });
    }


    public delEmailRecord(id: string) {
        return this.del({
            url: ` /api/v20/bulletin/msg/`,
            params: {
                id: id
            }
        });
    }

    public sendMessage(opt: {
        content: string
        receiver_ids: number[]
    }) {
        return this.post({
            url: `/api/v20/bulletin/msg/`,
            params: opt
        });
    }

    public sendEmail(opt: {
        content: string;
        object: string;
        receiver_ids: number[];
    }) {
        return this.post({
            url: `/api/v20/bulletin/email/`,
            params: opt
        });
    }


    public getNotice(opt: {
        key_word: string;
        new: boolean;
        page: string;
        page_size: string;
        send_time: string[];
    }) {
        return this.get({
            url: `/api/v20/bulletin/notification/`,
            params: opt
        });
    }

    public getMessageRecord(opt: {
        end_date: string;
        msg_type: string;
        start_date: string;
        status: string;
    }) {
        return this.get({
            url: ` /api/v20/bulletin/msg/`,
            params: opt
        });
    }

    public getMessageDetail(id: string) {
        return this.get({
            url: `/api/v20/bulletin/msg/detail/`,
            params: {
                id: id
            }
        });
    }


    public getEmailRecord(opt: {
        send_date: string;
        send_type: "auto" | "manual" | "";
        status: string;
    }) {
        return this.get({
            url: `/api/v20/bulletin/email/`,
            params: opt
        });
    }

    public getEmailDetail(id: string) {
        return this.get({
            url: `/api/v20/bulletin/email/detail/`,
            params: {
                id: id
            }
        });
    }

}


export const NoticeServer = new Notice();