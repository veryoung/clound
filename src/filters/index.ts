import { DateFilter } from "@filters/date";
import { NoneFilter } from "@filters/none";
import { DateTimeFilter } from "@filters/datetime";
import { OtherFilter } from "@filters/other";

export class InitFilters {
    constructor() {
        new DateFilter();
        new NoneFilter();
        new DateTimeFilter();
        new StatusFilter();  
        new OtherFilter();
    }
}