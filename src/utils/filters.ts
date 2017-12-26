import * as moment from "moment";

export class Filters {
    constructor() {

    }
    public none(value: string) {
        return value === "" ? "---" : value;
    }

    public date(value: string) {
        if (value !== "") {
            return moment(value).format("YYYYMMDD");
        }
        return value;
    }
}


export const filterPipe = new Filters();