import { DateFilter } from "@filters/date";
import { NoneFilter } from "@filters/none";
import { DateTimeFilter } from "@filters/datetime";
<<<<<<< HEAD
import { StatusFilter } from "@filters/status";
=======
import { OtherFilter } from "@filters/other";
>>>>>>> development

export class InitFilters {
    constructor() {
        new DateFilter();
        new NoneFilter();
        new DateTimeFilter();
<<<<<<< HEAD
        new StatusFilter();  
=======
        new OtherFilter();
>>>>>>> development
    }
}