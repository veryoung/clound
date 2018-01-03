import { Hide } from "./hide";
import { PermissionsDirective } from "@directives/permissions";


export class InitDirective {
    constructor() {
        new Hide();
        new PermissionsDirective();
    }
}

