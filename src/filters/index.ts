import { DateFilter } from "@filters/date";
import { NoneFilter } from "@filters/none";
import { DateTimeFilter } from "@filters/datetime";

export class InitFilters {
    constructor() {
        new DateFilter();
        new NoneFilter();
        new DateTimeFilter();
    }
}