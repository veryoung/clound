import Vue from "vue";
import * as moment from "moment";
import { Config } from "@store/table.type";
import { CONSTANT, vm, EventBus } from "@utils/event";
import { RegValidate, FromValidator, } from "@utils/form.validator";
import { Auxiliary } from "@utils/auxiliary";
import axios from "@server/index";
import { entryRouter } from "@router/index";







export class BaseLibrary extends Vue {
    protected moment = moment;
    protected vm = vm;
    protected CONSTANT = CONSTANT;
    protected EventBus = EventBus;
    protected RegValidate = RegValidate;
    protected FromValidator = FromValidator;
    protected Auxiliary = Auxiliary;
    protected axios = axios;
}


export class DetailBaseClass extends BaseLibrary {
    protected back() {
        entryRouter.go(-1);
    }
}

export class DiplomaBaseClass extends BaseLibrary {
    protected close() {
        this.$emit("close", false);
    }
}
export class ListBaseClass extends BaseLibrary {
    /**
     * @param href 导出路径
     */
    protected exportFile(href: string) {
        let dom: any = document.createElement("a");
        dom.href = href;
        dom.target = "_blank";
        dom.click();
    }

    /**
     * @param opt 数组对象
     * @param filter 过滤对象
     */
    protected mergeData(opt: Config, ...args: any[]) {
        const { page_size, page } = opt;
        let temp: any = {};
        for (let arg of args) {
            temp = (<any>Object).assign(temp, arg);
        }
        return (<any>Object).assign({}, temp, {
            page: page,
            page_size: page_size,
        });
    }

    /**
     * 
     * @param obj 需要转化的对象
     */
    protected objToUrl(obj: any) {
        let temp: string = "";
        for (let $index in obj) {
            temp += `&${$index}=${obj[$index]}`;
        }
        return temp;
    }
}

