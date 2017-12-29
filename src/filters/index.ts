import { DateFilter } from "@filters/date";
import { NoneFilter } from "@filters/none";

export class InitFilters {
    constructor() {
        new DateFilter();
        new NoneFilter();
    }
}