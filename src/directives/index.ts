import { Hide } from "./hide";
import { Permissions } from "@directives/permissions";


export class InitDirective {
    constructor() {
        new Hide();
        new Permissions();
    }
}

